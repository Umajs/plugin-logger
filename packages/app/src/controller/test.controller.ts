import  { BaseController, Result, Path } from '@ursajs/core';
import { UrsaLogger } from '@ursajs/logger';

export default class Test extends BaseController {
    @Path('/test')
    test() {
        UrsaLogger.debug('debug');
        UrsaLogger.info('info GET');
        UrsaLogger.warn('warn');
        UrsaLogger.error('error');
        return Result.json({
            msg: 'success',
            data: 'this is data 1',
        });
    }
}
