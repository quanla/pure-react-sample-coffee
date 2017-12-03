import classnames from "classnames";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {RComponent} from "../../../common/r-component";

export class FlipPanel extends RComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            direction: null,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedIndex != this.props.selectedIndex) {
            this.setState({direction: nextProps.selectedIndex > this.props.selectedIndex ? "up" : "down"});
        }
    }

    render() {
        const {className, children, selectedIndex} = this.props;
        const {direction} = this.state;

        return (
            <ReactCSSTransitionGroup
                component="div"
                className={classnames("flip-panel", className)}
                transitionName={direction == null ? "no-slide" : direction=="up" ? "slide-up" : "slide-down"}
                transitionEnterTimeout={30000}
                transitionLeaveTimeout={30000}
            >
                <div
                    className="flip-card"
                    key={selectedIndex}
                >
                    {children}
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}