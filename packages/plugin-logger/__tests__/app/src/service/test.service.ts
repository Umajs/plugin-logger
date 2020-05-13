import { BaseService } from '@umajs/core';
import { UmaLogger } from '@umajs/logger';

export default class test extends BaseService {
    return1() {
        UmaLogger.instance().info('service test')
        return 1;
    }
}