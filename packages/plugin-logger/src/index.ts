// 自定义插件
import { Ursa } from '@ursajs/core';
import { ContextLogger } from '@ursajs/logger';
import * as path from 'path';
import { TWFLoggerOption } from './type/loggeroption.t';

export default (wf: Ursa, options: TWFLoggerOption) => {
    const loggerOption = {
        level: 'ALL',
        consoleLevel: 'ALL',
        allowDebugAtProd: true,
        encoding: 'utf-8',
        outputJSON: true,
        // dir: path.join(wf.options.ROOT, 'logger'),
        // errorLogName: 'errorlogger.log',
        // infoLogName: 'infologger.log',
        // warnLogName: 'warnlogger.log',
        file: path.join(wf.options.ROOT, '../logger/logger.log'), // 日志默认和src同级
        ...options,
    };

    wf.app.use((ctx: any, next) => {
        ctx.logger = new ContextLogger(ctx, loggerOption);

        return next();
    });
};
