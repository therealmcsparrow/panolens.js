import test from 'ava';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import * as THREE from 'three';
import { ImagePanorama } from '../../../src/panorama/ImagePanorama';

const localImageFolder = '../../../example/asset/textures/equirectangular';
const cabinImageURL = join( __dirname, localImageFolder, 'cabin.jpg' );
const fieldImageURL = join( __dirname, localImageFolder, 'field.jpg' );

test('Load Event', t => { return new Promise(resolve => {
    const panorama = new ImagePanorama( cabinImageURL );
    panorama.addEventListener( 'load', ()=>{
        resolve();
    } );
    panorama.load();
}); });

test('Progress Event', t => { return new Promise(resolve => {
    const panorama = new ImagePanorama( fieldImageURL );
    panorama.addEventListener( 'progress', ( event ) => {
        const { progress: { loaded, total } } = event;
        t.is(loaded, 1);
        t.is(total, 1);
        resolve();
    } );
    panorama.load();
}); });

test('Load with Empty Sources', t => {
    const panorama = new ImagePanorama();
    panorama.load();
    t.pass();
});

test('Load with HTMLImageElement Sources', t => {
    function myImageElement (){}
    myImageElement.prototype = Object.create( window.HTMLImageElement.prototype );
    myImageElement.prototype.constructor = myImageElement;
    const element = new myImageElement();
    const panorama = new ImagePanorama( element );
    panorama.load();
    t.pass();
});

test('Reset', t => {
    const panorama = new ImagePanorama( fieldImageURL );
    panorama.reset();
    t.is(panorama.children.length, 0);
});

test('Dispose', t => { return new Promise(resolve => {
    const panorama = new ImagePanorama( fieldImageURL );
    const object3D = new THREE.Object3D();
    panorama.add( object3D );
    panorama.addEventListener( 'load', () => {

        panorama.dispose();
        t.is(panorama.geometry, null);
        t.is(panorama.material, null);
        t.is(object3D.parent, null);
        resolve();

    } );
    panorama.load();
}); });