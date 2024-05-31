import React, {Component} from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate} from '../../../services/userService';

class DoctorSchedule extends Component {

    constructor(props){
        super (props);
        this.state = {
            allDays: [],
            allAvalableTime:[]
        }
    }

    async componentDidMount() {
        let {language} = this.props;

        console.log ('moment vie:', moment(new Date()).format('dddd - DD/MM'));
        console.log ('moment en:', moment(new Date()).locale('en').format("ddd - DD/MM"));
        this.setArrDays(language);

    }

    capitalizeFirstLetter(string){
        return string.charAt(0).toUpperCase()+ string.slice(1);
    }

    setArrDays = (language) => {
        let allDays = []
        for (let i=0; i < 7; i++){
            let object = {};
            if (language === LANGUAGES.VI){
                let labelVi = moment(new Date()).add(i, 'days').format('dddd -DD/MM');
                object.label = this.capitalizeFirstLetter(labelVi)
            } else {
                object.label = moment(new Date()).add(i,'days').locale('en').format('ddd -DD/MM');
            }
            object.value = moment(new Date()).add(i,'days').startOf('day').valueOf();
            allDays.push(object);
        }
        this.setState({
            allDays: allDays,
        })
    }

    componentDidUpdate(prevPros, prevState, snapshot){
        if(this.props.language !== prevPros.language){
            this.setArrDays(this.props.language);
        }
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !==1){
            let doctorID = this.props.doctorIdFromParent;
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorID, date);

            if(res && res.errCode === 0){
                this.setState({
                    allAvalableTime: res.data ? res.data :[]
                })
            }
            console.log('check res schedule from react:', res)
        }
    }

    render () {
        let { allDays,allAvalableTime } = this.state;
        let { language } = this.props;
        return (
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    <select onChange={(event) => this.handleOnChangeSelect(event)}>
                        {allDays && allDays.length > 0 &&
                            allDays.map((item,index) => {
                                return (
                                    <option 
                                        value = {item.value}
                                        key={index}
                                    >
                                        {item.label}
                                    </option>
                                )
                            })}
                    </select>
                </div>
                <div className="all-available-time">
                    <div className="text-calender">
                            <i className="fas fa-calender-alt"><span>Lịch khám</span></i>
                    </div>
                    <div className="time-content">
                        {allAvalableTime && allAvalableTime.length > 0 ?
                            allAvalableTime.map((item,index) => {
                                let timeDisplay = language === LANGUAGES.VI > 0 ?
                                    item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                return (
                                    <button key={index} > {timeDisplay} </button>
                                )
                            })

                            :
                            <div> No schedule this time, please select another time! </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return{
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
