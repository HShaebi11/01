import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Check if canvas exists before creating renderer
const canvas = document.getElementById('scene');
if (!canvas) {
    throw new Error('Canvas element with id "scene" not found');
}

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true // Add antialiasing for smoother edges
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio); // Handle high DPI displays

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Add smooth damping
controls.dampingFactor = 0.05;

// Create a cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Position camera
camera.position.z = 5;

// Animation loop
let animationFrameId;
function animate() {
    animationFrameId = requestAnimationFrame(animate);

    // Rotate cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    controls.update(); // Required for damping
    renderer.render(scene, camera);
}

// Handle window resize
function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', handleResize);

// Cleanup function to prevent memory leaks
function cleanup() {
    window.removeEventListener('resize', handleResize);
    cancelAnimationFrame(animationFrameId);
    renderer.dispose();
    geometry.dispose();
    material.dispose();
}

// Start animation
animate();

// Add cleanup to window for potential use
window.cleanupThreeJS = cleanup;