import classnames from "classnames";
import {RComponent} from "../common/r-component";
import {OrderForm} from "./order-form/order-form";
import {LoginButton} from "./login-button";
import {ModalRegistry} from "../common/modal/modal-registry";
import {userInfo} from "./authen/user-info";

export class CoffeeApp extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.onUnmount(userInfo.onChange(() => this.forceUpdate()));
    }

    render() {
        let user = userInfo.getUser();

        return (
            <div className="coffee-app">
                <OrderForm/>

                {user == null ? (
                    <LoginButton/>
                ) : (
                    <div className="">
                        Logged in as: {user.name}
                    </div>
                )}

                <ModalRegistry/>
            </div>
        );
    }
}