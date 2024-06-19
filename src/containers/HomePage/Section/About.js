import React, { Component } from 'react';
import { connect } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class About extends Component {
    render() {
        
        return (
            
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    About
                </div>
                <div className='section-about-centent'>
                    <iframe width='50%' height='480'
                        title='video'
                        allowFullScreen>
                    </iframe>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
