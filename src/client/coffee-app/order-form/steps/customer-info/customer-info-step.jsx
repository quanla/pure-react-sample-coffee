import classnames from "classnames";
import {RComponent} from "../../../../common/r-component";

export class CustomerInfo extends RComponent {

    render() {
        const {fv} = this.props;

        return (
            <div className="customer-info-step">
                <div className="header">
                    <div className="">
                        <img src="assets/img/logo_tch_black.png"/>
                    </div>

                    <div className="text">
                        <span>Thông tin người nhận </span>
                        <span className="small">(Bước 1/4)</span>
                    </div>

                </div>

                <div className="form">
                    <div className="form-group">
                        <input
                            className="form-control"
                            placeholder="Tên"
                            {...fv.bind("name")}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            placeholder="Số điện thoại"
                            {...fv.bind("phone")}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            placeholder="Email"
                            {...fv.bind("email")}
                        />
                    </div>
                    <div className="form-group">
                        <label className="delivery-time-radio"
                            onClick={() => fv.pushValue(true, "deliver_now")}
                        >
                            <img
                                src={fv.getValue("deliver_now")? `assets/img/option_active.png` : `assets/img/option_inactive.png`} className="option-radio"
                            />
                            Giao hàng ngay
                        </label>
                        <label className="delivery-time-radio"
                            onClick={() => fv.pushValue(false, "deliver_now")}
                        >
                            <img
                                src={!fv.getValue("deliver_now") ? `assets/img/option_active.png` : `assets/img/option_inactive.png`} className="option-radio"
                            />
                            Chọn thời gian
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}