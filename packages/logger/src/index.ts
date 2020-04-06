import Logger from './logger';
import ConsoleTransport from './transports/console';
import FileTransport from './transports/file';
import FileBufferTransport from './transports/fileBuffer';
import LoggerUrsa from './logger/ursaLogger';
import ContextLogger from './logger/contextLogger';

const UrsaLogger = new LoggerUrsa();

export {
    Logger,
    ConsoleTransport,
    FileBufferTransport,
    FileTransport,
    UrsaLogger,
    ContextLogger,
};
