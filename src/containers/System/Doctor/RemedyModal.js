import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './RemedyModal.scss';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { CommonUtils } from "../../../utils";

class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: '',
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            })
        }

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.dataModal !== prevProps.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            })
        }
    }

    handleOnchangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    hanldeOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64
            })
        }
    }

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }

    render() {
        let { isOpenModal, closeRemedyModal, sendRemedy } = this.props;
        return (
            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size="md"
                centered
            >
                <div className="modal-header">
                    <h5 className="modal-title">
                        <FormattedMessage id="send-remedy.title" />
                    </h5>
                    <button type="button" className="close" aria-label="Close" onClick={closeRemedyModal}>
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label><FormattedMessage id="send-remedy.email" /></label>
                            <input className="form-control" type="email" value={this.state.email} onChange={(event) => this.handleOnchangeEmail(event)} />
                        </div>
                        <div className="col-6 form-group">
                            <label><FormattedMessage id="send-remedy.file" /></label>
                            <input className="form-control" type="file" onChange={(event) => this.hanldeOnchangeImage(event)} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleSendRemedy()}><FormattedMessage id="send-remedy.send" /></Button>{''}
                    <Button color="secondary" onClick={closeRemedyModal}><FormattedMessage id="send-remedy.cancel" /></Button>
                </ModalFooter>
            </Modal>
        )
    }

}


const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);