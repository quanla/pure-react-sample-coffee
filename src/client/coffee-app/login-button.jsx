import classnames from "classnames";
import {RComponent} from "../common/r-component";

export class LoginButton extends RComponent {

    render() {
        return (
            <div className="login-button">
                <img src="/assets/img/user_avatar.png"/>

                <div className="text">
                    Đăng nhập để tích điểm
                </div>

                <a className="hotline" href="tel:0909090909">
                    <i className="fa fa-phone" aria-hidden="true"/>
                </a>
            </div>
        );
    }
}