const Yields = require("../yields").Yields;

function* iterStackLeaves(node, structure) {

    let children = structure.getChildren(node);
    if (children) {
        for (let i = 0; i < children.length; i++) {
            let child = children[i];

            yield* Yields.map(
                iterStackLeaves(child, structure),
                (stack) => [node].concat(stack)
            );
        }
    } else {
        yield [node];
    }
}

function getStackIndices(stack, structure) {
    let ret = [];
    for (let i = 1; i < stack.length; i++) {
        let lastE = stack[i - 1];
        let ele = stack[i];
        ret.push(structure.getChildren(lastE).indexOf(ele));
    }
    return ret;
}

function getByIndexStack(indexStack, node, hierStructure) {
    for (let i = 0; i < indexStack.length; i++) {
        let index = indexStack[i];
        node = hierStructure.getChildren(node)[index];
    }
    return node;
}

const HierListUtil = {
    iterStackLeaves,
    getStackIndices,
    getByIndexStack,
};

exports.HierListUtil = HierListUtil;