import { BaseService } from '@ursajs/core';
import { UrsaLogger } from '@ursajs/logger';

export default class test extends BaseService {
    return1() {
        UrsaLogger.instance().info('service test')
        return 1;
    }
}