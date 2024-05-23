import React, { Component } from 'react';
import { connect } from 'react-redux';
//import './Specialty.scss'
import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {

   

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        };
        
        return (
            
            <div className='section-share section-specialty'>
                <div className="section-container">
                    <div className='section-header'>
                        <span className='title-section'>Specialty</span>
                        <button className='btn-section'> more </button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'/>
                                <div> something 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'/>
                                <div> something 2</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'/>
                                <div> something 3</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'/>
                                <div> something 4</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'/>
                                <div> something 5</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'/>
                                <div> something 6</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image'/>
                                <div> something7</div>
                            </div> 
                            <div className='section-customize'>
                                <div className='bg-image'/>
                                <div> something 8</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image'/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
