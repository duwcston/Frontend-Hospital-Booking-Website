import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.css';
import { getAllUser } from '../../services/userService';
class UserManage extends Component {

    constructor(){
        super();
        this.state = {
            arrUsers:[]
        }
    }

    async componentDidMount() {
        let response = await getAllUser('ALL');
      
        if(response && response.errCode === 0){
            
            this.setState({
                arrUsers: response.users
            })
            console.log(this.state.arrUsers);
        }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className='user-conteiner'>
                <div className="title text-center">Manage users</div>
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
                                        <button className = "btn-edit"><i className = "fas fa-pencil-alt"></i></button>
                                        <button className = "btn-delete"><i className = "fas fa-trash"></i></button>
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
