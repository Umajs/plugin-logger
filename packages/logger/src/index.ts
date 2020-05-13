import Logger from './logger';
import ConsoleTransport from './transports/console';
import FileTransport from './transports/file';
import FileBufferTransport from './transports/fileBuffer';
import UmaLogger from './logger/umaLogger';
import ContextLogger from './logger/contextLogger';

const logger = new UmaLogger();

export default logger;
export {
    logger,
    Logger,
    ConsoleTransport,
    FileBufferTransport,
    FileTransport,
    UmaLogger,
    ContextLogger,
};
