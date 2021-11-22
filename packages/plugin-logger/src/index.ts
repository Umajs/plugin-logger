import * as path from 'path';
import Uma, { TPlugin, IContext } from '@umajs/core';
import { UmaLogger } from '@umajs/logger';

const loggerConfig: any = Uma.pluginOptions('logger');

export default (): TPlugin => ({
    context: {
        logger: UmaLogger.instance({
            level: 'DEBUG',
            consoleLevel: 'ALL',
            allowDebugAtProd: false,
            encoding: 'utf-8',
            outputJSON: true,
            file: path.join(Uma.instance().options.ROOT, '../log/logger.log'),
            formatter(meta?: any) {
                return `[${meta.level} ${meta.pid}] ${meta.date} ${meta.hostname} ${meta.paddingMessage}: ${meta.message}`;
            },
            ...loggerConfig,
        }),
    },
    use: {
        async handler(ctx: IContext, next: Function) {
            ctx.logger.meta = {
                paddingMessage: `[${ctx.ip}/${ctx.method} ${ctx.url
                    }]`,
            };
            await next();
        },
    },
})