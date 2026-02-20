import test from 'ava';
import { CameraPanorama } from '../../../src/panorama/CameraPanorama';

test('Load Event', t => { return new Promise(resolve => {
    const panorama = new CameraPanorama();
    panorama.addEventListener( 'load', () => {
        resolve();
    } );
    panorama.load();
}); });