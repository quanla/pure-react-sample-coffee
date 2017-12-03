import classnames from "classnames";
import {RComponent} from "../../../../common/r-component";

export class CustomerInfo extends RComponent {

    render() {
        const {onGoBack} = this.props;

        return (
            <div className="customer-info-step">
                <a onClick={onGoBack}>Back</a>
                CustomerInfo

            </div>
        );
    }
}