import  { BaseController, Result, Path } from '@ursajs/core';

export default class Test extends BaseController {
    @Path('/test')
    test() {
        this.ctx.logger.error('error');
        return Result.json({
            msg: 'success',
            data: 'this is data 1',
        });
    }
}
