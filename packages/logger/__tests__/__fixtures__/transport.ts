import * as path from 'path';
import Transport from '../../src/transports/transport';
import FileTransport from '../../src/transports/file';


export const transport = new Transport({
    level: "INFO"
});

export const fileTransport = new FileTransport({
    level: "INFO",
    file: path.join(__dirname, './log/file.test.log'),
    encoding: 'utf8'
});