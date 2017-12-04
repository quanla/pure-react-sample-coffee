import classnames from "classnames";
import {RComponent} from "../../../../common/r-component";
import {FixedHeaderPanel} from "../common/fixed-header-panel";

export class SummaryStep extends RComponent {

    render() {
        const {onGoBack, bill, onChange, onGoCustomerInfo} = this.props;

        return (
            <FixedHeaderPanel
                className="summary-step"
                title="Đơn hàng"
                index={{step: 4, total: 4}}
                onBack={onGoBack}
            >
                <div className="bill-items">
                    {bill.items.map((bi, i) => (
                        <div className="bill-item" key={i}>
                            <div className="product-name">
                                {i+1}. {bi.product.name}
                            </div>

                            <div className="">
                                
                            </div>

                        </div>
                    ))}
                </div>

                <div className=""
                     onClick={onGoCustomerInfo}
                >
                    oifawf
                </div>
            </FixedHeaderPanel>
        );
    }
}