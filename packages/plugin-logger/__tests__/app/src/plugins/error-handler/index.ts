import { Uma } from '@umajs/core';

export default (uma: Uma) => {
    uma.app.on('error', (e) => {
        console.error(e);
    });
};
