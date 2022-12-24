"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeController = void 0;
const express_1 = require("@decorators/express");
const youtube_1 = require("../core/youtube");
let YoutubeController = class YoutubeController {
    constructor() { }
    getVideoList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getInstance().list();
            res.send(data);
        });
    }
    getTrending(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getInstance().trending();
            res.send(data);
        });
    }
    getUrls(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getInstance().urls();
            res.send(data);
        });
    }
    getInstance() {
        if (!this.youtube)
            this.youtube = new youtube_1.Youtube();
        return this.youtube;
    }
};
__decorate([
    (0, express_1.Get)('/video/list')
], YoutubeController.prototype, "getVideoList", null);
__decorate([
    (0, express_1.Get)('/video/trending')
], YoutubeController.prototype, "getTrending", null);
__decorate([
    (0, express_1.Get)('/video/url')
], YoutubeController.prototype, "getUrls", null);
YoutubeController = __decorate([
    (0, express_1.Controller)('/youtube')
], YoutubeController);
exports.YoutubeController = YoutubeController;
