import * as path from 'path';
import * as fs from 'fs';
import UmaLogger from '../../src/logger/umaLogger';
import { TUmaLoggerOption } from '../../src/types/loggeroption.t'
import ConsoleTransport from '../../src/transports/console';
import FileBufferTransport from '../../src/transports/fileBuffer';

describe('test src/logger/ursaLogger.ts',()=>{
    const options:TUmaLoggerOption = {
        level: 'ALL',
        consoleLevel: 'ALL',
        replaceConsole:true,
        allowDebugAtProd: true,
        encoding: 'utf-8',
        outputJSON: true,
        dir: path.join(__dirname, '../__fixtures__/log'),
        errorLogName: 'errorlogger.test.log',
        infoLogName: 'infologger.test.log',
        warnLogName: 'warnlogger.test.log',
        file: path.join(__dirname, '../__fixtures__/log/umaLogger.test.log')
    } 
    const logger = UmaLogger.instance(options);
    logger.close();
    test('should get Transports Object is exist', () => {
        expect(logger.get('file')).toBeInstanceOf(FileBufferTransport);  // 断言是否存在file类型日志转换器
        expect(logger.get('console')).toBeInstanceOf(ConsoleTransport); //console类型转换器是否存在
    });
    test('should get Transports Object in props with duplicateLoggers and log file has exists', () => {
        // expect(Logger.duplicateLoggers.get('error')).toBeInstanceOf(FileBufferTransport); duplicateLoggers私有属性不可访问，仅断言自定义日志文件是否存在
        let files = fs.readdirSync(path.join(options.dir));  // 断言日志文件是否存在 
        expect(files).toContain('errorlogger.test.log');
        expect(files).toContain('warnlogger.test.log');
        expect(files).toContain('infologger.test.log');
        expect(files).toContain('umaLogger.test.log');
    });
})