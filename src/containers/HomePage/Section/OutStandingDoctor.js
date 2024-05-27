import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OutStandingDoctor.scss'
import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {withRouter} from 'react-router';

import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
class OutStandingDoctor extends Component {
    constructor(props){
        super(props)
        this.state = {
            arrDoctors:[]
        }
    }
   componentDidUpdate(prevProps,prevState,snapshot){
    if(prevProps.topDoctorRedux !== this.props.topDoctorRedux){
        this.setState({
            arrDoctors: this.props.topDoctorRedux
        })
    }
   }
   componentDidMount(){
    this.props.loadTopDoctors();
   }
   handleViewDetailDoctor = (doctor) => {
    console.log('change view infor', doctor)
    if(this.props.history){
        this.props.history.push(`/detail-doctor/${doctor.id}`)

    }
   }
    render() {
        let arrDoctors = this.state.arrDoctors;
        let {language}= this.props;
        // arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors)
        console.log('channel: ', this.props)
        return (
            
            <div className='section-share section-outstanding-doctor'>
                <div className="section-container">
                    <div className='section-header'>
                        <span className='title-section'>
                            <FormattedMessage id="homepage.out-standing-doctor"/>
                        </span>
                        <button className='btn-section'> 
                            <FormattedMessage id="homepage.more-infor"/>
                        </button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                        {arrDoctors && arrDoctors.length >0 
                        && arrDoctors.map((item,index)=>{
                            let imageBase64 = '';
                            if(item.image){
                                {/* imageBase64 = new Buffer(item.image, 'base64').toString('binary'); */}
                            }
                            let nameEn = `${item.positionData.valueEn}, ${item.lastName}  ${item.firstName}`;
                            let nameVi = `${item.positionData.valueVi}, ${item.lastName}  ${item.firstName}`;
                            return(
                            <div className='section-customize ' key={index} onClick={()=>this.handleViewDetailDoctor(item)}>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'
                                                style={{backgroundImage: `url(${imageBase64})`}}
                                        />
                                    </div>
                                    <div className='position text-center'>
                                        <div> {language == LANGUAGES.EN ? nameEn : nameVi}</div>
                                        <div> something 1</div>
                                    </div>
                                </div>
                            </div>
                        )
                        })
                           
                        }
                        </Slider>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        topDoctorRedux: state.admin.topDoctors,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
