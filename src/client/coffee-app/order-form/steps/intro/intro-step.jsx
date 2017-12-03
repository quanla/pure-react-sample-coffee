import classnames from "classnames";
import {RComponent} from "../../../../common/r-component";

export class IntroStep extends RComponent {

    render() {
        return (
            <div className="intro-step">
                <div className="install-app">
                    <img src="/assets/img/appicon.png"/>

                    The Coffee House Mobile

                    <a className="btn-install">
                        Cài đặt ngay
                    </a>
                </div>


                <h3>ĐẶT HÀNG VÀ GIAO TẬN NƠI TẠI</h3>
                <h2>THE COFFEE HOUSE DELIVERY</h2>
                <p>Đừng quên
                    <span>Đăng nhập</span> vào tài khoản
                    <span>The Coffee House Rewards</span> của bạn để tích điểm và nhận các ưu đãi nhé!
                </p>
                IntroStep
            </div>
        );
    }
}