import * as Koa from 'koa';
import * as path from 'path';
import * as fs from 'fs';
import * as request from 'request';
import * as sleep from 'ko-sleep';
import { TUrsaLoggerOption } from './../../src/types/loggeroption.t'
import ContextLogger from './../../src/logger/contextLogger';

describe('test src/ctxLogger.ts', () => {
    beforeAll(() => {
        const options:TUrsaLoggerOption = {
            level: 'ALL',
            consoleLevel: 'NONE',
            file: path.join(__dirname, '../__mocks__/log/ctxLogger.test.log')
        } 
        const app = new Koa();
        
        app.use(async ctx => {
            ctx.logger = ContextLogger(ctx, options)
            ctx.logger.info('ctxLogger-info');
            ctx.logger.warn('ctxLogger-warn');
            ctx.logger.error('ctxLogger-error');
            ctx.body = 'Hello World';
        });
        app.listen(8060);
        request('http://localhost:8060', function(error, response, body){})
    })
    test('should log msg into file', function*(){
        yield sleep(1000)
        const content = fs.readFileSync(path.join(__dirname, '../__mocks__/log/ctxLogger.test.log'), 'utf8');
        expect(content).toMatch(/ctxLogger-info/);
        expect(content).toMatch(/ctxLogger-warn/);
        expect(content).toMatch(/ctxLogger-error/);
    });
    afterAll(() => {
        setTimeout(() => {
            process.exit();
        }, 1000)
    })
});