import * as Koa from 'koa';
import * as path from 'path';
import * as fs from 'fs';
import * as request from 'request';
import * as sleep from 'ko-sleep';
import contextLogger from './../../src/logger/contextLogger';
import { TConsoleMeta } from './../../src/types/console.t';
import { TUrsaLoggerOption } from './../../src/types/loggeroption.t'
import UrsaLogger from '../../src/logger/ursaLogger';

const options:TUrsaLoggerOption = {
    level: 'ALL',
    consoleLevel: 'NONE',
    file: path.join(__dirname, '../__mocks__/log/ctxLogger.test.log')
} 
const app = new Koa();
let logger = UrsaLogger.instance(options);
let ctxLogger: contextLogger;

app.use(async ctx => {
    ctxLogger = new contextLogger(ctx, logger);;
    ctxLogger.info('ctxLogger-info');
    ctxLogger.warn('ctxLogger-warn');
    ctxLogger.error('ctxLogger-error');
    ctx.body = 'Hello World';
});
app.listen(8060);
describe('test src/ctxLogger.ts', () => {
    test('the ctxLogger function formatter and paddingMessage is working', (done) => {
        let meta:TConsoleMeta = {
            level: 'INFO',
            date: '2019-08-21',
            pid: 1996,
            hostname: 'localhost',
            message: 'test meta',
            paddingMessage: '[::ffff:127.0.0.1/GET /]'
        };
        
        request('http://localhost:8060/', function(error, response, body){
            expect(ctxLogger.formatter(meta)).toBe(`[${meta.level} ${meta.pid}] ${meta.date} ${meta.hostname} ${meta.paddingMessage}: ${meta.message}`);
            expect(ctxLogger.paddingMessage).toMatch(/GET/);
            done();
        })
    });

    test('should log msg into file', function*(){
        yield sleep(1000)
        const content = fs.readFileSync(path.join(__dirname, '../__mocks__/log/ctxLogger.test.log'), 'utf8');
        expect(content).toMatch(/ctxLogger-info/);
        expect(content).toMatch(/ctxLogger-warn/);
        expect(content).toMatch(/ctxLogger-error/);
    });
    afterAll(() => {
        ctxLogger.close(); //关闭文件流
        setTimeout(() => {
            process.exit();
        }, 1000)
    })
});