import test from 'ava';
import { GoogleStreetviewPanorama } from '../../../src/panorama/GoogleStreetviewPanorama';

const panoId = 'JmSoPsBPhqWvaBmOqfFzgA';

test('Get Photos From Street View', t => { return new Promise(resolve => {
    const panorama = new GoogleStreetviewPanorama( panoId );
    panorama.addEventListener( 'load', () => {
        resolve();
    } );
    panorama.load();
}); });

test('Reset', t => {
    const panorama = new GoogleStreetviewPanorama( panoId );
    panorama.reset();
    t.is(panorama.children.length, 0);
    t.falsy(panorama.getGSVLoader());
});