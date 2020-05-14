import * as path from 'path';
import * as fs from 'fs';
import * as request from 'supertest';
import app from '../__fixtures__/app';

describe('test src/ctxLogger.ts', () => {
    test('should log msg into file', done => {
        request(app.callback())
          .get('/')
          .expect('done', (err) => {
            const content = fs.readFileSync(path.join(__dirname, '../__fixtures__/log/ctxLogger.test.log'), 'utf8');
            expect(content).toMatch(/ctxLogger-info/)
            expect(content).toMatch(/ctxLogger-warn/)
            expect(content).toMatch(/ctxLogger-error/)
            done();
          })
    })
});