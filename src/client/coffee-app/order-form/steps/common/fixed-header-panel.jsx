import classnames from "classnames";
import {RComponent} from "../../../../common/r-component";

export class FixedHeaderPanel extends RComponent {

    render() {
        const {className, children, title, index, onBack} = this.props;

        return (
            <div className={classnames("fixed-header-panel", className)}>
                <div className="header">
                    <span className="title">{title}</span>

                    <span className="small">(Bước {index.step}/{index.total})</span>

                    {onBack && (
                        <i className="fa fa-angle-left"
                           onClick={onBack}
                        />
                    )}
                </div>

                <div className="content">
                    {children}
                </div>
            </div>
        );
    }
}