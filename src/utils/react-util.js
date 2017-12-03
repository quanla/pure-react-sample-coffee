function excludeUndefinedProps(props) {
    let ret = {};
    for (var k in props) {
        if (props.hasOwnProperty(k) && props[k] !== undefined) {
            ret[k] = props[k];
        }
    }
    return ret;
}
function recursiveMap(compList, fn) {
    if (compList == null) {
        return compList;
    }

    let changed = false;
    let ret = React.Children.map(compList, (comp) => {
        if (comp == null || comp.props == null) {
            return comp;
        } else {
            let action = fn(comp);

            let defaultChildren = function () {
                let newChildren = recursiveMap(comp.props.children, fn);
                if (newChildren !== comp.props.children) {
                    comp = React.cloneElement(comp, {children: newChildren});
                    // excludeUndefinedAttrs(comp.props);
                    changed = true;
                }
            };
            if (action) {
                if (action.deleteNode) {
                    comp = null;
                    changed = true;
                }
                if (action.updateProps) {
                    let newProps = excludeUndefinedProps(Object.assign({ref: comp.ref}, comp.props, action.updateProps));
                    comp = React.createElement(comp.type, newProps);
                    changed = true;
                }

                if (action.children) {
                    comp = React.cloneElement(comp, {children: action.children});
                    changed = true;
                } else if (comp && comp.props.children) {
                    defaultChildren();
                }

                if (action.wrappedBy) {
                    comp = React.createElement(action.wrappedBy.type, action.wrappedBy.props, comp);
                    changed = true;
                }

            } else {
                if (comp.props.children) {
                    defaultChildren();
                }
            }
            return comp;
        }
    });
    return !changed ? compList : ret.length == 1 ? ret[0] : ret;
}

const ReactUtil = {
    recursiveMap,

    getClientRect(comp) {
        if (!comp.mounted) {
            return null;
        }
        let dom = ReactDOM.findDOMNode(comp);
        if (dom == null) {
            return null;
        }
        let $dom = $(dom);
        let offset = $dom.offset();
        let $window = $(window);
        let top = offset.top - $window.scrollTop();
        let left = offset.left - $window.scrollLeft();
        let width = $dom.width();
        let height = $dom.height();
        return {
            top,
            left,
            width,
            height,
        };
    }
};

exports.ReactUtil = ReactUtil;