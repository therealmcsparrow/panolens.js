import test from 'ava';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import * as THREE from 'three';
import { LittlePlanet } from '../../../src/panorama/LittlePlanet';
import { Infospot } from '../../../src/infospot/Infospot';

const localImageFolder = '../../../example/asset/textures/equirectangular';
const cabinImageURL = join( __dirname, localImageFolder, 'cabin.jpg' );

const commonEventProperties = { preventDefault: () => {}, stopPropagation: () => {} };

const generateTouchEvent = ( eventType = 'touchstart', index = 0, { finger } ) => {
    const touches = [];
    for (let i = 0; i < finger; i++ ) {
        touches.push( Object.assign( {}, { pageX: index * 2.5 + i * 0.75 + (Math.random() - 0.5), pageY: index * 0.734 + i * 0.75 + (Math.random() - 0.5) } ) );
    }
    return { type: eventType, touches, ...commonEventProperties };
};

const generateMouseEvent = ( eventType = 'mousedown', index = 0, { button, scalarY = 1 } ) => {
    return { type: eventType, clientX: index * 2.5, clientY: index * 0.734 * scalarY, button, ...commonEventProperties };
};

const generateSequence = ( type = 'touch', options = {} ) => {

    const seq = [];
    const length = 10;
    let index = 0;

    seq.push( type === 'touch' ? generateTouchEvent( 'touchstart', index++, options ) : generateMouseEvent( 'mousedown', index++, options ) );
    for ( let i = index; i < length; i++ && index++ ) {
        seq.push( type === 'touch' ? generateTouchEvent( 'touchmove', i, options ) : generateMouseEvent( 'mousemove', i, options ) );
    }
    seq.push( type === 'touch' ? generateTouchEvent( 'touchend', index, options ) : generateMouseEvent( 'mouseup', index, options ) );

    return seq;
};

const start = ( type = 'touch', element, options = {}, onComplete = () => {} ) => {

    const seq = generateSequence( type, options );
    let index = 0;

    const fireEvent = () => {

        const frameId = window.requestAnimationFrame( fireEvent );
        const event = seq[ index++ ];

        element.dispatchEvent( event );

        if ( index >= seq.length ) {

            window.cancelAnimationFrame( frameId );
            onComplete();

        }
        
    };

    fireEvent();

};

test('Add Infospots to LittlePlanet', t => {
    const panorama = new LittlePlanet( 'image', cabinImageURL );
    const infospot1 = new Infospot();
    const infospot2 = new Infospot();
    panorama.add( infospot1, infospot2 );
    t.is(infospot1.parent, panorama);
    t.is(infospot2.parent, panorama);
});

test('Reset', t => {
    const panorama = new LittlePlanet( 'image', cabinImageURL );
    panorama.reset();
    t.true(panorama.quatCur.equals(new THREE.Quaternion(0, 0, 0, 1)));
    t.true(panorama.quatSlerp.equals(new THREE.Quaternion(0, 0, 0, 1)));
});

test('Mouse Down, Move and Up Events', t => { return new Promise(resolve => {

    const panorama = new LittlePlanet( 'image', cabinImageURL );
    const container = document.createElement( 'div' );
    panorama.dispatchEvent( { type: 'panolens-container', container } );
    t.is(panorama.container, container);
    panorama.addEventListener( 'load', () => {
        start( 'mouse', container, { button: THREE.MOUSE.LEFT }, () => resolve() );
    })
    panorama.load();

}); } );

test('Touch Start, Move and End Events', t => { return new Promise(resolve => {

    const panorama = new LittlePlanet( 'image', cabinImageURL );
    const container = document.createElement( 'div' );
    panorama.dispatchEvent( { type: 'panolens-container', container } );
    t.is(panorama.container, container);
    panorama.addEventListener( 'load', () => {
        start( 'touch', container, { finger: 2 }, () => resolve() );
    })
    panorama.load();

}); } );

test('Mouse Wheel Event', t => { return new Promise(resolve => {
    const panorama = new LittlePlanet( 'image', cabinImageURL );
    const container = document.createElement( 'div' );
    panorama.dispatchEvent( { type: 'panolens-container', container } );
    t.is(panorama.container, container);
    panorama.addEventListener( 'load', () => {
        const eventIncrease = new window.MouseWheelEvent( 1 );
        const eventDecrease = new window.MouseWheelEvent( -1 );
        container.dispatchEvent( eventIncrease );
        container.dispatchEvent( eventDecrease );
        resolve();
    })
    panorama.load();
}); });

test('ContextMenu Event', t => { return new Promise(resolve => {
    const panorama = new LittlePlanet( 'image', cabinImageURL );
    const container = document.createElement( 'div' );
    panorama.dispatchEvent( { type: 'panolens-container', container } );
    t.is(panorama.container, container);
    panorama.addEventListener( 'load', () => {
        panorama.onContextMenu();
        t.false(panorama.dragging);
        resolve();
    })
    panorama.load();
}); });

test('On Leave', t => { return new Promise(resolve => {
    const panorama = new LittlePlanet( 'image', cabinImageURL );
    const container = document.createElement( 'div' );
    panorama.dispatchEvent( { type: 'panolens-container', container } );
    t.is(panorama.container, container);
    panorama.addEventListener( 'load', () => {
        panorama.onLeave();
        resolve();
    })
    panorama.load();
}); });

test('Dispose', t => { return new Promise(resolve => {
    const panorama = new LittlePlanet( 'image', cabinImageURL );
    const container = document.createElement( 'div' );
    panorama.dispatchEvent( { type: 'panolens-container', container } );
    t.is(panorama.container, container);
    panorama.addEventListener( 'load', () => {
        panorama.dispose();
        resolve();
    })
    panorama.load();
}); });