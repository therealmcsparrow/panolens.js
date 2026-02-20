<h1 align="center">Panolens.js</h1>

<p align="center">
  <strong>The lightweight, event-driven WebGL panorama engine built on Three.js</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/panolens"><img src="https://img.shields.io/npm/v/panolens.svg" alt="NPM Package"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/github/license/therealmcsparrow/panolens.js.svg" alt="License"></a>
  <a href="https://bundlephobia.com/result?p=panolens"><img src="https://badgen.net/bundlephobia/minzip/panolens" alt="Bundle Size"></a>
</p>

---

## Why Panolens.js?

Drop a 360 panorama into any web page with **three lines of code**. No bloated frameworks, no complex pipelines &mdash; just a fast, production-ready viewer that works everywhere: desktop, mobile, and VR headsets.

```javascript
const panorama = new PANOLENS.ImagePanorama('your-360-photo.jpg');
const viewer = new PANOLENS.Viewer();
viewer.add(panorama);
```

**~110 KB minified.** That's it. Your users are already looking around.

---

## Features at a Glance

| | Feature | What you get |
|---|---|---|
| **Panorama Types** | Image, Video, Cube Map, Little Planet, Google Street View, Live Camera | Every major 360 format out of the box |
| **VR Ready** | Google Cardboard & Stereo modes | One toggle to enter immersive VR |
| **Interactive Hotspots** | Infospots with hover text, click events, and custom images | Build guided tours, product showcases, interactive stories |
| **Panorama Linking** | Connect scenes with animated transitions | Seamless multi-room walkthroughs |
| **Device Orientation** | Gyroscope controls on mobile | Look around by moving your phone |
| **Auto Rotation** | Configurable idle rotation with custom speed | Keep the viewer alive when users aren't interacting |
| **Gaze Interaction** | Built-in reticle system with dwell-time triggers | Hands-free navigation for VR and kiosk displays |
| **Video Playback** | Autoplay, loop, progress events, seek | Full 360 video experiences with controls |
| **Live Camera** | WebRTC MediaStream support | Real-time camera feed as a panorama |
| **Multi-Viewer** | Multiple independent viewers on a single page | Side-by-side comparisons, dashboards, portals |
| **Event System** | Rich lifecycle events (load, enter, leave, progress, and more) | Deep integration with your application logic |

---

## Quick Start

### Option 1 &mdash; Script Tags

Include Three.js and Panolens.js directly:

```html
<script src="https://cdn.jsdelivr.net/npm/three@0.125.0/build/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/panolens@0.13.0/build/panolens.min.js"></script>
```

### Option 2 &mdash; NPM (Recommended)

```bash
npm install panolens
```

```javascript
import * as PANOLENS from 'panolens';

const panorama = new PANOLENS.ImagePanorama('equirectangular.jpg');
const viewer = new PANOLENS.Viewer();
viewer.add(panorama);
```

> **Version compatibility:** Check `PANOLENS.VERSION` and `PANOLENS.THREE_VERSION` at runtime, or see `dependencies` in `package.json` for the supported Three.js range.

---

## Panorama Types

### 360 Image
```javascript
const panorama = new PANOLENS.ImagePanorama('360-photo.jpg');
```

### 360 Video
```javascript
const panorama = new PANOLENS.VideoPanorama('360-video.mp4', {
  autoplay: true,
  muted: true,
  loop: true
});
```

### Cube Map
```javascript
const panorama = new PANOLENS.CubePanorama([
  'px.jpg', 'nx.jpg',
  'py.jpg', 'ny.jpg',
  'pz.jpg', 'nz.jpg'
]);
```

### Little Planet
```javascript
const panorama = new PANOLENS.ImageLittlePlanet('360-photo.jpg');
```

### Google Street View
```javascript
const panorama = new PANOLENS.GoogleStreetviewPanorama('pano_id_here');
```

### Live Camera Feed
```javascript
const panorama = new PANOLENS.CameraPanorama();
```

---

## Interactive Hotspots & Scene Linking

Build immersive guided tours by placing hotspots and linking scenes together:

```javascript
const lobby = new PANOLENS.ImagePanorama('lobby.jpg');
const office = new PANOLENS.ImagePanorama('office.jpg');

// Link scenes with navigation arrows
lobby.link(office, new THREE.Vector3(2000, 0, -3000));
office.link(lobby, new THREE.Vector3(-2000, 0, 3000));

// Add an interactive infospot
const info = new PANOLENS.Infospot(350, PANOLENS.DataImage.Info);
info.position.set(3000, 500, -2000);
info.addHoverText('Welcome to the Office');
lobby.add(info);

const viewer = new PANOLENS.Viewer();
viewer.add(lobby, office);
```

---

## VR & Device Controls

Switch between viewing modes with a single call:

```javascript
// Google Cardboard VR
viewer.enableEffect(PANOLENS.MODES.CARDBOARD);

// Stereo 3D
viewer.enableEffect(PANOLENS.MODES.STEREO);

// Mobile gyroscope
viewer.enableControl(PANOLENS.CONTROLS.DEVICEORIENTATION);

// Back to standard mouse/touch
viewer.enableControl(PANOLENS.CONTROLS.ORBIT);
viewer.enableEffect(PANOLENS.MODES.NORMAL);
```

---

## Viewer Configuration

Fine-tune every aspect of the viewing experience:

```javascript
const viewer = new PANOLENS.Viewer({
  container: document.getElementById('my-container'), // Custom DOM container
  controlBar: true,                    // Show/hide control bar
  viewIndicator: true,                 // Orientation compass
  autoRotate: true,                    // Idle rotation
  autoRotateSpeed: 2,                  // Rotation speed
  autoRotateActivationDuration: 5000,  // ms before auto-rotate kicks in
  enableReticle: true,                 // Gaze-based reticle for VR
  dwellTime: 1500,                     // Reticle dwell trigger (ms)
  cameraFov: 60,                       // Field of view
  reverseDragging: false,              // Invert drag direction
  horizontalView: false,               // Lock vertical axis
  output: 'none'                       // Debug: 'console' or 'overlay'
});
```

---

## Use Cases

- **Real Estate** &mdash; Virtual property tours with room-to-room navigation
- **Tourism & Hospitality** &mdash; Explore hotels, resorts, and destinations before booking
- **E-Commerce** &mdash; 360 product showcases and showrooms
- **Education** &mdash; Interactive museum exhibits and virtual field trips
- **Events** &mdash; Immersive recaps of concerts, conferences, and weddings
- **Architecture** &mdash; Walk clients through renders before construction begins

---

## Development

```bash
# Install dependencies
npm install

# Start dev server with hot reload (http://localhost:3580)
npm start

# Lint
npm run lint

# Run tests with coverage
npm test

# Production build
npm run build
```

### Contributing

Contributions are welcome! Please target the `dev` branch for all pull requests so changes can be tracked for the next release.

---

## Browser Support

Panolens.js runs anywhere WebGL runs:

- Chrome, Edge, Firefox, Safari (latest)
- iOS Safari, Android Chrome
- Google Cardboard & compatible VR viewers
- Works in iframes and custom containers

---

## License

[MIT](./LICENSE) &mdash; free for personal and commercial use.

---

<p align="center">
  <sub>Built with Three.js. Inspired by the belief that immersive web experiences should be simple to create.</sub>
</p>
