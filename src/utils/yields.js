
function iterEach(iter, fn) {
    for (let next; (next=iter.next()).done === false;) {
        let value = next.value;
        fn(value);
    }
}

async function iterEachAsync(iter, fn) {
    for (let next; (next=iter.next()).done === false;) {
        let value = next.value;
        await fn(value);
    }
}

function* map(iter, fn) {
    for (let next; (next=iter.next()).done === false;) {
        let value = next.value;
        yield fn(value);
    }
}

const Yields = {
    iterEach,
    iterEachAsync,
    map,
};

exports.Yields = Yields;