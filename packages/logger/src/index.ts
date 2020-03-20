// import Logger from './logger';
import ConsoleTransport from './transports/console';
import FileTransport from './transports/file';
import FileBufferTransport from './transports/fileBuffer';
import WFLogger from './logger/wfLogger';
import ContextLogger from './logger/contextLogger';

const Logger = new WFLogger();
const UrsaLogger = WFLogger;

export default Logger;
export {
    Logger,
    ConsoleTransport,
    FileBufferTransport,
    FileTransport,
    UrsaLogger,
    ContextLogger,
};
