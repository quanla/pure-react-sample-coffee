import classnames from "classnames";
import {RComponent} from "../../../../common/r-component";
import {FixedHeaderPanel} from "../common/fixed-header-panel";
import {ProductApi} from "../../../../api/product-api";
import {Collapsible} from "./collapsible";

export class ItemsStep extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            groups: null,
        };

        ProductApi.getProductGroups().then((groups) => this.setState({groups}));
    }

    render() {
        const {onGoBack} = this.props;
        const {groups} = this.state;

        return (
            <FixedHeaderPanel
                className="items-step"
                title={`Menu "nhà cà phê"`}
                index={{step: 3, total: 4}}
                onBack={onGoBack}
            >
                {groups && groups.map((group) => (
                    <Collapsible
                        key={group.group}
                        title={group.title}
                    />
                ))}
            </FixedHeaderPanel>
        );
    }
}