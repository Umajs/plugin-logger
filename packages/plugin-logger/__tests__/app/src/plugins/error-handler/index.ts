import { WF } from '@ursajs/core';

export default (wf: WF) => {
    wf.app.on('error', (e) => {
        console.error(e);
    });
};
