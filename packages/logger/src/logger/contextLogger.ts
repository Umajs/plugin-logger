import * as Koa from 'koa';
import UrsaLogger from './ursaLogger';
import { TConsoleMeta } from '../types/console.t';

export default class ContextLogger {
    private ctx: Koa.BaseContext;

    private logger: UrsaLogger;

    private meta: any;

    /**
     * @constructor
     * @param ctx 上下文
     * @param logger wflogger实例
     */
    constructor(ctx: Koa.BaseContext, logger:UrsaLogger) {
        this.ctx = ctx;
        this.logger = logger;
        this.meta = this.getMeta;
    }

    formatter(meta?:TConsoleMeta) {
        return `[${meta.level} ${meta.pid}] ${meta.date} ${meta.hostname} ${meta.paddingMessage}: ${meta.message}`;
    }

    get getMeta() {
        const meta:TConsoleMeta = {
            formatter: this.formatter,
            paddingMessage: this.paddingMessage,
        };

        Reflect.defineProperty(meta, 'ctx', {
            enumerable: false, // 可枚举属性设置false 不可被for ..in  Object.keys JSON.stringify访问
            value: this.ctx,
        });

        return meta;
    }

    get paddingMessage() {
        const { ctx } = this;

        return `[${
            ctx.ip}/${
            ctx.method} ${
            ctx.url
        }]`;
    }

    error(...rest:any): void {
        this.logger.log('error', rest, this.meta);
    }

    warn(...rest: any): void {
        this.logger.log('warn', rest, this.meta);
    }

    info(...rest:any): void {
        this.logger.log('info', rest, this.meta);
    }

    debug(...rest:any): void {
        this.logger.log('debug', rest, this.meta);
    }

    close() {
        this.logger.close();
    }
}
