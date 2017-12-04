import classnames from "classnames";
import {RComponent} from "../../common/r-component";
import {FlipWizard} from "./flip-wizard/flip-wizard";
import {IntroStep} from "./steps/intro/intro-step";
import {CustomerInfo} from "./steps/customer-info/customer-info-step";

export class OrderForm extends RComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            customer: {
                name: "",
                phone: "",
                email: "",
                deliver_now: true
            }
        };

        this.steps = [
            {
                render: () => (
                    <IntroStep/>
                ),
                cardClassName: "intro-step",
            },
            {
                title: "Nhập thông tin đặt hàng",
                render: () => (
                    <CustomerInfo
                        customer={this.state.customer}
                        onChange={(customer) => this.setState({customer})}
                    />
                )
            },
            {
                title: "Chọn vị trí giao hàng",
                render: ({onGoBack}) => (
                    <CustomerInfo/>
                )
            },
        ];
    }

    render() {

        return (
            <div className="order-form">
                <FlipWizard
                    initStepIndex={1}
                    steps={this.steps}
                />
            </div>
        );
    }
}
