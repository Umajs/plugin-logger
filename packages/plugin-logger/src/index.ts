// 自定义插件
import * as Koa from 'koa';
import { Ursa } from '@ursajs/core';
import { ContextLogger } from '@ursajs/logger';
import * as path from 'path';
import { TUrsaLoggerOption } from './type/loggeroption.t';

export default (ursa: Ursa, options: TUrsaLoggerOption, context?: Koa.BaseContext) => {
    const logger = new ContextLogger(context, {
        level: 'ALL',
        consoleLevel: 'ALL',
        allowDebugAtProd: true,
        encoding: 'utf-8',
        outputJSON: true,
        file: path.join(ursa.options.ROOT, '../logger/logger.log'), // 日志默认和src同级
        ...options,
    });

    ursa.app.use((ctx: any, next) => {
        logger.updateCtx(ctx);
        ctx.logger = logger;

        return next();
    });
};
