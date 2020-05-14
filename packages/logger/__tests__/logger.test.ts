import * as path from 'path'; 
import * as fs from 'fs';
import * as sleep from 'ko-sleep';
import logger from './__fixtures__/logger';

describe('test src/logger.ts', () => {
    test('should print current msg into file', function*(){
        logger.overrideConsole();
        logger.warn('jest-warn');
        logger.error('jest-error');
        logger.info('jest-info');
        console.log('jest-replaceConsole');
        logger.close();
        yield sleep(10);
        let fileContent = fs.readFileSync(path.join(__dirname, '/__fixtures__/log/logger.test.log'), 'utf8');
        expect(fileContent).toMatch(/jest-info/);
        expect(fileContent).toMatch(/jest-warn/);
        expect(fileContent).toMatch(/jest-error/);
        expect(fileContent).toMatch(/jest-replaceConsole/);
    });
});