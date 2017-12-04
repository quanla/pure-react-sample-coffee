import {Cols} from "../../../../../utils/cols";

export const renderBillItems = (onChange, items) => {
    const renderBi = (bi, i) => {

        const changeBi = (newBi) => {
            onChange(Cols.replace1(items, bi, newBi));
        };
        const removeBi = () => {
            onChange(Cols.remove1(items, bi));
        };

        const renderSize = (size) => {

            const productSize = getProductSize(size.name, bi);
            const decreaseQty = () => {
                if (size.qty > 1) {
                    changeBi({...bi, sizes: Cols.replace1(bi.sizes, size, {...size, qty: size.qty-1})});
                } else {
                    removeBi();
                }
            };
            const increaseQty = () => {
                changeBi({...bi, sizes: Cols.replace1(bi.sizes, size, {...size, qty: size.qty+1})});
            };
            return (
                <div className="size" key={size.name}>
                    <div className="name-price">
                        {{"m": "Regular", "s": "Small"}[size.name]}
                        ({productSize.price})
                    </div>
                    <div className="qty">
                        <i className="fa fa-minus-square icon-minus-order"
                           onClick={decreaseQty}
                        />

                        <div>x {size.qty}</div>

                        <i className="fa fa-plus-square icon-plus-order"
                           onClick={increaseQty}
                        />
                    </div>
                    <div className="total">
                        {size.qty * productSize.price}
                    </div>
                </div>
            );
        };

        return (
            <div className="bill-item" key={bi.product.id}>
                <div className="product-name">
                    {i + 1}. {bi.product.name}
                </div>

                <div className="sizes">
                    {bi.sizes.map(renderSize)}
                </div>
            </div>
        );
    };

    const getProductSize = (sizeName, bi) => bi.product.sizes.find((s) => s.name == sizeName);

    const calBiTotal = (bi) => bi.sizes.reduce((_, size) => _+ size.qty* getProductSize(size.name, bi).price, 0);

    const calTotal = () => items.reduce((_, bi) => _ + calBiTotal(bi), 0);

    return (
        <div className="bill-items">
            {items.map(renderBi)}

            <hr/>
            Nhập mã coupon
            <hr/>
            Thành tiền:
            {calTotal()}
        </div>
    );
};