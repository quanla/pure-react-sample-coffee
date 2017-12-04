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
        const {steps, renderFinishButtons} = this.props;
        const {currentStepIndex} = this.state;

        let nextStep = steps[currentStepIndex+1];
        let goBack = () => this.setState({currentStepIndex: currentStepIndex - 1});
        return (
            <div className="flip-wizard">
                <FlipPanel
                    className="step-panel"
                    selectedIndex={currentStepIndex}
                    cardClassName={steps[currentStepIndex].cardClassName}
                >
                    {steps[currentStepIndex].render({
                        onGoBack: goBack,
                        onGoStep: (index) => this.setState({currentStepIndex: index}),
                    })}
                </FlipPanel>

                {nextStep ? (
                    <a
                        className="btn-next"
                        onClick={() => this.setState({currentStepIndex: currentStepIndex + 1})}
                    >
                        {nextStep.title}

                        <i className="fa fa-angle-right"/>
                    </a>
                ) : (
                    renderFinishButtons({onGoBack: goBack})
                )}
            </div>
        );
    }
}