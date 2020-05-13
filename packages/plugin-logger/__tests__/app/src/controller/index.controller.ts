import { BaseController, Result, Service } from '@umajs/core';
import { UmaLogger } from '@umajs/logger';
import TestService from '../service/test.service';

export default class Index extends BaseController {
    @Service('test')
    testService: TestService

    index() {
        UmaLogger.instance().info('service ' + this.testService.return1())
        this.ctx.logger.info('plugin-logger info');
        this.ctx.logger.warn('plugin-logger warn');
        this.ctx.logger.error('plugin-logger error');
        return Result.json({
            msg: 'success',
            data: 'this is plugin-logger app',
        });
    }
}
