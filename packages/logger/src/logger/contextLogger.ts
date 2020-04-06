import * as Koa from 'koa';
import UrsaLogger from './ursaLogger';
import { TConsoleMeta } from '../types/console.t';
import { TUrsaLoggerOption } from '../types/loggeroption.t';

export default class ContextLogger extends UrsaLogger {
    private ctx: Koa.BaseContext;

    /**
     * @constructor
     * @param ctx 上下文
     * @param logger wflogger实例
     */
    constructor(ctx: Koa.BaseContext, option?:TUrsaLoggerOption) {
        super(option);
        this.ctx = ctx;
    }

    formatter(meta?:TConsoleMeta) {
        return `[${meta.level} ${meta.pid}] ${meta.date} ${meta.hostname} ${meta.paddingMessage}: ${meta.message}`;
    }

    get meta() {
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

    updateCtx(ctx: Koa.BaseContext): void {
        this.ctx = ctx;
    }
}
