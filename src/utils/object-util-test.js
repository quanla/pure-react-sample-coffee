const {ObjectUtil} = require("./object-util");

let data = {
    a: "aaa",
    b: ["bb"],
    c: [{c1: "c1"}],
};

console.log(ObjectUtil.get("a", data));
console.log(ObjectUtil.get("b[0]", data));
console.log(ObjectUtil.get("c[0].c1", data));

data = ObjectUtil.updatePath(data, "c[0].c1", "c2");
console.log(ObjectUtil.get("c[0].c1", data));
