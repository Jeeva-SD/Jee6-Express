import { Controller, Get } from '@decorators/express';
import { Youtube } from '../core/youtube'

@Controller('/youtube')
export class YoutubeController {
    private youtube: Youtube;
    constructor() { }

    @Get('/video/list')
    public async getVideoList(req: any, res: any) {
        const data = await this.getInstance().list(req.query);
        res.send(data);
    }

    @Get('/video/trending')
    public async getTrending(req: any, res: any) {
        const data = await this.getInstance().trending();
        res.send(data);
    }

    @Get('/video/url')
    public async getUrls(req: any, res: any) {
        const data = await this.getInstance().urls();
        res.send(data);
    }

    private getInstance(): Youtube {
        if (!this.youtube) this.youtube = new Youtube();
        return this.youtube;
    }
}