import * as Koa from 'koa';
import * as path from 'path';
import { TUmaLoggerOption } from '../../src/types/loggeroption.t'
import ContextLogger from '../../src/logger/contextLogger';

const options:TUmaLoggerOption = {
  level: 'ALL',
  consoleLevel: 'NONE',
  flushInterval: 0,
  file: path.join(__dirname, './log/ctxLogger.test.log')
} 
let app = new Koa();
app.use(ctx => {
  ctx.logger = ContextLogger(ctx, options);
  ctx.logger.info('ctxLogger-info');
  ctx.logger.info('ctxLogger-warn');
  ctx.logger.info('ctxLogger-error');
  ctx.logger.close();
  ctx.body = "done";
})
app.on('error', err => console.log(err));
Object.defineProperty(app.request, 'ip', {
  value: '127.0.0.1',
});
export default app;