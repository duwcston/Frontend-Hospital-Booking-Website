import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import Select from 'react-select'
import * as actions from "../../../store/actions"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props){
        super(props);
        this.state = {
            // save to Markdown table
            contentMarkdown:'',
            contentHTML:'',
            selectedOption:'',
            description:'',
            listDoctors:'',
            hasOldData:false,

            //save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic:'',
            note:''
        }
    }

    async componentDidMount() {
       this.props.fetchAllDoctors();
       this.props.getAllRequiredDoctorInfor();
    }

    buildDatainputSelect = (inputData, type) => {
        let result = [];
        let {language} = this.props
        if(inputData && inputData.length >0){
            inputData.map((item,index)=>{
                let object = {};
                let labelEn = type === 'USERS' ? `${item.lastName} ${item.firstName}`:'';
                let labelVi = type === 'USERS' ? `${item.firstName} ${item.lastName}`:'';

                object.label = language === LANGUAGES.EN ? labelEn : labelVi;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }

    componentDidUpdate(prevPros, prevState, snapshot){
        if(prevPros.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            // let listDoctors =this.props.allDoctorsRedux;
            // console.log(listDoctors);
            // let dataSelect = this.buildDatainputSelect(listDoctors);
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevPros.language !== this.props.language){
            let dataSelect = this.buildDatainputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevPros.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let {resPayment,resPrice,resProvince} = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.buildDataInputSelect(resPrice);
            let dataSelectPayment = this.buildDataInputSelect(resPayment);
            let dataSelectProvince = this.buildDataInputSelect(resProvince);

            console.log('data new', dataSelectPrice, dataSelectPayment, dataSelectProvince);

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
        }
    }

    handleEditorChange = ({html, text}) => {
        console.log("editor");
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

   handleSaveContentMardown = () => {
    let {hasOldData} = this.state
    this.props.saveDetailDoctor({
        contentHTML: this.state.contentHTML,
        contentMarkdown: this.state.contentMarkdown,
        description: this.state.description,
        doctorId: this.state.selectedOption.value,
        action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
    })
    console.log('check state: ', this.state)
   }

   handleChangeSelect = async (selectedOption) => {
    this.setState({selectedOption});

    let res = await getDetailInforDoctor(selectedOption.value);
    if(res && res.errCode === 0 && res.data && res.data.Markdown){
        let markdown  = res.data.Markdown;
        this.setState({
            contentHTML: markdown.contentHTML,
            contentMarkdown: markdown.contentMarkdown,
            description: markdown.description,
            hasOldData: true,
        })
    }else{
        this.setState({
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            hasOldData: false,
        })
    }
    console.log('handle Change select test', res)
   }
   handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
   }
    render() 
    {
        let {hasOldData}= this.state;

        return (
                <div className='manager-doctor-container'>
                    <div className='manage-doctor-title'>
                        <FormattedMessage id="admin.manage-doctor.title"/>
                    </div>
                    <div className='more-infor'>
                        <div className='content-left form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.select-doctor"/></label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                                placeholder={'Chọn bác sĩ'}
                            />
                        </div>
                        <div className='content-right'>
                            <label><FormattedMessage id="admin.manage-doctor.intro"/></label>
                            <textarea className='form-control'
                                    //  rows="4"
                                    onChange={(event)=>this.handleOnChangeDesc(event)}
                                    value={this.state.description}
                            >
                            </textarea>
                        </div>
                    </div>
                    <div className="more-infor-extra row">
                        <div className="col-4 form-group">
                            <label> Chọn giá </label>
                            <Select
                                options= {this.state.listPrice}
                                placeholder={'Chọn giá'}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>Chọn phương thức thanh toán</label>
                            <Select
                                options={this.state.listPayment}
                                placeholder = {'Chọn phương thức thanh toán'}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label></label>
                        </div>
                    </div>
                    <div className='mange-doctor-editor'>
                    <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />
                    </div>
                    <button
                        onClick={()=> this.handleSaveContentMardown()}
                        className={hasOldData === true ? 'save-content-doctor': 'create-content-doctor'}>
                        {hasOldData === true ? <span>save</span>: <span>create</span>}
                     Luu thong tin</button>
                </div>
            
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctorsRedux: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
