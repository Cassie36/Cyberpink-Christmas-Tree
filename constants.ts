import * as THREE from 'three';

export const COLORS = {
  bg: '#050103',
  pinkPrimary: '#E6007E', // Deep Magenta
  pinkSecondary: '#FF69B4', // Hot pink
  pinkLight: '#FFB6C1', // Light Pink
  purpleDeep: '#9400D3', // Dark Violet
  white: '#FFFFFF',
  cyanGlow: '#E0FFFF', // Slight cyan tint for white elements
};

export const COUNTS = {
  leaves: 7500, // Increased density for "cloud" volume
  ornaments: 1500,
  ribbon: 3000,
};

export const TREE_CONFIG = {
  height: 12,
  radius: 4.8,
  spiralLoops: 3.5, 
};

// Pre-compute colors for optimization - Expanded for softer blending
export const COLOR_PALETTE = [
  new THREE.Color('#E6007E'), // Deep Magenta
  new THREE.Color('#DB7093'), // Pale Violet Red (Softer)
  new THREE.Color('#FF69B4'), // Hot Pink
  new THREE.Color('#FFB6C1'), // Light Pink
  new THREE.Color('#DA70D6'), // Orchid (Bridge color)
  new THREE.Color('#D8BFD8'), // Thistle (Muted)
  new THREE.Color('#C71585'), // Medium Violet Red
  new THREE.Color('#BA55D3'), // Medium Orchid
  new THREE.Color('#4B0082'), // Indigo (Deep contrast)
  new THREE.Color('#800080'), // Purple
];

export const ORNAMENT_COLOR = new THREE.Color(COLORS.white);
export const RIBBON_COLOR = new THREE.Color(COLORS.white);