const ProductApi = {
    getProducts() {
        return Promise.resolve([
            {

            },
        ]);
    },
    getProductGroups() {
        return Promise.resolve([
            {
                title: "Món nổi bật",
                group: 1,
            },
            {
                title: "Cà Phê",
                group: 2,
            },
            {
                title: "Sô Cô La",
                group: 3,
            },
            {
                title: "Thức Uống Trái Cây",
                group: 4,
            },
            {
                title: "Trà Đặc Biệt",
                group: 5,
            },
        ]);
    }
};

exports.ProductApi = ProductApi;