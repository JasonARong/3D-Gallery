import type { Group } from "three"
import type { GLTF } from "three-stdlib"
import type * as THREE from "three"

export type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Mesh>
  materials: Record<string, THREE.Material>
  scene: Group
}
