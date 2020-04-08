import { BaseController, Result } from '@ursajs/core';

export default class Index extends BaseController {
    index() {
        this.ctx.logger.info('plugin-logger info');
        this.ctx.logger.warn('plugin-logger warn');
        this.ctx.logger.error('plugin-logger error');
        return Result.json({
            msg: 'success',
            data: 'this is plugin-logger app',
        });
    }
}
