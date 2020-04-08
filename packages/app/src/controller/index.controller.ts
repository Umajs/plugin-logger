import  { BaseController, Result } from '@ursajs/core';

export default class Index extends BaseController {
    index() {
        this.ctx.logger.debug('debug');
        this.ctx.logger.info('info GET');
        this.ctx.logger.warn('warn');
        this.ctx.logger.error('error');
        this.ctx.logger.error('this is plugin-logger logger error');
        return Result.json({
            msg: 'success',
            data: 'this is data',
        });
    }
}
