"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF, PerspectiveCamera } from "@react-three/drei"
import type { GLTFResult } from "@/types/gltf"
import type * as THREE from "three"

interface ModelViewerProps {
  modelPath: string
  backgroundColor?: string
}

export default function ModelViewer({ modelPath, backgroundColor = "#111827" }: ModelViewerProps) {
  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <color attach="background" args={[backgroundColor]} />
        <Suspense fallback={<LoadingFallback />}>
          <Model modelPath={modelPath} />
          <Environment preset="night" background={false} /> {/* Keep environment lighting but not as background */}
        </Suspense>
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} autoRotate={true} autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}

function Model({ modelPath }: { modelPath: string }) {
  const gltf = useGLTF(modelPath) as GLTFResult
  const modelRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    // Additional animations can be added here if needed
  })

  return (
    <group ref={modelRef} dispose={null} scale={2}>
      <primitive object={gltf.scene} />
    </group>
  )
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="purple" wireframe />
    </mesh>
  )
}
