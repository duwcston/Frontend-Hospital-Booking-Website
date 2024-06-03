import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: null,
            description: '',
            listDoctors: [],
            hasOldData: false,

            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: null,
            selectedPayment: null,
            selectProvince: null,
            nameClinic: '',
            addressClinic: '',
            note: ''
        };
    }

    async componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getAllRequiredDoctorInfor();
    }

    buildDataInputSelect = (inputData, type) => {
        if (!Array.isArray(inputData)) {
            console.error('Expected inputData to be an array, received:', inputData);
            return [];
        }
    
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                result = inputData.map((item, index) => {
                    let object = {};
                    let labelEn = `${item.lastName} ${item.firstName}`;
                    let labelVi = `${item.firstName} ${item.lastName}`;
    
                    object.label = language === LANGUAGES.EN ? labelEn : labelVi;
                    object.value = item.id;
                    return object;
                });
            } else if (type === 'PRICE') {
                result = inputData.map((item, index) => {
                    let object = {};
                    let labelEn = `${item.valueVi}`;
                    let labelVi = `${item.valueEn} USD`;
    
                    object.label = language === LANGUAGES.EN ? labelEn : labelVi;
                    object.value = item.keyMap;
                    return object;
                });
            } else if (type === 'PAYMENT' || type === 'PROVINCE') {
                result = inputData.map((item, index) => {
                    let object = {};
                    let labelEn = `${item.valueVi}`;
                    let labelVi = `${item.valueEn} USD`;
    
                    object.label = language === LANGUAGES.EN ? labelEn : labelVi;
                    object.value = item.keyMap;
                    return object;
                });
            }
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            this.setState({
                listDoctors: dataSelect
            });
        }
        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
        //     this.setState({
        //         listDoctors: dataSelect
        //     });
        // }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            console.log('get data from redux:', this.props.allRequiredDoctorInfor)
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');

            console.log('check data:',dataSelectPrice,dataSelectPayment,dataSelectProvince)

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            });
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            let { resPayment, resPrice, resProvince} = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice,'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment,'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince,'PROVINCE');
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            }); 
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        });
    }

    handleSaveContentMarkdown = () => {
        let { hasOldData, selectedPrice, selectedPayment, selectProvince } = this.state;
    
        // Check if any of the required properties are null before accessing their value property
        if (selectedPrice && selectedPayment && selectProvince) {
            this.props.saveDetailDoctor({
                contentHTML: this.state.contentHTML,
                contentMarkdown: this.state.contentMarkdown,
                description: this.state.description,
                doctorId: this.state.selectedOption.value,
                action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    
                selectedPrice: selectedPrice.value,
                selectedPayment: selectedPayment.value,
                selectProvince: selectProvince.value,
                nameClinic: this.state.nameClinic,
                addressClinic: this.state.addressClinic,
                note: this.note,
            });
        } else {
            // Handle the case where any of the required properties are null
            console.error('One or more required properties are null');
        }
    }
    

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });

        let res = await getDetailInforDoctor(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            });
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            });
        }
    }

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        });
    }

    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName= name.name;
        let stateCopy = {...this.state};
        stateCopy[stateName] = selectedOption;
        this.setState ({
            ...stateCopy
        })
    }

    handleOnChangeText = (event,id) => {
        let stateCopy = {...this.state};
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    render() {
        let { hasOldData } = this.state;
        console.log('check state:', this.state)
        return (
            <div className='manager-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor"/>}
                        />
                    </div>
                    <div className='content-right'>
                        <label><FormattedMessage id="admin.manage-doctor.intro" /></label>
                        <textarea className='form-control'
                                  onChange={(event) => this.handleOnChangeText(event,'description')}
                                  value={this.state.description}
                        />
                    </div>
                </div>
                <div className="more-infor-extra row">
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.price"/></label>
                        <Select
                            value = {this.state.selectedPrice}
                            onChange = {this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price"/>}
                            name = "selectedPrice"
                        />
                    </div>
                    <div className="col-4 form-group">
                        {/* <label><FormattedMessage id="admin.manage-doctor.payment"/></label>
                        <Select
                            value= {this.state.selectedPayment}
                            onChange = {this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment"/>}
                        /> */}
                        <label>Chọn phương thức thanh toán</label>
                        <Select
                            options={this.state.listPayment}
                            placeholder={'Chọn phương thức thanh toán'}
                        />  
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.province"/></label>
                        <Select
                            value = {this.state.selectProvince}
                            onChange = {this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province"/>}
                            name = "selectProvince"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.nameClinic"/></label>
                        <input className="form-control" 
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.addressClinic"/></label>
                        <input className="form-control"
                            onChange={(event) => this.handleOnChangeText(event,'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.note"/></label>
                        <input className="form-control"
                            onChange={(event) => this.handleOnChangeText(event,'note')}
                            value={this.state.note}
                        />
                    </div>
                </div>
                <div className='mange-doctor-editor'>
                    <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />
                </div>
                <button
                    onClick={this.handleSaveContentMarkdown}
                    className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}>
                    {hasOldData === true ?
                        <span><FormattedMessage id="admin.manage-doctor.save" /></span> :
                        <span><FormattedMessage id="admin.manage-doctor.add" /></span>}
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);

