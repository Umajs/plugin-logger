import * as path from 'path';
import Ursa from '@ursajs/core';
export default {
    logger: {
        enable: true,
        options: {
            level: 'DEBUG', //日志输出级别
            file: path.resolve(Ursa.instance().options.ROOT, '../log/ctxLogger.log'),
            allowDebugAtProd: false, // 是否允许打印debug日志
        },
    }
}