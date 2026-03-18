import React, { useRef } from 'react';
import { Html } from '@react-three/drei';

export default function Scene({ setActiveSection }) {
  return (
    <group position={[0, -1, 0]}>
      {/* Le Sol */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[10, 1, 10]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>

      {/* Le Mur du fond */}
      <mesh position={[0, 4.5, -5]} receiveShadow>
        <boxGeometry args={[10, 10, 1]} />
        <meshStandardMaterial color="#4a5568" />
      </mesh>

      {/* Le Bureau (Zone "Expériences") */}
      <mesh 
        position={[-2, 1, -2]} 
        onClick={(e) => { e.stopPropagation(); setActiveSection('experiences'); }}
        onPointerOver={(e) => document.body.style.cursor = 'pointer'}
        onPointerOut={(e) => document.body.style.cursor = 'default'}
        castShadow
      >
        <boxGeometry args={[3, 2, 2]} />
        <meshStandardMaterial color="#8B4513" />
        <Html position={[0, 1.5, 0]} center className="pointer-events-none">
          <div className="bg-black/50 text-white px-2 py-1 rounded text-xs font-bold tracking-wider">
            BUREAU (Expériences)
          </div>
        </Html>
      </mesh>

      {/* L'Ordinateur (Zone "À Propos & Compétences") */}
      <mesh 
        position={[-2, 2.5, -2]} 
        onClick={(e) => { e.stopPropagation(); setActiveSection('about'); }}
        onPointerOver={(e) => document.body.style.cursor = 'pointer'}
        onPointerOut={(e) => document.body.style.cursor = 'default'}
        castShadow
      >
        <boxGeometry args={[1, 1, 0.5]} />
        <meshStandardMaterial color="#e2e8f0" />
        <Html position={[0, 1, 0]} center className="pointer-events-none">
          <div className="bg-black/50 text-white px-2 py-1 rounded text-xs font-bold tracking-wider">
            PC (Compétences)
          </div>
        </Html>
      </mesh>

      {/* Le Poster Pulp Fiction (Zone "Centres d'intérêt") */}
      <mesh 
        position={[2, 3, -4.4]} 
        onClick={(e) => { e.stopPropagation(); setActiveSection('interests'); }}
        onPointerOver={(e) => document.body.style.cursor = 'pointer'}
        onPointerOut={(e) => document.body.style.cursor = 'default'}
      >
        <boxGeometry args={[2, 3, 0.1]} />
        <meshStandardMaterial color="#e53e3e" />
        <Html position={[0, 0, 0.5]} center className="pointer-events-none">
           <div className="bg-black/50 text-white px-2 py-1 rounded text-xs font-bold tracking-wider">
            POSTER (Passions)
          </div>
        </Html>
      </mesh>
    </group>
  );
}
