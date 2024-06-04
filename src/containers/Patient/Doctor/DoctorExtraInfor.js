import React, {Component} from "react";
import { connect } from "react-redux";
import './DoctorExtraInfor.scss';
import {LANGUAGES} from '../../../utils';
import { getScheduleDoctorByDate } from "../../../services/userService"; 
import { FormattedMessage } from "react-intl";

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false
        }
    }

    async componentDidMount () {


    }
    async componentDidUpdate (prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language){

        }
    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor } = this.state;

        return (
            <div className="doctor-extra-infor-container">
                <div className="content-up">
                    <div className="text-address"> ĐỊA CHỈ KHÁM</div>
                    <div className="name-clinic"> Phòng khám chuyên khoa Da Liễu</div>
                    <div className="detail-address"> 207-Phố Huế-Hai Bà Trung- Hà Nội</div>
                </div>
                <div className="content-down">
                    {isShowDetailInfor === false &&
                        <div className="short-infor">
                        GÍA KHÁM:250K.
                        <span onClick={() => this.showHideDetailInfor(true)}>
                            Xem chi tiết
                        </span>    
                        </div>
                    }

                    {isShowDetailInfor ===true &&
                    <>
                        <div className="title-price">
                        GÍA KHÁM:.</div>
                        <div className="detail-infor">
                            <div>
                                <span className="left">Gía Khám</span>
                                <span className="right">250K</span>
                            </div>  
                            <div className="note">
                                Được ưu tiên khám trước khi đặt khám qua BookingCare.
                            </div>
                        </div>
                        <div className="payment">
                                Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt thẻ
                        </div>
                        <div className="hide-price">
                               <span onClick={() => this.showHideDetailInfor(false)}>
                                    Ânr bảng giá
                               </span>
                        </div>
                    </>
                    }
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
    return{
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);