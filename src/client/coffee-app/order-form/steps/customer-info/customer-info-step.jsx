import classnames from "classnames";
import {RComponent} from "../../../../common/r-component";

export class CustomerInfo extends RComponent {

    render() {
        return (
            <div className="customer-info-step">
                <div className="title">
                    <div className="">
                        <img src="/assets/img/logo_tch_black.png"/>
                    </div>

                    <div className="text">
                        <span>Thông tin người nhận </span>
                        <span className="small">(Bước 1/4)</span>
                    </div>

                </div>
            </div>
        );
    }
}