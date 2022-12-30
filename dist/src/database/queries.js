"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalVideoCount = exports.getTrending = exports.getTrendingIds = exports.getVideosWithoutDescription = exports.getVideos = void 0;
// YOUTUBE
exports.getVideos = `select id, videoId, title, thumbnail, duration, description, tags, channelTitle, publishedAt from videos order by publishedAt desc;`;
exports.getVideosWithoutDescription = `select id, videoId, title, thumbnail, duration, tags, channelTitle, publishedAt from videos order by publishedAt desc;`;
exports.getTrendingIds = 'select videoId, publishedAt as updatedTime  from videos order by publishedAt desc limit 15';
exports.getTrending = `select id, videoId, title, thumbnail, duration, description, tags, channelTitle, publishedAt from videos order by publishedAt desc limit 15;`;
exports.getTotalVideoCount = `select count(id) as total from videos;`;
