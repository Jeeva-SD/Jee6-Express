// YOUTUBE
export const getVideos = `select id, videoId, title, thumbnail, duration, description, tags, channelTitle, publishedAt from videos order by publishedAt desc;`;

export const getVideosWithoutDescription = `select id, videoId, title, thumbnail, duration, tags, channelTitle, publishedAt from videos order by publishedAt desc;`;

export const getTrendingIds = 'select videoId, publishedAt as updatedTime  from videos order by publishedAt desc limit 15';

export const getTrending = `select id, videoId, title, thumbnail, duration, description, tags, channelTitle, publishedAt from videos order by publishedAt desc limit 15;`;

export const getTotalVideoCount = `select count(id) as total from videos;`;