import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLES } from "../../utils";

import { changeLanguageApp } from "../../store/actions"

import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLES.ADMIN) {
                menu = adminMenu;
            }

            if (role === USER_ROLES.DOCTOR) {
                menu = doctorMenu;
            }
        }
        this.setState({
            menuApp: menu
        })
    }

    render() {
        const { processLogout, language, userInfo } = this.props;
        console.log('check chekc', userInfo);
        return (
            <div className="header-container">
                {/* Navigator bar */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <span className='welcome'>
                    <FormattedMessage id='homeheader.welcome' />, <></>
                    {userInfo && userInfo.firstName ? userInfo.firstName : ''}<>!</>
                </span>
                <div className='languages'>
                    <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi '}><button onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</button></div>
                    <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en '}><button onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</button></div>
                </div>

                {/* Logout button */}
                <div className="btn btn-logout" onClick={processLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
