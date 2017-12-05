import classnames from "classnames";
import {RComponent} from "../common/r-component";
import {loginModal} from "./login/login-modal";

export class LoginButton extends RComponent {

    render() {

        return (
            <div className="login-button">
                <img src="assets/img/user_avatar.png" onClick={loginModal.show}/>

                <div className="text" onClick={loginModal.show}>
                    Đăng nhập để tích điểm
                </div>

                <a className="hotline" href="tel:0909090909">
                    <i className="fa fa-phone" aria-hidden="true"/>
                </a>
            </div>
        );
    }
}