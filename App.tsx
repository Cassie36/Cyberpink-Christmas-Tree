import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Lightformer } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { InstancedParticles } from './components/InstancedParticles';
import { TreeTopper } from './components/TreeTopper';
import GestureControl from './components/GestureControl';
import Overlay from './components/Overlay';
import { AppMode } from './types';
import { COLORS } from './constants';

const Scene: React.FC<{ 
    mode: AppMode; 
    rotationOffset: number 
}> = ({ mode, rotationOffset }) => {
  return (
    <>
      <color attach="background" args={[COLORS.bg]} />
      
      {/* Ambient Fill - Purple for shadows */}
      <ambientLight intensity={0.5} color={COLORS.purpleDeep} />
      
      {/* Main Rim Light - Soft Lavender */}
      <spotLight 
        position={[0, 15, -10]} 
        angle={0.6} 
        penumbra={1} 
        intensity={4} 
        color="#D8BFD8" 
      />
      
      {/* Fill Light - Strong Pink/Magenta from side */}
      <spotLight 
        position={[10, 5, 10]} 
        intensity={8} 
        color="#FF10F0" 
        distance={40}
        decay={2}
      />
      
      {/* Secondary Fill - Warm Pink from opposite side */}
      <pointLight position={[-10, 0, 5]} intensity={3} color="#FF69B4" distance={20} />

      {/* Under lighting - Uplift */}
      <pointLight position={[0, -5, 0]} intensity={4} color="#8A2BE2" distance={15} />

      {/* Main Content */}
      <group position={[0, -2, 0]}>
        <InstancedParticles mode={mode} rotationOffset={rotationOffset} />
        <TreeTopper mode={mode} />
      </group>

      {/* Post Processing */}
      <EffectComposer disableNormalPass>
        {/* Removed DepthOfField to restore sharpness */}
        
        {/* Bloom - Adjusted for glow without blur */}
        <Bloom 
            luminanceThreshold={0.2} // Lower threshold to catch darker pinks
            mipmapBlur 
            intensity={0.8} // Reduced intensity for clarity
            radius={0.5} // Tighter radius
            levels={8}
        />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
        <Noise opacity={0.05} />
      </EffectComposer>

      {/* Environment for Reflections */}
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <Lightformer intensity={1.5} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} color="#E6E6FA" />
          <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} color="magenta" />
          <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} color="#FF69B4" />
        </group>
      </Environment>

      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        minDistance={10} 
        maxDistance={35}
        maxPolarAngle={Math.PI / 1.6}
        autoRotate={false} 
      />
    </>
  );
};

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.TREE);
  const [handDetected, setHandDetected] = useState(false);
  const [rotationOffset, setRotationOffset] = useState(0);

  const toggleMode = () => {
    setMode((prev) => (prev === AppMode.TREE ? AppMode.EXPLODE : AppMode.TREE));
  };

  return (
    <div className="w-full h-full relative font-sans select-none" onClick={toggleMode}>
      <GestureControl 
        setMode={setMode} 
        setRotationOffset={setRotationOffset}
        setHandDetected={setHandDetected}
      />
      
      <Overlay mode={mode} handDetected={handDetected} />

      <Canvas
        camera={{ position: [0, 0, 22], fov: 40 }}
        // Re-enabled antialias for sharp edges since DoF is gone
        gl={{ antialias: true, alpha: false, toneMappingExposure: 1.0 }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <Scene mode={mode} rotationOffset={rotationOffset} />
        </Suspense>
      </Canvas>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-pink-500 font-mono text-xs z-0 opacity-20">
        RENDERING CORE ACTIVE
      </div>
    </div>
  );
};

export default App;