import test from 'ava';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import { ImageLittlePlanet } from '../../../src/panorama/ImageLittlePlanet';

const localImageFolder = '../../../example/asset/textures/equirectangular';
const cabinImageURL = join( __dirname, localImageFolder, 'cabin.jpg' );
const container = document.createElement( 'div' );

test('Load Event', t => { return new Promise(resolve => {
    const panorama = new ImageLittlePlanet( cabinImageURL );
    panorama.setContainer( container );
    panorama.addEventListener( 'load', ()=>{
        resolve();
    } );
    panorama.load();
}); });

test('Dispose', t => { return new Promise(resolve => {
    const panorama = new ImageLittlePlanet( cabinImageURL );
    panorama.setContainer( container );
    panorama.addEventListener( 'load', ()=>{
        panorama.dispose();
        t.falsy(panorama.geometry);
        t.falsy(panorama.material);
        t.falsy(panorama.parent);
        resolve();
    } );
    panorama.load();
}); });