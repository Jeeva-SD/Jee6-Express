"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineRouters = void 0;
const download_1 = require("./../controller/download");
const express_1 = require("express");
const express_2 = require("@decorators/express");
const youtube_1 = require("../controller/youtube");
const config_1 = require("../config");
const combineRouters = (app) => {
    const apiRouter = (0, express_1.Router)();
    (0, express_2.attachControllers)(apiRouter, [
        youtube_1.YoutubeController,
        download_1.downloadController
    ]);
    app.use((req, res, next) => {
        if (req.url === '/')
            return res.json(`Jee6 from ${config_1.PORT}`);
        else
            next();
    });
    app.use('/api', apiRouter);
};
exports.combineRouters = combineRouters;
