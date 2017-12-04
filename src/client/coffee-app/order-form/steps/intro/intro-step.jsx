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

                <div className="content">

                    <div className="head">
                        <h3>ĐẶT HÀNG VÀ GIAO TẬN NƠI TẠI</h3>
                        <h2>THE COFFEE HOUSE DELIVERY</h2>
                        <p>Đừng quên
                            <em> Đăng nhập </em>
                            vào tài khoản
                            <em> The Coffee House Rewards </em>
                            của bạn để tích điểm và nhận các ưu đãi nhé!
                        </p>
                    </div>

                    <div className="body">
                        <img src="/assets/img/tch.jpg"/>

                        <div className="order-steps">
                            <h3>Các bước đặt món</h3>

                            <ol>
                                <li>Điền thông tin nhận hàng (tên, số điện thoại, địa chỉ nhận hàng)</li>
                                <li>Chọn món yêu thích</li>
                                <li>Tối đa 30 phút <span className="legend"> (*) </span>bạn sẽ có ngay món uống yêu thích!</li>
                            </ol>
                        </div>

                        <div className="notes">
                            <p>(*) Thời gian có thể khác nhau tùy thuộc vào vị trí và giao thông tại thời điểm đặt hàng</p>
                            <p>Thời gian phục vụ : 7h-20h</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}