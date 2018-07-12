import classnames from "classnames";
import {RComponent} from "../../../../common/r-component";
import {FixedHeaderPanel} from "../common/fixed-header-panel";

export class LocationStep extends RComponent {

    render() {
        const {onGoBack, fv} = this.props;

        return (
            <FixedHeaderPanel
                className="location-step"
                title={`Địa điểm giao hàng`}
                index={{step: 2, total: 4}}
                onBack={onGoBack}
            >
                <div className="form-panel">
                    <div className="form">
                        <div className="form-group">
                            <input
                                className="form-control"
                                {...fv.bind("address")}
                            />
                        </div>
                        <div className="dual-panel">
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    {... fv.bind("district")}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    {... fv.bind("city")}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mock-map"/>
            </FixedHeaderPanel>
        );
    }
}