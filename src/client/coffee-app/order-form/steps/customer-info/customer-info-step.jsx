import classnames from "classnames";
import {RComponent} from "../../../../common/r-component";

export class CustomerInfo extends RComponent {

    render() {
        const {customer, onChange} = this.props;

        return (
            <div className="customer-info-step">
                <div className="header">
                    <div className="">
                        <img src="/assets/img/logo_tch_black.png"/>
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
                            value={customer.name}
                            onChange={(e) => onChange({...customer, name: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            placeholder="Số điện thoại"
                            value={customer.phone}
                            onChange={(e) => onChange({...customer, phone: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            placeholder="Email"
                            value={customer.email}
                            onChange={(e) => onChange({...customer, email: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label className="delivery-time-radio"
                            onClick={() => onChange({...customer, deliver_now: true})}
                        >
                            <img
                                src={customer.deliver_now ? `/assets/img/option_active.png` : `/assets/img/option_inactive.png`} className="option-radio"
                            />
                            Giao hàng ngay
                        </label>
                        <label className="delivery-time-radio"
                            onClick={() => onChange({...customer, deliver_now: false})}
                        >
                            <img
                                src={!customer.deliver_now ? `/assets/img/option_active.png` : `/assets/img/option_inactive.png`} className="option-radio"
                            />
                            Chọn thời gian
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}