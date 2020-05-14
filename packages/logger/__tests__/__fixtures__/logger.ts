import * as path from 'path';
import Logger from '../../src/logger';
import ConsoleTransport from '../../src/transports/console';
import FileBufferTransport from '../../src/transports/fileBuffer';

var logger = new Logger();
logger.set('console', new ConsoleTransport({
    level: 'NONE'
}));
logger.set('file', new FileBufferTransport({
    file: path.join(__dirname, './log/logger.test.log'),
    level: 'ALL',
    flushInterval: 1,
    maxBufferLength: 1000,
    encoding: 'utf8',
    outputJSON: false
}));

export default logger;