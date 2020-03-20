import * as Koa from 'koa';
import WFLogger from './wfLogger';
import { TConsoleMeta } from '../types/console.t';
import { TWFLoggerOption } from '../types/loggeroption.t';


export default class ContextLogger extends WFLogger {
    private ctx: Koa.BaseContext;


    /**
     * @constructor
     * @param ctx 上下文
     * @param logger wflogger实例
     */
    constructor(ctx: Koa.BaseContext, options: TWFLoggerOption) {
        super(options);
        this.ctx = ctx;
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
}
