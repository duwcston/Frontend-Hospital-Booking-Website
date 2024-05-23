import React, { Component } from 'react';
import { connect } from 'react-redux';
//import './OutStandingDoctor.scss'
import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class OutStandingDoctor extends Component {

   

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        };
        
        return (
            
            <div className='section-share section-outstanding-doctor'>
                <div className="section-container">
                    <div className='section-header'>
                        <span className='title-section'>Doctor</span>
                        <button className='btn-section'> more </button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize '>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'/>
                                    </div>
                                    <div className='position text-center'>
                                        <div> Name 1</div>
                                        <div> something 1</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize '>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'/>
                                    </div>
                                    <div className='position text-center'>
                                        <div> Name 2</div>
                                        <div> something 2</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize '>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'/>
                                    </div>
                                    <div className='position text-center'>
                                        <div> Name 3</div>
                                        <div> something 3</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize '>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'/>
                                    </div>
                                    <div className='position text-center'>
                                        <div> Name 4</div>
                                        <div> something 4</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize '>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'/>
                                    </div>
                                    <div className='position text-center'>
                                        <div> Name 5</div>
                                        <div> something 5</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize '>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'/>
                                    </div>
                                    <div className='position text-center'>
                                        <div> Name 6</div>
                                        <div> something </div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize '>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'/>
                                    </div>
                                    <div className='position text-center'>
                                        <div> Name 1</div>
                                        <div> something 1</div>
                                    </div>
                                </div>
                            </div>
                    
                        </Slider>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
