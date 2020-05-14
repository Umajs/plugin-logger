import * as path from 'path'; 
import * as fs from 'fs';
import * as request from 'supertest';
import './app/src/app.ts';

describe('test src/index.ts', () => {
    test('should log msg into file', done => {
        request('http://localhost:8059')
            .get('/')
            .expect('done', (err) => {
               const fileContent =  fs.readFileSync(path.join(__dirname, '/app/log/ctxLogger.log'), 'utf8');
               expect(fileContent).toMatch(/plugin-logger info/);
               expect(fileContent).toMatch(/plugin-logger warn/);
               expect(fileContent).toMatch(/plugin-logger error/);
               done()
            })
    })
    // afterAll(() => {
    //     setTimeout(() => {
    //         process.exit();
    //     }, 0)
    // })
});