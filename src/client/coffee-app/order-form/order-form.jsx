import classnames from "classnames";
import {RComponent} from "../../common/r-component";
import {FlipWizard} from "./flip-wizard/flip-wizard";
import {IntroStep} from "./steps/intro/intro-step";
import {CustomerInfo} from "./steps/customer-info/customer-info-step";
import {LocationStep} from "./steps/location/location-step";
import {ItemsStep} from "./steps/items/items-step";
import {SummaryStep} from "./steps/summary/summary-step";

export class OrderForm extends RComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            customer: {
                name: "",
                phone: "",
                email: "",
                deliver_now: true
            },
            location: {
                address: "Chung cư cao cấp Ecolife Captiol, Tố Hữu, Trung Văn",
                district: "Từ Liêm",
                city: "Hà Nội"
            },
            items: [
                {
                    product: {
                        id: 1443,
                        name: "Affogato đá xay cà phê",
                        sizes: [
                            {
                                name: "s",
                                price: 59000,
                            }
                        ],
                        group: 1,
                    },
                    sizes: [{name: "s", qty: 2}]
                }
            ],
        };

    }

    render() {

        const {customer, location, items} = this.state;

        const steps = [
            {
                render: () => (
                    <IntroStep/>
                ),
            },
            {
                title: "Nhập thông tin đặt hàng",
                render: () => (
                    <CustomerInfo
                        customer={customer}
                        onChange={(customer) => this.setState({customer})}
                    />
                )
            },
            {
                title: "Chọn vị trí giao hàng",
                render: ({onGoBack}) => (
                    <LocationStep
                        location={location}
                        onChange={(location) => this.setState({location})}
                        onGoBack={onGoBack}
                    />
                )
            },
            {
                title: "Chọn món",
                render: ({onGoBack}) => (
                    <ItemsStep
                        onGoBack={onGoBack}
                        items={items}
                        onChange={(items) => this.setState({items})}
                    />
                )
            },
            {
                title: "Xem giỏ hàng",
                render: ({onGoBack, onGoStep}) => (
                    <SummaryStep
                        onGoBack={onGoBack}
                        bill={this.state}
                        onChange={(update) => this.setState(update)}
                        onGoCustomerInfo={() => onGoStep(1)}
                    />
                )
            },
        ];

        return (
            <div className="order-form">
                <FlipWizard
                    initStepIndex={4}
                    steps={steps}
                    renderFinishButtons={() => (
                        <div className="">

                        </div>
                    )}
                />
            </div>
        );
    }
}
