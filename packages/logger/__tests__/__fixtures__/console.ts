import ConsoleTransport from '../../src/transports/console';

const transport = new ConsoleTransport({
    level: "ALL"
});
transport.log('info', ['console transport info test']);
transport.log('error', ['console transport error test']);
transport.close();