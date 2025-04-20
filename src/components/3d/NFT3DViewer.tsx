import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  modelPath: string;
}

const Model = ({ modelPath }: ModelProps) => {
  // This is a simple placeholder since we don't have actual GLB files to load
  // In a real app, you would use useGLTF to load 3D models
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  const randomGeometry = () => {
    // Generate a random geometry based on model path to simulate different 3D models
    const hash = modelPath.split('').reduce((a, b) => {
      return a + b.charCodeAt(0);
    }, 0);
    
    switch (hash % 5) {
      case 0:
        return <torusKnotGeometry args={[1, 0.3, 128, 32]} />;
      case 1:
        return <dodecahedronGeometry args={[1.2, 0]} />;
      case 2:
        return <octahedronGeometry args={[1.5, 0]} />;
      case 3:
        return <icosahedronGeometry args={[1.3, 0]} />;
      default:
        return <boxGeometry args={[1.2, 1.2, 1.2]} />;
    }
  };

  const randomColor = () => {
    const hash = modelPath.split('').reduce((a, b) => {
      return a + b.charCodeAt(0);
    }, 0);
    
    // Generate a color based on the hash of the model path
    const hue = (hash % 360) / 360;
    return new THREE.Color().setHSL(hue, 0.8, 0.5);
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} castShadow receiveShadow>
        {randomGeometry()}
        <meshStandardMaterial 
          color={randomColor()} 
          roughness={0.2} 
          metalness={0.8}
          envMapIntensity={1} 
        />
      </mesh>
    </Float>
  );
};

interface NFT3DViewerProps {
  modelPath: string;
}

const NFT3DViewer = ({ modelPath }: NFT3DViewerProps) => {
  return (
    <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={1} 
        castShadow 
      />
      <Model modelPath={modelPath} />
      <OrbitControls enableZoom={false} enablePan={false} />
      <Environment preset="city" />
    </Canvas>
  );
};

export default NFT3DViewer;