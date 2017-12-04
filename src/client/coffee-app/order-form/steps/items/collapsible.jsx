import classnames from "classnames";
import {RComponent} from "../../../../common/r-component";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export class Collapsible extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            collapsed: true,
        };
    }

    render() {
        const {title, renderChildren} = this.props;
        const {collapsed} = this.state;

        return (
            <div className="collapsible">
                <div className="title"
                     onClick={() => this.setState({collapsed: !collapsed})}
                >
                    {title}
                </div>

                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="collapse"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {!collapsed && (
                        <div className="children">
                            {renderChildren()}
                        </div>
                    )}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}