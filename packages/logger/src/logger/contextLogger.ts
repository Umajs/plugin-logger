import * as Koa from 'koa';
import * as path from 'path';
import UmaLogger from './umaLogger';
import { TUmaLoggerOption } from '../types/loggeroption.t';

export default function (ctx: Koa.BaseContext, options?:TUmaLoggerOption) {
    const ctxLogger = UmaLogger.instance({
        level: 'DEBUG',
        consoleLevel: 'ALL',
        allowDebugAtProd: false,
        encoding: 'utf-8',
        outputJSON: true,
        file: path.join(__dirname, '../log/logger.log'),
        formatter(meta?:any) {
            return `[${meta.level} ${meta.pid}] ${meta.date} ${meta.hostname} ${meta.paddingMessage}: ${meta.message}`;
        },
        ...options });

    ctxLogger.meta = {
        paddingMessage: `[${
            ctx.ip}/${
            ctx.method} ${
            ctx.url
        }]`,
    };

    return ctxLogger;
}
