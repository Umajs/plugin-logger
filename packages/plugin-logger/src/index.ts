import * as path from 'path';
import { TPlugin, IContext } from '@ursajs/core';
import { UrsaLogger } from '@ursajs/logger';

const options = Object.assign({
    level: 'ALL',
    consoleLevel: 'ALL',
    allowDebugAtProd: true,
    encoding: 'utf-8',
    outputJSON: true,
    file: path.join(__dirname, '../logger/logger.log'),
    formatter(meta?:any) {
        return `[${meta.level} ${meta.pid}] ${meta.date} ${meta.hostname} ${meta.paddingMessage}: ${meta.message}`;
    },
}, {});

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
