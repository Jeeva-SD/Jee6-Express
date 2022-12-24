import { DB, getVideos, getTrending, getTrendingIds, getTotalVideoCount } from '../database';
import { generateUrl } from '../helper';
import { dataFound, dataNotFound } from './../lib/result/index';

export class Youtube {
    private db;
    constructor() {
        this.db = new DB
    }

    public async list() {
        try {
            const key = 'videoId';
            const result: any = await this.db.execute(getVideos);

            return dataFound([...new Map(result?.map((item: any) => [item[key], item])).values()]);
        } catch (ex) {
            return dataNotFound([]);
        }
    }

    public async trending() {
        try {
            const trendingIds: any = await this.db.execute(getTrendingIds);
            const ids = trendingIds?.map((e: any) => e.videoId);
            let trendingVideos: any = await this.db.execute(getTrending, [ids]);
            trendingVideos = trendingVideos.sort((a: any, b: any) => new Date(b.publishedAt).valueOf() - new Date(a.publishedAt).valueOf());
            const lastUpdatedTime = trendingVideos?.length > 0 ? trendingVideos[0]?.videoId : null;

            return dataFound({ lastUpdatedTime, trendingVideos });
        } catch (ex) {
            return dataNotFound([]);
        }
    }

    public async urls() {
        try {
            const key = 'videoId';
            const result: any = await this.db.execute(getVideos);
            const videos = [...new Map(result?.map((item: any) => [item[key], item])).values()];
            const urls = videos.map((video: any) => generateUrl(video?.title));

            return urls;
        } catch (ex) {
            return dataNotFound([]);
        }
    }
} 