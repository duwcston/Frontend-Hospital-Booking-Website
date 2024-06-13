import React, {Component} from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import './userRedux.css'
import {Buffer} from 'buffer';
import { LANGUAGES , CRUD_ACTIONS, CommonUtils} from "../../../utils";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import 'react-image-lightbox/style.css';
import TableManagerUser from "./TableManagerUser";
class UserRedux extends Component {

    constructor(props){
        super(props);
        this.state = {
            genderArr: [],
            positionArr:[],
            roleArr:[],
            previewImgURL: '',
            isOpen:false,

            email: '',
            password: '',
            firstName: '',
            lastName:'',
            address:'',
            phonenumber:'',
            gender:'',
            position:'',
            role:'',
            avatar:'',
            action: '',
            userEitId:'',
        }
    }


    async componentDidMount(){
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    
    }
    componentDidUpdate(prevPros, prevState, snapshot){
        
        if(prevPros.genderRedux !== this.props.genderRedux){
            let arrGender = this.props.genderRedux;
            this.setState({
                genderArr: arrGender,
                gender: arrGender && arrGender.length>0 ? arrGender[0].keyMap : ''
            })
        }
        
        if(prevPros.roleRedux !== this.props.roleRedux){
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }
        if(prevPros.positionRedux !== this.props.positionRedux){
            let arrPositions = this.props.positionRedux;
           
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''
            })
        }
        if(prevPros.listUsers !== this.props.listUsers){
            let arrGender = this.props.genderRedux;
            let arrRoles = this.props.roleRedux;
            let arrPositions = this.props.positionRedux;

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName:'',
                address:'',
                phonenumber:'',
                gender:arrGender && arrGender.length>0 ? arrGender[0].keyMap: '',
                position:arrPositions && arrPositions.length>0 ? arrPositions[0].keyMap: '',
                role:arrRoles && arrRoles.length>0 ? arrRoles[0].keyMap: '',
                avatar:'',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL:''
                
            })
        }
    }

    handleOnChangeImage = async (event) =>{
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar:base64,
            })

        }
    }

    handleSaveUser = () => {
        
        let isValid = this.checkValidateInput();
       
        if(isValid === false)return;

        let {action} = this.state;
        console.log("hello", action);
        if(action === CRUD_ACTIONS.CREATE){
            console.log("hello");

        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName:this.state.lastName,
            address:this.state.address,
            phonenumber:this.state.phonenumber,
            gender:this.state.gender,
            positionId:this.state.position,
            roleId:this.state.role,
            avatar:this.state.avatar
        })
        }
    if(action === CRUD_ACTIONS.EDIT){
        this.props.editUserRedux({
            id:this.state.userEditId,
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName:this.state.lastName,
            address:this.state.address,
            phonenumber:this.state.phonenumber,
            gender:this.state.gender,
            positionId:this.state.position,
            roleId:this.state.role,
            avatar: this.state.avatar
        })
    }
    }
    checkValidateInput = () =>{
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phonenumber','address']
        for(let i = 0; i < arrCheck.length; i++){
            if(!this.state[arrCheck[i]]){
                isValid = false;
                alert('this input required: ' + arrCheck[i]);
                break;
            }
        }
        return isValid;
    }

    onChangeInput = (event, id) =>{
        let copyState = {...this.state}
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        },() => {
            console.log('check input change',this.state)
        })
    }

    openPreviewImage = () => {
        if(!this.state.previewImgURL){
            return;
        }
        this.setState({
            isOpen:true
        })
    }
    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if(user.image){
            //alert('hello');
            imageBase64 =  Buffer.from(user.image, 'base64').toString('binary');
        }
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName:user.lastName,
            address:user.address,
            phonenumber:user.phonenumber,
            gender:user.gender,
            position:user.positionId,
            role:user.roleId,
            avatar:'',
            previewImgURL:imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId:user.id,
        })
    }

    render(){
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language
        let isGetGenders = this.props.isLoadingGender;

        let {email, password,firstName,lastName,phonenumber,address,gender,position,role,avatar} = this.state
        return(
           <div className="user-redux-container">
                <div className="title">
                    User Redux 
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <div>
                            <div class="row">
                                <div class="form-group col-md-12"><FormattedMessage id='manage-user.add'/></div>
                                <div class="form-group col-md-12">{isGetGenders === true ? 'Loading gender': ''}</div>
                            </div>
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="inputEmail4"><FormattedMessage id='manage-user.email'/></label>
                                    <input type="text" class="form-control" id="email"  
                                    value={email}
                                    onChange={(event)=>{this.onChangeInput(event,'email')}}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true: false}
                                    />
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="inputPassword4"><FormattedMessage id='manage-user.password'/></label>
                                    <input type="password" class="form-control" id="password" 
                                        value={password}
                                        onChange={(event)=>{this.onChangeInput(event,'password')}}
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="inputEmail4"><FormattedMessage id='manage-user.first-name'/></label>
                                    <input type="text" class="form-control" id="firstName" 
                                        value={firstName}
                                        onChange={(event)=>{this.onChangeInput(event,'firstName')}}
                                    />
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="inputPassword4"><FormattedMessage id='manage-user.last-name'/></label>
                                    <input type="text" class="form-control" id="lastName" 
                                        value={lastName}
                                        onChange={(event)=>{this.onChangeInput(event,'lastName')}}
                                    />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputAddress"><FormattedMessage id='manage-user.address'/></label>
                                <input type="text" class="form-control" id="address" 
                                        value={address}
                                        onChange={(event)=>{this.onChangeInput(event,'address')}}
                                />
                            </div>
                            <div class="form-group">
                                <label for="inputAddress2"><FormattedMessage id='manage-user.phone-number'/></label>
                                <input type="number" class="form-control" id="phonenumber" 
                                    value={phonenumber}
                                        onChange={(event)=>{this.onChangeInput(event,'phonenumber')}}
                                />
                            </div>
                            <div class="row">
                                <div class="form-group col-md-3">
                                <label for="inputState"><FormattedMessage id='manage-user.gender'/></label>
                                <select id="inputState" class="form-control"
                                    onChange={(event)=>{this.onChangeInput(event,'gender')}}
                                    value={gender}>
                                {genders && genders.length > 0 &&
                                    genders.map ((item,index) =>{
                                        return(
                                            <option key= {index} value={item.keyMap}>{
                                                language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            
                                        )
                                    })
                                }
                                    
                                </select>
                                </div>
                                <div class="form-group col-md-3">
                                <label for="inputState"><FormattedMessage id='manage-user.position'/></label>
                                <select id="inputState" class="form-control"
                                 onChange={(event)=>{this.onChangeInput(event,'position')}}
                                 value={position}>
                                {positions && positions.length > 0 &&
                                    positions.map ((item,index) =>{
                                        return(
                                            <option key= {index} value={item.keyMap}>{
                                                language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            
                                        )
                                    })
                                }
                                </select>
                                </div>
                                <div class="form-group col-md-3">
                                <label for="inputState"><FormattedMessage id='manage-user.role'/></label>
                                <select id="inputState" class="form-control"
                                onChange={(event)=>{this.onChangeInput(event,'role')}}
                                value={role}>
                                {roles && roles.length > 0 &&
                                    roles.map ((item,index) =>{
                                        return(
                                            <option key= {index} value={item.keyMap}>{
                                                language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            
                                        )
                                    })
                                }
                                </select>
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="inputZip"><FormattedMessage id='manage-user.image'/></label>
                                    <div className="preview-img-container">
                                        <input id = "previewImg" type="file"hidden
                                            onChange={(event)=>{this.handleOnChangeImage(event)}}
                                        />
                                        <label className="label-upload" htmlFor="previewImg">upload <i className="fas fa-upload"></i></label>
                                        <div className="preview-image"
                                            style = {{backgroundImage: `url(${this.state.previewImgURL})`}}
                                            onClick={()=>this.openPreviewImage()}
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="gridCheck"/>
                                <label class="form-check-label" for="gridCheck">
                                    Check me out
                                </label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-md-12"></div>
                            </div>
                            <button type="submit" class={this.state.action=== CRUD_ACTIONS.EDIT ? "btn btn-warning" :"btn btn-primary"} 
                            onClick={()=>{this.handleSaveUser()}}>
                             {this.state.action === CRUD_ACTIONS.EDIT ?
                                <FormattedMessage id='manage-user.edit'/> :
                                <FormattedMessage id='manage-user.save'/>
                                }
                            </button>
                            </div>
                        </div>
                                <div className="col-12 mb-5">
                                    <TableManagerUser
                                        handleEditUserFromParentKey = {this.handleEditUserFromParent}
                                        action={this.state.action}
                                    />
                                </div>

                        {this.state.isOpen === true &&
                            <Lightbox
                                mainSrc={this.state.previewImgURL}
                                onCloseRequest={()=> this.setState({isOpen: false})}
                            />

                        }
                    </div>

           </div>
        )
    }

  
}
const mapStateToProps = state => {
    return{
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users,
    };
}

const mapDispatchToProps = dispatch => {
    return{
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data)  => dispatch(actions.createNewUser(data)),
        fetchUserRedux:() => dispatch(actions.fetchAllUsersStart()),
        editUserRedux: (data) => dispatch(actions.editAUser(data)),

    };
}
export default connect(mapStateToProps,mapDispatchToProps)(UserRedux);