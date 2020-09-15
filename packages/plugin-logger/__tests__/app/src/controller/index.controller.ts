import { BaseController, Result, Service } from '@umajs/core';

import TestService from '../service/test.service';
import { Aspect } from '@umajs/core';

export default class Index extends BaseController {
    @Service('test')
    testService: TestService
    @Aspect("index")
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
