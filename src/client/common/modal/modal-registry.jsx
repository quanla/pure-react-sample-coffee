import classnames from "classnames";
import {RComponent} from "../r-component";
import {modalRegistry} from "./modal";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Cols} from "../../../utils/cols";

export class ModalRegistry extends RComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            modals: [],
        };

        modalRegistry.addModalHandler((modal) => this.setState({modals: this.state.modals.concat([modal])}));
    }

    render() {
        const {modals} = this.state;

        let renderModal = (modal, i) => {

            let close = () => this.setState({modals: Cols.remove1(modals, modal)});
            let elem;
            return (
                <div className="modal-overlay" key={i}
                     ref={(el) => elem = el}
                     onClick={(e) => e.target === elem && close()}
                >
                    {modal({close})}
                </div>
            );
        };
        return (
            <ReactCSSTransitionGroup
                component="div"
                className="modal-registry"
                transitionName={"up"}
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
            >
                {modals.map(renderModal)}
            </ReactCSSTransitionGroup>
        );
    }
}