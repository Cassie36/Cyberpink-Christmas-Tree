export enum AppMode {
  TREE = 'TREE',
  EXPLODE = 'EXPLODE',
}

export interface ParticleData {
  // Target position in Tree mode
  treePos: [number, number, number];
  treeRot: [number, number, number];
  // Target position in Explode mode
  explodePos: [number, number, number];
  explodeRot: [number, number, number];
  // Current interpolated state
  currentPos: [number, number, number];
  speed: number;
  scale: number;
  color: string;
}

export interface GestureState {
  isHandDetected: boolean;
  gesture: 'PINCH' | 'OPEN' | 'UNKNOWN';
  handX: number; // Normalized 0-1, used for rotation
}