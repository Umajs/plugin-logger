import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import * as utility from 'utility';
import * as cluster from 'cluster';
import * as schedule from 'node-schedule';
import * as util from 'util';
import { isMainProcess } from '../utils';
import Transport from './transport';
import { ITransportFileOption } from '../types/transport.t';
import { TConsoleMeta } from '../types/console.t';


export default class FileTransport extends Transport {
    protected stream = null;

    protected lastWriteTime: string;

    file: string;

    encoding: string;

    splitTime: string;

    constructor({ level = 'INFO', allowDebugAtProd, encoding = 'utf8', outputJSON = true, file = null, formatter,
        splitTime = '30 1 1 * * *' }: ITransportFileOption) {
        super({ level, allowDebugAtProd, outputJSON, formatter });
        this.file = file;
        this.level = level;
        this.encoding = encoding;
        this.lastWriteTime = '';
        this.splitTime = splitTime;
        this.reload();
        this.splitLog();
    }

    reload() {
        this.closeStream();
        if (this.file) {
            this.stream = this.createStream();
        }
    }

    /**
     * file transable is writable
     * @return {Boolean} writable
     */
    get writable(): boolean {
        return this.stream && !this.stream.closed && this.stream.writable && !this.stream.destroyed;
    }

    /**
     * 日志文件切割
     */
    splitLog() {
        const self = this;

        if (isMainProcess()) {
            // 主进程创建定时任务负责文件切割
            schedule.scheduleJob(this.splitTime, async () => {
                // 主进程通知各工作进程不要执行写入
                for (const id in cluster.workers) {
                    if (cluster.workers[id]) {
                        cluster.workers[id].send({ writeable: false });
                    }
                }

                self.closeStream();

                await new Promise((resolve, reject) => {
                    const date = new Date();
                    const time = `${date.getFullYear()}-${date.getMonth() + 1}
                        -${date.getDate()}-${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;

                    fs.exists(self.file, (exist) => {
                        if (!exist) return resolve(true);
                    });
                    fs.rename(self.file, `${self.file}.${time}`, (err) => {
                        if (err) return reject(err);
                        resolve(true);
                    });
                });
                self.stream = self.createStream();

                // 主进程通知各工作进程可以执行写入
                for (const id in cluster.workers) {
                    if (cluster.workers[id]) {
                        cluster.workers[id].send({ writable: true });
                    }
                }
            });
        } else {
            process.on('message', (msg) => {
                if (msg.writable) {
                    this.reload();
                } else {
                    this.stream = null;
                }
            });
        }
    }

    createStream() {
        mkdirp.sync(path.dirname(this.file));

        const stream = fs.createWriteStream(this.file, { flags: 'a', encoding: this.encoding });

        const onError = (err: Error) => {
            console.error('%s ERROR %s [UMajs-logger] [%s] %s',
                utility.logDate(','), process.pid, this.file, err.stack);
            this.reload();
            console.warn('%s WARN %s [UMajs-logger] [%s] reloaded', utility.logDate(','), process.pid, this.file);
        };

        // only listen error once because stream will reload after error
        stream.once('error', onError);

        return stream;
    }

    closeStream() {
        if (this.stream) {
            this.stream.destroy();
            this.stream = null;
        }
    }

    async write(msg: string) {
        await util.promisify((txt: string, callback: Function) => {
            if (this.writable) {
                this.stream.write(txt, callback);
            }
        })(msg)
            .catch((error) => {
                console.log(error);
            });
    }

    log(level: string, args: any, meta?: TConsoleMeta) {
        const buf = super.baselog(level, args, meta);

        if (buf.length) {
            this.write(buf);
        }
    }

    close() {
        this.closeStream();
    }
}
