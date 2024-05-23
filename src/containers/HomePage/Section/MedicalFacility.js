import React, { Component } from 'react';
import { connect } from 'react-redux';
//import './MedicalFacility.scss'
import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MedicalFacility extends Component {

   

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        };
        
        return (
            
            <div className='section-share section-medical-facility'>
                <div className="section-container">
                    <div className='section-header'>
                        <span className='title-section'>Medical Facility</span>
                        <button className='btn-section'> more </button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'/>
                                <div> something 1</div>
                            </div>
                            <div className='section-customize '>
                                <div className='bg-image section-medical-facility'/>
                                <div> something 2</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'/>
                                <div> something 3</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'/>
                                <div> something 4</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'/>
                                <div> something 5</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'/>
                                <div> something 6</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'/>
                                <div> something7</div>
                            </div> 
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'/>
                                <div> something 8</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'/>
                                <div> somethin9</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
