import * as path from 'path'; 
import * as fs from 'fs';
import * as request from 'request';
import './app/src/app.ts';

request('http://localhost:8059', function(error, response, body){
    process.exit();
})
describe('test src/index.ts', () => {
    let fileContent: string;
    beforeAll(() => {
        fileContent =  fs.readFileSync(path.join(__dirname, '/app/log/ctxLogger.log'), 'utf8');
    })
    it('should print "plugin-logger info" msg into file', async () => {
        expect(fileContent).toMatch(/plugin-logger info/);
    });
    it('should print "plugin-logger warn" msg into file', async () => {
        expect(fileContent).toMatch(/plugin-logger warn/);
    });
    it('should print "plugin-logger error" msg into file', async () => {
        expect(fileContent).toMatch(/plugin-logger error/);
    });
});