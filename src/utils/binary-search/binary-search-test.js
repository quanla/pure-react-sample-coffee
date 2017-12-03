var BinarySearch = require("./binary-search.js").BinarySearch;

console.log(BinarySearch.get("password", [{path: "email"}], (e) => e.path));