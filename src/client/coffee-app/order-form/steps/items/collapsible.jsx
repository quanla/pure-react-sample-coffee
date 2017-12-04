import classnames from "classnames";
import {RComponent} from "../../../../common/r-component";

export class Collapsible extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            collapsed: true,
        };
    }

    render() {
        const {title} = this.props;
        const {collapsed} = this.state;

        return (
            <div className="collapsible">
                <div className="title"
                     onClick={() => this.setState({collapsed: !collapsed})}
                >
                    {title}
                </div>

                {!collapsed && (
                    <div className="children">

                    </div>
                )}
            </div>
        );
    }
}