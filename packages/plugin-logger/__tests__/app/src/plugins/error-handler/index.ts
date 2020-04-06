import { Ursa } from '@ursajs/core';

export default (ursa: Ursa) => {
    ursa.app.on('error', (e) => {
        console.error(e);
    });
};
