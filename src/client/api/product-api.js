const ProductApi = {
    getProducts() {
        return Promise.resolve([
            {
                id: 1443,
                name: "Affogato đá xay cà phê",
                sizes: [
                    {
                        name: "s",
                        price: 59000,
                    }
                ],
                group: 1,
            },
            {
                id: 1444,
                name: "Affogato đá xay cà phê",
                sizes: [
                    {
                        name: "s",
                        price: 59000,
                    }
                ],
                group: 1,
            },
            {
                id: 1421,
                name: "Matcha macchiato",
                sizes: [
                    {
                        name: "s",
                        price: 45000,
                    },
                    {
                        name: "m",
                        price: 52000,
                    }
                ],
                group: 1,
            },
        ]);
    },
    getProductGroups() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
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
            }, 1000);
        });
    }
};

exports.ProductApi = ProductApi;