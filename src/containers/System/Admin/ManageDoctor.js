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
            contentMarkdown:'',
            contentHTML:'',
            selectedOption:'',
            description:'',
            listDoctors:'',
            hasOldData:false
        }
    }

    async componentDidMount() {
       this.props.fetchAllDoctors();
    }

    buildDatainputSelect = (inputData) => {
        let result = [];
        let {language} = this.props
        if(inputData && inputData.length >0){
            inputData.map((item,index)=>{
                let object = {};
                let labelEn = `${item.lastName} ${item.firstName}`;
                let labelVi = `${item.firstName} ${item.lastName}`;

                object.label = language === LANGUAGES.EN ? labelEn : labelVi;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }

    componentDidUpdate(prevPros, prevState, snapshot){
        if(prevPros.allDoctorsRedux !== this.props.allDoctorsRedux){
            let listDoctors =this.props.allDoctorsRedux;
            console.log(listDoctors);
            let dataSelect = this.buildDatainputSelect(listDoctors);
            this.setState({
                listDoctors: dataSelect
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
                        Add doctors Infor
                    </div>
                    <div className='more-infor'>
                        <div className='content-left form-group'>
                            <label>Choose doctor</label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='content-right'>
                            <label>Introl</label>
                            <textarea className='form-control' rows="4"
                                    onChange={(event)=>this.handleOnChangeDesc(event)}
                                    value={this.state.description}
                            >
                                asdf
                            </textarea>
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
