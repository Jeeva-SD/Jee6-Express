import { downloadController } from './../controller/download';
import { Express, Router, Request, Response, NextFunction } from "express";
import { attachControllers } from '@decorators/express';
import { YoutubeController } from '../controller/youtube'
import { PORT } from '../config';

export const combineRouters = (app: Express) => {
    const apiRouter = Router();
    attachControllers(apiRouter, [
        YoutubeController,
        downloadController
    ])

    app.use((req: Request, res: Response, next: NextFunction) => {
        if (req.url === '/')
            return res.json(`Jee6 from ${PORT}`);
        else next();
    });

    app.use('/api', apiRouter);
}