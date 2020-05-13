import * as path from 'path';
import Uma from '@umajs/core';
export default {
    logger: {
        enable: true,
        options: {
            level: 'DEBUG', //日志输出级别
            file: path.resolve(Uma.instance().options.ROOT, '../log/ctxLogger.log'),
            allowDebugAtProd: false, // 是否允许打印debug日志
        },
    }
}