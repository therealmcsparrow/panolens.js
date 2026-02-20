import test from 'ava';
import * as THREE from 'three';
import { CubePanorama } from '../../../src/panorama/CubePanorama';

const path = '../../../example/asset/textures/cube/sand/';
const format = '.png';

const images = [
    `${path}px${format}`,
    `${path}ny${format}`,
    `${path}py${format}`,
    `${path}ny${format}`,
    `${path}pz${format}`,
    `${path}nz${format}`
];

test('Load Event', t => { return new Promise(resolve => {
    const panorama = new CubePanorama( images );
    panorama.addEventListener( 'load', () => {
        t.true(panorama.material.uniforms[ 'envMap' ].value instanceof THREE.CubeTexture);
        resolve();
    } );
    panorama.load();
}); });

test('Dispose', t => { return new Promise(resolve => {
    const panorama = new CubePanorama( images );
    panorama.addEventListener( 'load', () => {
        panorama.dispose();
        t.falsy(panorama.geometry);
        t.falsy(panorama.material);
        resolve();
    } );
    panorama.load();
}); });