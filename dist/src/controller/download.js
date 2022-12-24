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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadController = void 0;
const express_1 = require("@decorators/express");
const child_process_1 = require("child_process");
const ffmpeg_static_1 = __importDefault(require("ffmpeg-static"));
const sanitize_filename_1 = __importDefault(require("sanitize-filename"));
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const lodash_1 = require("lodash");
let downloadController = class downloadController {
    constructor() { }
    getVideoList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, format, resolution } = req.query;
                const URL = `https://www.youtube.com/watch?v=${id}`;
                ytdl_core_1.default.getInfo(URL).then(({ videoDetails, formats }) => {
                    const { title } = videoDetails;
                    let streams = {};
                    // if (format === 'video') {
                    //     const resolutions = getResolutions(formats);
                    //     if (!resolutions.includes(resolution)) next(new Error('Resolution is incorrect'));
                    //     const videoFormat = chain(formats).filter(({ qualityLabel, container }) => qualityLabel === resolution && container === 'mp4').orderBy('fps', 'desc').head().value();
                    //     streams.video = ytdl(URL, { quality: videoFormat.itag });
                    //     streams.audio = ytdl(URL, { quality: 'highestaudio' });
                    // }
                    if (format === 'audio')
                        streams.audio = (0, ytdl_core_1.default)(URL, { quality: 'highestaudio' });
                    const exts = {
                        video: 'mp4',
                        audio: 'mp3'
                    };
                    const contentTypes = {
                        video: 'video/mp4',
                        audio: 'audio/mpeg'
                    };
                    const ext = exts[format];
                    const contentType = contentTypes[format];
                    const filename = `${encodeURI((0, sanitize_filename_1.default)(title))}.${ext}`;
                    res.setHeader('Content-Type', contentType);
                    res.setHeader('Content-Disposition', `attachment; filename=${filename}; filename*=utf-8''${filename}`);
                    const pipes = {
                        out: 1,
                        err: 2,
                        video: 3,
                        audio: 4
                    };
                    const ffmpegInputOptions = {
                        video: [
                            '-i', `pipe: ${pipes.video}`,
                            '-i', `pipe: ${pipes.audio}`,
                            '-map', '0:v',
                            '-map', '1:a',
                            '-c:v', 'copy',
                            '-c:a', 'libmp3lame',
                            '-crf', '27',
                            '-preset', 'veryfast',
                            '-movflags', 'frag_keyframe+empty_moov',
                            '-f', 'mp4'
                        ],
                        audio: [
                            '-i', `pipe: ${pipes.audio}`,
                            '-c:a', 'libmp3lame',
                            '-vn',
                            '-ar', '44100',
                            '-ac', '2',
                            '-b:a', '192k',
                            '-f', 'mp3'
                        ]
                    };
                    const ffmpegOptions = [
                        ...ffmpegInputOptions[format],
                        '-loglevel', 'error',
                        '-'
                    ];
                    const ff = ffmpeg_static_1.default;
                    const ffmpegProcess = (0, child_process_1.spawn)(ff, ffmpegOptions, {
                        stdio: ['pipe', 'pipe', 'pipe', 'pipe', 'pipe'],
                    });
                    const handleFFmpegStreamError = (err) => console.error("eee", err);
                    (0, lodash_1.forEach)(streams, (stream, format) => {
                        const dest = ffmpegProcess.stdio[pipes[format]];
                        stream.pipe(dest).on('error', handleFFmpegStreamError);
                    });
                    ffmpegProcess.stdio[pipes.out].pipe(res);
                    let ffmpegLogs = '';
                    ffmpegProcess.stdio[pipes.err].on('data', (chunk) => ffmpegLogs += chunk.toString());
                    ffmpegProcess.on('exit', (exitCode) => {
                        if (exitCode === 1) {
                            console.error(ffmpegLogs);
                        }
                        res.end();
                    });
                    res.on('close', () => ffmpegProcess.kill());
                }).catch(err => next(err));
            }
            catch (err) {
                res.send({ message: 'Error!, Try Again Later' });
            }
        });
    }
};
__decorate([
    (0, express_1.Get)('/youtube')
], downloadController.prototype, "getVideoList", null);
downloadController = __decorate([
    (0, express_1.Controller)('/download')
], downloadController);
exports.downloadController = downloadController;
