"use client"

import { Suspense, useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei"
import { STLLoader } from "three-stdlib"
import type * as THREE from "three"

interface ModelViewerProps {
  modelPath: string
  backgroundColor?: string
}

export default function ModelViewer({ modelPath, backgroundColor = "#111827" }: ModelViewerProps) {
  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={1} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} castShadow />
        <spotLight position={[-5, 5, -5]} angle={0.3} penumbra={1} intensity={1.5} castShadow />
        <color attach="background" args={[backgroundColor]} />
        <Suspense fallback={<LoadingFallback />}>
          <Model modelPath={modelPath} />
          <Environment preset="sunset" background={false} />
        </Suspense>
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} autoRotate={true} autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}

function Model({ modelPath }: { modelPath: string }) {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null)
  const modelRef = useRef<THREE.Group>(null)

  useEffect(() => {
    const loader = new STLLoader()
    loader.load(modelPath, (geometry) => {
      geometry.center()
      geometry.computeVertexNormals()
      setGeometry(geometry)
    })
  }, [modelPath])

  useFrame((state, delta) => {
    // Additional animations can be added here if needed
  })

  if (!geometry) {
    return null
  }

  return (
    <group ref={modelRef} dispose={null} scale={0.05}>
      <mesh geometry={geometry}>
        <meshStandardMaterial color="#f1f1f1" metalness={0.2} roughness={0.4} />
      </mesh>
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
