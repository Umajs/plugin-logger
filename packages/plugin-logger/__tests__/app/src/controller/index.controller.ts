import { Path, RequestMethod, BaseController } from '@ursajs/core';

export default class Index extends BaseController {
    @Path('/a')
    index() {
        this.ctx.logger.info('plugin-logger info');
        this.ctx.logger.warn('plugin-logger warn');
        this.ctx.logger.error('plugin-logger error');
        this.ctx.logger.close();
        this.ctx.body = '这里是首页';
    }
}
