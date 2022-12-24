"use strict";
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
exports.Youtube = void 0;
const database_1 = require("../database");
const helper_1 = require("../helper");
const index_1 = require("./../lib/result/index");
class Youtube {
    constructor() {
        this.db = new database_1.DB;
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const key = 'videoId';
                const result = yield this.db.execute(database_1.getVideos);
                return (0, index_1.dataFound)([...new Map(result === null || result === void 0 ? void 0 : result.map((item) => [item[key], item])).values()]);
            }
            catch (ex) {
                return (0, index_1.dataNotFound)([]);
            }
        });
    }
    trending() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trendingIds = yield this.db.execute(database_1.getTrendingIds);
                const ids = trendingIds === null || trendingIds === void 0 ? void 0 : trendingIds.map((e) => e.videoId);
                let trendingVideos = yield this.db.execute(database_1.getTrending, [ids]);
                trendingVideos = trendingVideos.sort((a, b) => new Date(b.publishedAt).valueOf() - new Date(a.publishedAt).valueOf());
                const lastUpdatedTime = (trendingVideos === null || trendingVideos === void 0 ? void 0 : trendingVideos.length) > 0 ? (_a = trendingVideos[0]) === null || _a === void 0 ? void 0 : _a.videoId : null;
                return (0, index_1.dataFound)({ lastUpdatedTime, trendingVideos });
            }
            catch (ex) {
                return (0, index_1.dataNotFound)([]);
            }
        });
    }
    urls() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const key = 'videoId';
                const result = yield this.db.execute(database_1.getVideos);
                const videos = [...new Map(result === null || result === void 0 ? void 0 : result.map((item) => [item[key], item])).values()];
                const urls = videos.map((video) => (0, helper_1.generateUrl)(video === null || video === void 0 ? void 0 : video.title));
                return urls;
            }
            catch (ex) {
                return (0, index_1.dataNotFound)([]);
            }
        });
    }
}
exports.Youtube = Youtube;
