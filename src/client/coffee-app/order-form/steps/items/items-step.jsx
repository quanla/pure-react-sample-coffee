import classnames from "classnames";
import {RComponent} from "../../../../common/r-component";
import {FixedHeaderPanel} from "../common/fixed-header-panel";

export class ItemsStep extends RComponent {

    render() {
        const {onGoBack} = this.props;

        return (
            <FixedHeaderPanel
                className="items-step"
                title={`Menu "nhà cà phê"`}
                index={{step: 3, total: 4}}
                onBack={onGoBack}
            >
                <div className="">
                    Món nổi bật
                </div>
            </FixedHeaderPanel>
        );
    }
}