import classnames from "classnames";
import {RComponent} from "../common/r-component";
import {OrderForm} from "./order-form/order-form";
import {LoginButton} from "./login-button";

export class CoffeeApp extends RComponent {

    render() {
        return (
            <div className="coffee-app">
                <OrderForm/>

                <LoginButton/>
            </div>
        );
    }
}