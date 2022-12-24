"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUrl = void 0;
const generateUrl = (title) => {
    var _a;
    const titleKeyWord = (_a = title === null || title === void 0 ? void 0 : title.replace(/[^a-zA-Z ]/g, " ")) === null || _a === void 0 ? void 0 : _a.split("|")[0];
    return titleKeyWord === null || titleKeyWord === void 0 ? void 0 : titleKeyWord.replace(/  +/g, " ").trim().split(" ").join("-").toLowerCase();
};
exports.generateUrl = generateUrl;
