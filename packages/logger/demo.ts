
import { Logger, ConsoleTransport, FileBufferTransport } from './src/index';
import * as Koa from 'koa';

// var logger = new Logger();
// logger.set('console', new ConsoleTransport({
//     level: 'ALL',
//     outputJSON: true,
//     allowDebugAtProd: true,
// }));
// logger.set('file', new FileBufferTransport({
//     file: './loginfo/logger.log',
//     level: 'INFO',
//     allowDebugAtProd: false,
//     flushInterval: 1000,
//     maxBufferLength: 1000,
//     encoding: 'utf8',
//     outputJSON: true
// }));

import UrsaLogger from './src/logger/ursaLogger';
var logger = new UrsaLogger({
    level: 'INFO',
    consoleLevel: 'ALL',
    allowDebugAtProd: true,
    encoding: 'utf-8',
    outputJSON: false,
    dir: './loginfo',
    errorLogName: 'errorlog.log',
    warnLogName: 'warnlog.log',
    infoLogName: 'infolog.log',
    splitTime: '30 * * * * *' //每分钟30秒触发
    // file: './loginfo/logger.log',
});

// import ContextLogger from './src/logger/contextLogger';
// var logger = new ContextLogger('ha',loggers);
// logger.log('sss');
logger.debug('debug'); // only output to stdout
logger.info('info GET ');
logger.warn('warn');
logger.error('error');
// logger.error(new Error('Test')); //err
// logger.error({data: {}, state: 0}); //result
// logger.error('data:'+['01','02']);
// logger.error(['01','02']);