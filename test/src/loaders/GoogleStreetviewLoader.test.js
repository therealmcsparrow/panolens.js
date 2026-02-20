import test from 'ava';
import { GoogleStreetviewLoader } from '../../../src/loaders/GoogleStreetviewLoader';

test('Initialize Google Street View Loader', t => { return new Promise(resolve => {
    const init = () => {
        const loader = new GoogleStreetviewLoader();
        t.true(loader.maxW > 0);
        t.true(loader.maxH > 0);
        t.truthy(loader._panoClient);
        resolve();
    };
    const script = document.createElement( 'script' );
    script.onload = init;
}); });