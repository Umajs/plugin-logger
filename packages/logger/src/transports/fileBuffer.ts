import FileTransport from './file';
import { ITransportFileBufferOption } from '../types/transport.t';

export default class FileBufferTransport extends FileTransport {
    private buf: Array<string>;

    private timer: any;

    protected flushInterval: number;

    protected maxBufferLength: number;

    constructor({ level, allowDebugAtProd, encoding, outputJSON, file, formatter,
        flushInterval = 2000, maxBufferLength = 1000, splitTime }:ITransportFileBufferOption) {
        super({ level, allowDebugAtProd, encoding, outputJSON, file, formatter, splitTime });
        this.flushInterval = flushInterval;
        this.maxBufferLength = maxBufferLength;
        this.buf = [];
        this.timer = this.createInterval();
    }

    async write(buf:string) {
        this.buf.push(buf);
        if (this.buf.length > this.maxBufferLength) {
            this.flush();
        }
    }

    async flush() {
        if (this.buf.length > 0 && this.writable) {
            this.stream.write(this.buf.join(''), (err: any) => {
                if (err) throw err;
            });
            this.buf = [];
        }
    }

    createInterval() {
        return setInterval(() => this.flush(), this.flushInterval);
    }

    closeInterval() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    closeStream() {
        if (this.buf && this.buf.length > 0) {
            this.flush();
        }

        super.closeStream();
    }

    close() {
        this.closeInterval();
        super.close();
    }
}
