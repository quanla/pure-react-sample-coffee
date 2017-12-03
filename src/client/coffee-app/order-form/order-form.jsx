import classnames from "classnames";
import {RComponent} from "../../common/r-component";
import {FlipWizard} from "./flip-wizard/flip-wizard";
import {IntroStep} from "./steps/intro/intro-step";
import {CustomerInfo} from "./steps/customer-info/customer-info-step";

export class OrderForm extends RComponent {
    constructor(props, context) {
        super(props, context);

        this.steps = [
            {
                render: () => (
                    <IntroStep/>
                )
            },
            {
                title: "Nhập thông tin đặt hàng",
                render: ({onGoBack}) => (
                    <CustomerInfo
                        onGoBack={onGoBack}
                    />
                )
            },
        ];
    }


    render() {

        return (
            <div className="order-form">
                <FlipWizard
                    steps={this.steps}
                />
            </div>
        );
    }
}
