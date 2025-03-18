"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blackList = (datos) => {
    const data = datos[0];
    if (!data.title && !data.description && !data.category && !data.model) {
        return false;
    }
    else {
        const title = /[<>:\/;\\]/.test(data.title);
        const description = /[<>:\/;\\]/.test(data.description);
        const category = /[<>:\/;\\]/.test(data.category);
        const model = /[<>:\/;\\]/.test(data.model);
        if (title || description || category || model) {
            return true;
        }
        else {
            return false;
        }
    }
};
exports.default = blackList;
