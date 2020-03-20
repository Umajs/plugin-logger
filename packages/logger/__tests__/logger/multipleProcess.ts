// import * as Koa from 'koa';
// import * as path from 'path';
// import * as cluster from 'cluster';
// import WFLogger from './../../src/logger/wfLogger';
// import contextLogger from './../../src/logger/contextLogger';
// import { TWFLoggerOption } from './../../src/types/loggeroption.t'

// const wfoptions:TWFLoggerOption = {
//     level: 'ALL',
//     consoleLevel: 'NONE',
//     file: path.join(__dirname, '../__mocks__/log/multiplog.test.log'),
//     splitTime: '30 * * * * *' //每分钟30秒触发
// } 
// const logger = new WFLogger(wfoptions);
// const app = new Koa();
// let ctxLogger : contextLogger;

// app.use(async ctx => {
//     ctxLogger = new contextLogger(ctx, logger);
//     ctxLogger.info('ctxLogger');
//     ctxLogger.warn('ctxLogger');
//     ctxLogger.error('ctxLogger');
//     ctx.body = 'Hello World';
// });

// if(cluster.isMaster){
//     for(var i = 0; i < 4; i++){
//       cluster.fork();
//     }
//     cluster.on('listening', (worker,address) => {
//       console.log('listening: worker'+worker.id+'工作线程 ' + worker.process.pid +', Address: '+address.address+":"+address.port);
//     });
//     cluster.on('exit', (worker, code, signal) => {
//       console.log('worker'+worker.id+'工作线程 ' + worker.process.pid + ' died');
//     });
//   }else{
//     app.listen(8060);
//     console.log(`>>>>>>>>工作进程 ${process.pid} 已启动`);
// }