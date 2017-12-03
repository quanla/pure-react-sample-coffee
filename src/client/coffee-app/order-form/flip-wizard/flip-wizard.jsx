import classnames from "classnames";
import {RComponent} from "../../../common/r-component";
import {FlipPanel} from "./flip-panel";

export class FlipWizard extends RComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            currentStepIndex: props.initStepIndex || 0
        };
    }


    render() {
        const {steps} = this.props;
        const {currentStepIndex} = this.state;

        let nextStep = steps[currentStepIndex+1];
        return (
            <div className="flip-wizard">
                <FlipPanel
                    className="step-panel"
                    selectedIndex={currentStepIndex}
                >
                    {steps[currentStepIndex].render({
                        onGoBack: () => this.setState({currentStepIndex: currentStepIndex - 1})
                    })}
                </FlipPanel>

                {nextStep && (
                    <a
                        className="btn-next"
                        onClick={() => this.setState({currentStepIndex: currentStepIndex + 1})}
                    >
                        {nextStep.title}

                        <i className="fa fa-angle-right"/>
                    </a>
                )}
            </div>
        );
    }
}