function chain(fns) {
    fns = fns.filter((f) => f != null);

    if (fns.length == 1) {
        return fns[0];
    }
    return (a) => {
        for (let i = 0; i < fns.length; i++) {
            let fn = fns[i];
            a = fn(a);
        }
        return a;
    };
}
function sequence(fns) {
    fns = fns.filter((f) => f != null);

    if (fns.length == 1) {
        return fns[0];
    }
    return (...a) => {
        for (let i = 0; i < fns.length; i++) {
            let fn = fns[i];
            fn(...a);
        }
    };
}

function invokeChain(_, fns) {
    for (let i = 0; i < fns.length; i++) {
        let fn = fns[i];
        _ = fn(_);
    }
    return _;

}

function invoke(f, ...param) {
    if (f == null) {
        return null;
    }
    return f(...param);
}

const Fs = {
    invoke,
    noop: (ret)=> ret,
    // curry(f) {
    //     let args1 = Array.prototype.slice.call(arguments, 1);
    //     return ()=> {
    //         let args2 = arguments;
    //         return f.apply(null, Array.prototype.concat.call(args2, args1));
    //     };
    // },
    and(ands) {
        return (p1, p2, p3)=> ands.find((a)=> a != null && !a(p1, p2, p3)) == null;
    },
    chain,
    sequence,
    invokeChain,
    invokeAll(fns, a) {
        fns.forEach((fn) => fn != null && fn(a));
    },
    minVal(iterFn) {
        let min = undefined;
        iterFn((num) => {
            if (num == null) {
                return;
            }
            if (min === undefined || min > num) {
                min = num;
            }
        });
        return min;
    }
};

exports.Fs = Fs;