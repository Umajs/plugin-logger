import * as path from 'path';
import * as Assert from 'assert';
import Logger from '../logger';
import ConsoleTransport from '../transports/console';
import FileBufferTransport from '../transports/fileBuffer';
import { TUmaLoggerOption } from '../types/loggeroption.t';

let instance: UmaLogger = null;

export default class UmaLogger extends Logger {
    constructor(options?:TUmaLoggerOption) {
        super();
        this.options = options;
        options && this.init(options);
    }

    options: TUmaLoggerOption;

    init(options:TUmaLoggerOption) {
        this.options = options;
        const { file, level, encoding, outputJSON, flushInterval, maxBufferLength, allowDebugAtProd, splitTime, formatter } = this.options;
        const fileOption = { file, level, encoding, outputJSON, flushInterval, maxBufferLength, allowDebugAtProd, splitTime, formatter };

        // 文件输出配置
        if (this.options.file) {
            const fileBufferTransport = new FileBufferTransport(fileOption);

            this.set('file', fileBufferTransport);
        }

        // 终端输出配置
        const consoleTransport = new ConsoleTransport({
            level: this.options.consoleLevel,
            allowDebugAtProd: this.options.allowDebugAtProd,
            outputJSON: this.options.outputJSON,
            formatter: this.options.formatter,
        });

        this.set('console', consoleTransport);

        // ERROR级别 错误日志文件单独输出配置
        if (this.options.errorLogName) {
            Assert.ok(this.options.dir, 'When set errorLogName, the options dir must be a string path');
            const errorLogger = new FileBufferTransport({
                ...fileOption,
                file: path.join(this.options.dir, this.options.errorLogName),
            });

            this.duplicateLoggers.set('error', errorLogger);
        }

        // INFO级别 日志文件单独输出配置
        if (this.options.infoLogName) {
            Assert.ok(this.options.dir, 'When set infoLogName, the options dir must be a string path');
            const infoLogger = new FileBufferTransport({
                ...fileOption,
                file: path.join(this.options.dir, this.options.infoLogName),
            });

            this.duplicateLoggers.set('info', infoLogger);
        }

        // WARN级别 日志文件单独输出配置
        if (this.options.warnLogName) {
            Assert.ok(this.options.dir, 'When set warnLogName, the options dir must be a string path');
            const warnLogger = new FileBufferTransport({
                ...fileOption,
                file: path.join(this.options.dir, this.options.warnLogName),
            });

            this.duplicateLoggers.set('warn', warnLogger);
        }

        // 复写console系统日志输出
        if (this.options.replaceConsole) {
            this.overrideConsole();
        }
    }

    static instance(options?: TUmaLoggerOption):UmaLogger {
        if (instance) return instance;

        instance = new UmaLogger(options);

        return instance;
    }
}
