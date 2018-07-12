import cln from "classnames";
import {RComponent} from "../../common/r-component";
import {FlipWizard} from "./flip-wizard/flip-wizard";
import {IntroStep} from "./steps/intro/intro-step";
import {CustomerInfo} from "./steps/customer-info/customer-info-step";
import {LocationStep} from "./steps/location/location-step";
import {ItemsStep} from "./steps/items/items-step";
import {SummaryStep} from "./steps/summary/summary-step";
import {userInfo} from "../authen/user-info";

import {createForm, basicValidators} from 'bee-form-react';

const {required, minLength, maxLength} = basicValidators;

export class OrderForm extends RComponent {
    constructor(props, context) {
        super(props, context);

        this.form = createForm({
            "customer.name": [required, minLength(3)],
            "customer.phone": [required, minLength(10), maxLength(11)],
            "location.address": [required],
            "location.city": [required],
        }, {
            customer: {
                name: "Lê Anh Quân",
                phone: "09123123123",
                email: "",
                deliver_now: true
            },
            location: {
                address: "Chung cư cao cấp Ecolife Captiol, Tố Hữu, Trung Văn",
                district: "Từ Liêm",
                city: "Hà Nội"
            },
            items: [
                // {
                //     product: {
                //         id: 1443,
                //         name: "Affogato đá xay cà phê",
                //         sizes: [
                //             {
                //                 name: "s",
                //                 price: 59000,
                //             }
                //         ],
                //         group: 1,
                //     },
                //     sizes: [{name: "s", qty: 2}]
                // }
            ],
        });

        this.onUnmount(this.form.onChange(() => {
            this.forceUpdate();
        }));

        this.onUnmount(userInfo.onChange((user) => user && this.setState({customer: user})));
    }

    render() {
        const fv = this.form.createView();

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
                        fv={fv.scope("customer")}
                    />
                ),
                isDone: () => !fv.hasError("customer"),
            },
            {
                title: "Chọn vị trí giao hàng",
                render: ({onGoBack}) => (
                    <LocationStep
                        fv={fv.scope("location")}
                        onGoBack={onGoBack}
                    />
                )
            },
            {
                title: "Chọn món",
                render: ({onGoBack}) => (
                    <ItemsStep
                        fv={fv.scope("items")}
                        onGoBack={onGoBack}
                    />
                ),
                isDone: () => fv.getValue("items").length,
            },
            {
                title: "Xem giỏ hàng",
                render: ({onGoBack, onGoStep}) => (
                    <SummaryStep
                        fv={fv}
                        onGoItems={onGoBack}
                        onGoCustomerInfo={() => onGoStep(1)}
                        onGoLocation={() => onGoStep(2)}
                    />
                ),
            },
        ];

        return (
            <div className="order-form">
                <FlipWizard
                    initStepIndex={0}
                    steps={steps}
                    renderFinishButtons={({onGoBack}) => (
                        <div className="finish-controls">
                            <div className="repick-items"
                                 onClick={onGoBack}
                            >
                                Chọn thêm món
                            </div>
                            <div
                                className={cln("btn-finish", {disabled: fv.hasError()})}
                                onClick={() => alert(JSON.stringify(fv.getValue()))}
                            >
                                Đặt hàng
                            </div>
                        </div>
                    )}
                />
            </div>
        );
    }
}
