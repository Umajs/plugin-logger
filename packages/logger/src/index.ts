import Logger from './logger';
import ConsoleTransport from './transports/console';
import FileTransport from './transports/file';
import FileBufferTransport from './transports/fileBuffer';
import UrsaLogger from './logger/ursaLogger';
import ContextLogger from './logger/contextLogger';

const logger = new UrsaLogger();

export default logger;
export {
    logger,
    Logger,
    ConsoleTransport,
    FileBufferTransport,
    FileTransport,
    UrsaLogger,
    ContextLogger,
};
