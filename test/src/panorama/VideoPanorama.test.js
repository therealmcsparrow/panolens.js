import test from 'ava';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import { VideoPanorama } from '../../../src/panorama/VideoPanorama';

const localImageFolder = '../../../example/asset/textures/video';
const videoURL = join( __dirname, localImageFolder, '1941-battle-low.mp4' );

test('Load Event', t => { return new Promise(resolve => {
    const panorama = new VideoPanorama( videoURL );
    panorama.addEventListener( 'load', () => resolve() );
    panorama.load();
}); });

test('Video Play and Pause', t => { return new Promise(resolve => {
    const panorama = new VideoPanorama( videoURL );
    panorama.addEventListener( 'load', () => {
        const element = panorama.getVideoElement();
        const percentage = 0.5;
        t.true(panorama.isVideoPaused());
        panorama.setVideoCurrentTime( { percentage } );
        t.is(element.currentTime, element.duration * percentage);
        panorama.resumeVideoProgress();
        t.true(panorama.isVideoPaused());
        panorama.playVideo();
        t.false(panorama.isVideoPaused());
        panorama.pauseVideo();
        t.true(panorama.isVideoPaused());
        panorama.toggleVideo();
        t.false(panorama.isVideoPaused());
        panorama.resetVideo();
        t.is(element.currentTime, 0);
        resolve();
    } );
    panorama.load();
}); });

test('Video AutoPlay', t => { return new Promise(resolve => {
    const panorama = new VideoPanorama( videoURL, { autoplay: true } );
    panorama.addEventListener( 'load', () => {
        const percentage = 0.7;
        panorama.setVideoCurrentTime( { percentage } );
        panorama.resumeVideoProgress();
        t.false(panorama.isVideoPaused());
        resolve();
    } );
    panorama.load();
}); });

test('Video Mute and Unmute', t => { return new Promise(resolve => {
    const panorama = new VideoPanorama( videoURL );
    panorama.addEventListener( 'load', () => {
        t.true(panorama.isVideoMuted());
        panorama.unmuteVideo();
        t.false(panorama.isVideoMuted());
        panorama.muteVideo();
        t.true(panorama.isVideoMuted());
        resolve();
    } );
    panorama.load();
}); });

test('Preloaded Video', t => { return new Promise(resolve => {
    const videoElement = document.createElement( 'video' );
    videoElement.readyState = 3;
    const panorama = new VideoPanorama( videoURL, { videoElement } );
    panorama.addEventListener( 'load', () => resolve() );
    panorama.load();
}); });

test('Load Video on Mobile Browser with autoplay and muted', t => {
    const videoElement = document.createElement( 'video' );
    videoElement.readyState = 4;
    global.userAgent = global.mobileUserAgent;
    const panorama = new VideoPanorama( videoURL, { videoElement, autoplay: true, muted: true } );
    t.true(panorama.isMobile());
    panorama.load();
    global.userAgent = global.desktopUserAgent;
});

test('Load Video on Mobile Browser without autoplay or muted', t => {
    const videoElement = document.createElement( 'video' );
    videoElement.src = 'panolensvideo';
    videoElement.readyState = 4;
    global.userAgent = global.mobileUserAgent;
    const panorama = new VideoPanorama( videoURL, { videoElement, autoplay: false, muted: false } );
    t.true(panorama.isMobile());
    panorama.load();
    global.userAgent = global.desktopUserAgent;
});

test('Video Non Loopable Video', t => { return new Promise(resolve => {
    const panorama = new VideoPanorama( videoURL, { loop: false } );

    panorama.addEventListener( 'load', () => {
        panorama.playVideo();
        setTimeout( ()=> {
            resolve();
        }, 5000 )
    } );
    panorama.load();
}); });

test('Set Empty Video Texture', t => {
    const panorama = new VideoPanorama( videoURL );
    panorama.setVideoTexture( null );
    t.falsy(panorama.material.map);
});

test('Reset', t => { return new Promise(resolve => {
    const panorama = new VideoPanorama( videoURL );
    panorama.addEventListener( 'load', () => {
        panorama.reset();
        t.falsy(panorama.getVideoElement());
        panorama.dispatchEvent( { type: 'video-toggle' } );
        resolve();
    } );
    panorama.load();
}); });

test('Dispose', t => { return new Promise(resolve => {
    const panorama = new VideoPanorama( videoURL );
    panorama.addEventListener( 'load', () => {
        panorama.dispose();
        t.falsy(panorama.geometry);
        t.falsy(panorama.material);
        t.falsy(panorama.parent);
        resolve();
    } );
    panorama.load();
}); });