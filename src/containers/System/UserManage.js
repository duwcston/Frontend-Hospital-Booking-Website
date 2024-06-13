import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUser, createNewUserService, deleteUserService,editUserService  } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';

import { emitter } from '../../utils/emitter';

class UserManage extends Component {

    constructor(){
        super();
        this.state = {
            arrUsers:[],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit:{}
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact();

    }
    getAllUserFromReact = async () => {
        let response = await getAllUser('ALL');
      
        if(response && response.errCode === 0){
            
            this.setState({
                arrUsers: response.users
            })
            console.log(this.state.arrUsers);
        }
    }
    
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalUser,
            userEdit: user
        })
    }

    handleDeleteUser = async (user) => {
        try{
            let response = await deleteUserService(user.id);
            if(response && response.errCode !== 0){
                alert(response.errMessage);
            }else{
                await this.getAllUserFromReact();


        }}catch(e){
            console.log(e);
        }
    }
        
    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    createNewUser = async (data) => {
        try{
            let response = await createNewUserService(data);
            if(response && response.errCode !== 0){
                alert(response.errMessage);
            }else{
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser:false
                })

                emitter.emit('EVENT_CLAER_MODAL_DATA')
            }

        }catch(e){
            console.log(e);
        }
    }

    doHandleEditUser= async(user)=>{
        let res = await editUserService(user);
        if (res && res.errCode===0){
            this.setState({
                isOpenModalEditUser: false
            })
            await this.getAllUserFromReact();
        }
        console.log('click save user', user)
    }
   
    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className='user-conteiner'>
             <ModalUser 
                isOpen ={this.state.isOpenModalUser}
                toggleFromParent = {this.toggleUserModal}
                createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser &&
                <ModalEditUser 
                isOpen ={this.state.isOpenModalEditUser}
                toggleFromParent = {this.toggleUserEditModal}
                currentUser={this.state.userEdit}
                editUser={this.doHandleEditUser}
                />
                }
                <div className="title text-center">Manage users</div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewUser()}
                    ><i className="fas fa-plus"></i> Create new user </button>
                </div>
                <div className='user-table mt-4 mx-3'>
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {arrUsers && arrUsers.map((item,index)=>{
                            console.log('check map', item, index)
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className = "btn-edit" onClick={() => this.handleEditUser(item)}><i className = "fas fa-pencil-alt"></i></button>
                                        <button className = "btn-delete" onClick={() => this.handleDeleteUser(item)}><i className = "fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        }
                        )}
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
