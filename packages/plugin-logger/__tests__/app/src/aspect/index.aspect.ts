import Uma,{ IAspect, IJoinPoint } from '@umajs/core';
import { UmaLogger } from '@umajs/logger';
import * as path from 'path';
export default class Index implements IAspect {
    before(point: IJoinPoint) {
        UmaLogger.instance({
            level:'ALL',
            consoleLevel:"ALL",
            file: path.resolve(Uma.instance().options.ROOT,"../logs/common.log")
        }).info('from aspect!')
        console.log('index: this is before:', point.target);
    }
}
