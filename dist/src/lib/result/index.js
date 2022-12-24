"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataNotFound = exports.dataFound = void 0;
const createResult = (code, data) => {
    const result = {
        code,
        data: data ? data : null
    };
    return result;
};
const dataFound = (data) => {
    return createResult(1000, data);
};
exports.dataFound = dataFound;
const dataNotFound = (data = []) => {
    return createResult(1001, data);
};
exports.dataNotFound = dataNotFound;
