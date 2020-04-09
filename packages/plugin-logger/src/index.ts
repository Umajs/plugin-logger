import * as path from 'path';
import Ursa, { TPlugin, IContext } from '@ursajs/core';
import { UrsaLogger } from '@ursajs/logger';

const loggerConfig:any = Ursa.config.plugin.logger || {};

const options = Object.assign({
    level: 'DEBUG',
    consoleLevel: 'ALL',
    allowDebugAtProd: false,
    encoding: 'utf-8',
    outputJSON: true,
    file: path.join(Ursa.instance().options.ROOT, '../log/logger.log'),
    formatter(meta?:any) {
        return `[${meta.level} ${meta.pid}] ${meta.date} ${meta.hostname} ${meta.paddingMessage}: ${meta.message}`;
    },
}, loggerConfig.options);

export default <TPlugin>{
    context: {
        logger: UrsaLogger.instance(options),
    },
    use: {
        async handler(ctx: IContext, next: Function) {
            ctx.logger.meta = {
                paddingMessage: `[${
                    ctx.ip}/${
                    ctx.method} ${
                    ctx.url
                }]`,
            };
            await next();
        },
    },
};
