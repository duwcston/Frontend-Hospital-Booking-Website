import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagerUser.css';
import * as actions from "../../../store/actions"


class TableManagerUser extends Component {

    constructor(){
        super();
        this.state = {
            userRedux:[]
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }
    componentDidUpdate(prevPros, prevState, snapshot){
        console.log('asdfasdf');
        if(prevPros.listUsers !== this.props.listUsers){
            let UserArray =this.props.listUsers;
            
            this.setState({
               userRedux: UserArray
            })
        }
        
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id);
    }
   
   
    render() 
    {

        let arrUsers = this.state.userRedux;
        return (
        
                    <table id="TableManageUser">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {arrUsers && arrUsers.map((item,index)=>{
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className = "btn-edit" ><i className = "fas fa-pencil-alt"></i></button>
                                        <button className = "btn-delete" onClick={() => this.handleDeleteUser(item)}><i className = "fas fa-trash"  ></i></button>
                                    </td>
                                </tr>
                            )
                        }
                        )}
                        </tbody>
                    </table>
            
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux:() => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.deletaUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerUser);
