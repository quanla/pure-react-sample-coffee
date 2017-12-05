import {Cols} from "../../../utils/cols";

let handlers = [];

const modalRegistry = {
    addModalHandler: Cols.addRemove(handlers),
};

exports.modalRegistry = modalRegistry;

const modal = {
    show(aModal) {
        if (handlers.length == 0) {
            throw "No ModalRegistry exist in the system";
        }

        handlers[0](aModal);
    }
};

exports.modal = modal;