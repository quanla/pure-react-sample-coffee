var ColBinaryView = require("./col-binary-view.js").ColBinaryView;

let view = ColBinaryView.createColBinaryView([1,2,3]);

console.log(view.search(0));
console.log(view.search(0.5));
console.log(view.search(1)  );
console.log(view.search(1.5));
console.log(view.search(2)  );
console.log(view.search(2.5));
console.log(view.search(3)  );
console.log(view.search(3.5));
