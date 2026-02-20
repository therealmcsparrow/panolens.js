import test from 'ava';
import * as THREE from 'three';
import { BasicPanorama } from '../../../src/panorama/BasicPanorama';

test('Load Event', t => { return new Promise(resolve => {
    const panorama = new BasicPanorama();
    panorama.addEventListener( 'load', () => {
        t.true(panorama.material.uniforms[ 'envMap' ].value instanceof THREE.CubeTexture);
        resolve();
    } );
    panorama.load();
}); });