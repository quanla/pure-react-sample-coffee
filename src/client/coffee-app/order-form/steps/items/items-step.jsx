import classnames from "classnames";
import {RComponent} from "../../../../common/r-component";
import {FixedHeaderPanel} from "../common/fixed-header-panel";
import {ProductApi} from "../../../../api/product-api";
import {Collapsible} from "./collapsible";
import {Cols} from "../../../../../utils/cols";

export class ItemsStep extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            groups: null,
            products: null,
        };

        ProductApi.getProductGroups().then((groups) => this.setState({groups}));
        ProductApi.getProducts().then((products) => this.setState({products}));
    }

    addProduct(product, sizeName) {
        const {items, onChange} = this.props;

        let bi = items.find((bi) => bi.product.id == product.id);
        let newItems;
        if (bi) {
            const size = bi.sizes.find(size => size.name == sizeName);
            newItems = Cols.replace1(items, bi, {...bi,
                sizes: size ?
                    Cols.replace1(bi.sizes, size, {name: sizeName, qty: size.qty + 1}) :
                    bi.sizes.concat([{name: sizeName, qty: 1}])
            });
        } else {
            newItems = items.concat([{
                product,
                sizes: [{name: sizeName, qty: 1}],
            }]);
        }
        onChange(newItems);
    }

    getQty(product, sizeName) {
        const {items} = this.props;

        let bi = items.find((bi) => bi.product.id == product.id);

        return bi == null ? 0 : bi.sizes.reduce((total, size) => total + (size.name == sizeName ? size.qty : 0), 0);
    }

    getGroupQty(group) {
        const {items} = this.props;
        return items.reduce((total, bi) => total + (
            bi.product.group == group ?
                bi.sizes.reduce((total, size) => total + size.qty, 0)
                : 0
        ), 0);
    }

    render() {
        const {onGoBack} = this.props;
        const {groups, products} = this.state;


        const renderGroup = (group) => {

            let groupQty = this.getGroupQty(group.group);

            return (
                <Collapsible
                    key={group.group}
                    title={
                        <div className="group-title">
                            {group.title}

                            {groupQty > 0 && (
                                <div className="qty">
                                    {groupQty}
                                </div>
                            )}
                        </div>
                    }
                    renderChildren={() => products && (
                        <div className="products">
                            {products.filter((product) => product.group == group.group).map((product) => renderProduct(product, {
                                onAddProduct: (product, sizeName) => this.addProduct(product, sizeName),
                                getSizeQty: (product, sizeName) => this.getQty(product, sizeName)
                            }))}
                        </div>
                    )}
                />
            );
        };

        return (
            <FixedHeaderPanel
                className="items-step"
                title={`Menu "nhà cà phê"`}
                index={{step: 3, total: 4}}
                onBack={onGoBack}
            >
                {groups && groups.map(renderGroup)}
            </FixedHeaderPanel>
        );
    }
}


const renderProduct = (product, {onAddProduct, getSizeQty}) => {
    let renderSize = (size) => {

        let sizeQty = getSizeQty(product, size.name);
        return (
            <div
                className={classnames("size", `size-${size.name}`, {active: sizeQty})}
                key={size.name}
                onClick={() => onAddProduct(product, size.name)}
            >
                <div className="icon">
                    <img src={`assets/img/cup/coffe-cup-${size.name}${!sizeQty ? "-a" : ""}.png`}/>

                    {!!sizeQty && (
                        <div className="qty">
                            {sizeQty}
                        </div>
                    )}
                </div>
                <div className="price">
                    {size.price / 1000}k
                </div>
            </div>
        );
    };

    return (
        <div className="product"
             key={product.id}
        >
            <div className="show-off"
                 style={{backgroundImage: `url(https://api.tch.vn/images/products/${product.id}.jpg)`}}
            >
                <div className="name">
                    {product.name}
                </div>
            </div>
            <div className={classnames("selector", `selector-${product.sizes.length}`)}>
                {product.sizes.map(renderSize)}
            </div>
        </div>
    );
};
