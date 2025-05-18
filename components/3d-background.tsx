"use client"

import { useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useTheme } from "next-themes"
import type * as THREE from "three"

function Particles({ count = 200, color = "#8884d8" }) {
  const mesh = useRef<THREE.Points>(null)
  const { viewport } = useThree()

  // Generate random particles
  const particlesPosition = new Float32Array(count * 3)
  const particlesSpeeds = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    particlesPosition[i3] = (Math.random() - 0.5) * viewport.width * 2
    particlesPosition[i3 + 1] = (Math.random() - 0.5) * viewport.height * 2
    particlesPosition[i3 + 2] = (Math.random() - 0.5) * 10
    particlesSpeeds[i] = 0.01 + Math.random() * 0.02
  }

  useFrame(() => {
    if (!mesh.current) return

    const positions = mesh.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3 + 1] -= particlesSpeeds[i]

      // Reset particle position when it goes out of view
      if (positions[i3 + 1] < -viewport.height) {
        positions[i3] = (Math.random() - 0.5) * viewport.width * 2
        positions[i3 + 1] = viewport.height
        positions[i3 + 2] = (Math.random() - 0.5) * 10
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color={color} sizeAttenuation transparent opacity={0.6} />
    </points>
  )
}

export function ThreeDBackground() {
  const { theme } = useTheme()
  const isDarkMode = theme === "dark"

  return (
    <div className="fixed inset-0 -z-10 opacity-30">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Particles color={isDarkMode ? "#8884d8" : "#6366f1"} />
      </Canvas>
    </div>
  )
}
