import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import { CommonUtils } from "../../../utils";
import { createNewClinic } from "../../../services/userService";
import { toast } from "react-toastify";
import MdEditor from "react-markdown-editor-lite";
import "./ManageClinic.scss";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }
    }

    async componentDidMount() {


    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })
        }
    }

    handleSaveNewClinic = async () => {
        let res = await createNewClinic(this.state);
        if (res && res.errCode === 0) {
            toast.success('Add new Clinic succeeded');
            this.setState({
                name: '',
                imageBase64: '',
                address: '',
                descroptionHTML: '',
                descroptionMardown: '',
            })
        }
        else {
            toast.error('Add new Clinic failed');
            console.log(res);
        }
    }

    render() {

        return (
            <div className="manage-clinic-container">
                <div className="ms-title"><FormattedMessage id="manage-clinic.title" /></div>
                <div className="add-new-clinic row">
                    <div className="col-6 form-group">
                        <label htmlFor="name"><FormattedMessage id="manage-clinic.name" /></label>
                        <input type="text" className="form-control" id="name" value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')} />
                    </div>
                    <div className="col-6 form-group">
                        <label htmlFor="image"><FormattedMessage id="manage-clinic.image" /></label>
                        <input type="file" className="form-control-file" id="image"
                            onChange={(event) => this.handleOnchangeImage(event)} />
                    </div>
                    <div className="col-6 form-group">
                        <label htmlFor="name"><FormattedMessage id="manage-clinic.address" /></label>
                        <input type="text" className="form-control" id="address" value={this.state.address}
                            onChange={(event) => this.handleOnChangeInput(event, 'address')} />
                    </div>
                    <div className="col-12">
                        <MdEditor
                            style={{ height: "300px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12">
                        <button className="btn-save-clinic"
                            onClick={() => this.handleSaveNewClinic()}>
                            <FormattedMessage id="manage-clinic.save" />
                        </button>
                    </div>
                </div>
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);