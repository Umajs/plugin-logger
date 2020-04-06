// 自定义插件
import { Ursa } from '@ursajs/core';
import { UrsaLogger, ContextLogger } from '@ursajs/logger';
import * as path from 'path';
import { TUrsaLoggerOption } from './type/loggeroption.t';

export default (ursa: Ursa, options: TUrsaLoggerOption) => {
    const logger = new UrsaLogger({
        level: 'ALL',
        consoleLevel: 'ALL',
        allowDebugAtProd: true,
        encoding: 'utf-8',
        outputJSON: true,
        // dir: path.join(ursa.options.ROOT, 'logger'),
        // errorLogName: 'errorlogger.log',
        // infoLogName: 'infologger.log',
        // warnLogName: 'warnlogger.log',
        file: path.join(ursa.options.ROOT, '../logger/logger.log'), // 日志默认和src同级
        ...options,
    });
    // const loggerOption = {
    //     level: 'ALL',
    //     consoleLevel: 'ALL',
    //     allowDebugAtProd: true,
    //     encoding: 'utf-8',
    //     outputJSON: true,
    //     // dir: path.join(ursa.options.ROOT, 'logger'),
    //     // errorLogName: 'errorlogger.log',
    //     // infoLogName: 'infologger.log',
    //     // warnLogName: 'warnlogger.log',
    //     file: path.join(ursa.options.ROOT, '../logger/logger.log'), // 日志默认和src同级
    //     ...options,
    // };

    ursa.app.use((ctx: any, next) => {
        ctx.logger = new ContextLogger(ctx, logger);
        return next();
    });
};
