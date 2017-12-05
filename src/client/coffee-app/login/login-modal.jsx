
import {modal} from "../../common/modal/modal";
import {userInfo} from "../authen/user-info";

const loginModal = {
    show() {

        modal.show(({close}) => (
            <div className="login-modal modal">
                Login?

                <div className="" onClick={() => {
                    close();
                    return userInfo.setUser({name: "Blah"});
                }}>
                    Đừng lo password, bấm đây login luôn
                </div>
            </div>
        ));
    }
};

exports.loginModal = loginModal;