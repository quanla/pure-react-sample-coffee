import {Cols} from "../../../utils/cols";

let changeListeners = [];
let user = null;

const userInfo = {
    getUser: () => user,
    setUser: (user1) => {
        user = user1;
        changeListeners.forEach((l) => l(user));
    },
    onChange: Cols.addRemove(changeListeners),
};

exports.userInfo = userInfo;