import React, {Component} from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {Button, Modal, ModalHeader, ModalBody,ModalFooter} from 'reactstrap';
import {emitter} from "../../utils/emitter";

class ModalUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName:'',
            address:''
        }
        this.listenToEmitter();
    }

    listenToEmitter(){
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName:'',
                address:''
            })
        })
    }
    componentDidMount(){
        console.log('mounting modal')
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event, id) => {
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for( let i = 0; i < arrInput.length; i++){
            if (!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing paremeter: ' + arrInput[i]);
                break
            }
        }
        return isValid;
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.createNewUser(this.state, 'abc')
        }

    }

    render(){
        return(
            <Modal
                isOpen = {this.props.isOpen}
                toggle={() => {this.toggle()}}
                className={"modal-user-container"}
                size="lg"
                >
                    <ModalHeader toggle = {() => {this.toggle()}}>Create  a new User</ModalHeader>
                    <ModalBody>
                        <div className="model-user-body">
                            <div className="input-container">
                                <label>Email</label>
                                <input
                                    type="text"
                                    onChange={(event) => {this.handleOnChangeInput(event, "email")}}
                                    value= {this.state.email}
                                ></input>
                            </div>
                            <div className="input-container">
                                <label>Password</label>
                                <input
                                    type="text"
                                    onChange={(event) => {this.handleOnChangeInput(event, "password")}}
                                    value= {this.state.password}
                                ></input>
                            </div>
                            <div className="input-container">
                                <label>FirstName</label>
                                <input
                                    type="text"
                                    onChange={(event) => {this.handleOnChangeInput(event, "firstName")}}
                                    value= {this.state.firstName}
                                ></input>
                            </div>
                            <div className="input-container">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    onChange={(event) => {this.handleOnChangeInput(event, "lastName")}}
                                    value= {this.state.lastName}
                                ></input>
                            </div>

                            <div className="input-container">
                                <label>address</label>
                                <input
                                    type="text"
                                    onChange={(event) => {this.handleOnChangeInput(event, "address")}}
                                    value= {this.state.address}
                                ></input>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            className="px-3"
                            onClick={() => {this.handleAddNewUser()}}
                        >Add new</Button> {''}
                        <Button color="secondary"  className="px=3" onClick={()=>{this.toggle()}}>Close</Button>
                    </ModalFooter>
                </Modal>
        )
    }

  
}
const mapStateToProps = state => {
    return{

    };
}

const mapDispatchToProps = dispatch => {
    return{

    };
}
export default connect(mapStateToProps,mapDispatchToProps)(ModalUser);