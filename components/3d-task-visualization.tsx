"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Text, Environment, Float, useTexture, Stars } from "@react-three/drei"
import * as THREE from "three"
import type { Task } from "@/components/daily-planner"
import { type TranslationKey, getTranslation } from "@/lib/translations"
import { format } from "date-fns"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ThreeDTaskVisualizationProps {
  tasks: Task[]
  language: string
}

// Task sphere component with texture
function TaskSphere({
  task,
  position,
  onClick,
  language,
}: { task: Task; position: [number, number, number]; onClick: () => void; language: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const t = (key: TranslationKey) => getTranslation(language, key)

  // Load texture based on category
  const textures = {
    work: useTexture("/placeholder.svg?height=200&width=200&text=Work"),
    personal: useTexture("/placeholder.svg?height=200&width=200&text=Personal"),
    health: useTexture("/placeholder.svg?height=200&width=200&text=Health"),
    learning: useTexture("/placeholder.svg?height=200&width=200&text=Learning"),
    errands: useTexture("/placeholder.svg?height=200&width=200&text=Errands"),
  }

  // Determine texture based on category
  const texture = textures[task.category as keyof typeof textures] || textures.work

  // Determine color based on priority
  const color =
    task.priority === "high"
      ? "#ef4444" // red
      : task.priority === "medium"
        ? "#f97316" // orange
        : "#22c55e" // green

  // Determine size based on task complexity (using description length as a proxy)
  const size = task.description ? 0.5 + Math.min(task.description.length / 200, 0.5) : 0.5

  // Animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01

      // Hover effect
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1)
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
      }

      // Pulse effect for incomplete tasks
      if (!task.completed) {
        meshRef.current.scale.x =
          meshRef.current.scale.y =
          meshRef.current.scale.z =
            (hovered ? 1.2 : 1) * (1 + Math.sin(state.clock.elapsedTime * 2) * 0.05)
      }
    }
  })

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.5}
          opacity={task.completed ? 0.7 : 1}
          transparent={task.completed}
          map={texture}
        />
      </mesh>

      <Text
        position={[0, size + 0.3, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#000000"
      >
        {task.title}
      </Text>

      <Text
        position={[0, size + 0.6, 0]}
        fontSize={0.15}
        color="#cccccc"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.005}
        outlineColor="#000000"
      >
        {format(new Date(task.date), "MMM d")}
        {task.time ? ` ${task.time}` : ""}
      </Text>
    </group>
  )
}

// Timeline component
function Timeline({ tasks, language }: { tasks: Task[]; language: string }) {
  const { camera } = useThree()
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const t = (key: TranslationKey) => getTranslation(language, key)

  // Sort tasks by date
  const sortedTasks = [...tasks].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // Group tasks by date
  const tasksByDate: Record<string, Task[]> = {}
  sortedTasks.forEach((task) => {
    const dateKey = format(new Date(task.date), "yyyy-MM-dd")
    if (!tasksByDate[dateKey]) {
      tasksByDate[dateKey] = []
    }
    tasksByDate[dateKey].push(task)
  })

  // Create date markers and position tasks
  const dateKeys = Object.keys(tasksByDate)
  const today = format(new Date(), "yyyy-MM-dd")
  const todayIndex = dateKeys.indexOf(today)

  // Focus camera on today or first date
  useEffect(() => {
    const focusIndex = todayIndex >= 0 ? todayIndex : 0
    if (dateKeys.length > 0) {
      camera.position.x = focusIndex * 4
    }
  }, [camera, dateKeys, todayIndex])

  return (
    <group>
      {/* Timeline base with glow effect */}
      <mesh position={[dateKeys.length * 2 - 2, -1.5, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[dateKeys.length * 4 + 4, 0.1, 1]} />
        <meshStandardMaterial color="#666666" emissive="#333333" emissiveIntensity={0.5} />
      </mesh>

      {/* Date markers and tasks */}
      {dateKeys.map((dateKey, index) => {
        const date = new Date(dateKey)
        const isCurrentDay = dateKey === today
        const dayTasks = tasksByDate[dateKey]

        return (
          <group key={dateKey} position={[index * 4, 0, 0]}>
            {/* Date marker with glow for current day */}
            <mesh position={[0, -1, 0]}>
              <boxGeometry args={[0.1, 1, 0.1]} />
              <meshStandardMaterial
                color={isCurrentDay ? "#4CAF50" : "#aaaaaa"}
                emissive={isCurrentDay ? "#4CAF50" : "#aaaaaa"}
                emissiveIntensity={isCurrentDay ? 0.5 : 0.2}
              />
            </mesh>

            {/* Date label */}
            <Text
              position={[0, -2, 0]}
              fontSize={0.3}
              color={isCurrentDay ? "#4CAF50" : "white"}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.01}
              outlineColor="#000000"
            >
              {format(date, "MMM d")}
            </Text>

            {/* Tasks for this date */}
            {dayTasks.map((task, taskIndex) => {
              // Position tasks in a grid or circle around the date marker
              const angle = (taskIndex / dayTasks.length) * Math.PI * 2
              const radius = 1.5
              const x = Math.sin(angle) * radius
              const z = Math.cos(angle) * radius

              return (
                <TaskSphere
                  key={task.id}
                  task={task}
                  position={[x, 1, z]}
                  onClick={() => setSelectedTask(task)}
                  language={language}
                />
              )
            })}
          </group>
        )
      })}

      {/* Selected task details */}
      {selectedTask && (
        <group position={[camera.position.x, 3, -3]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.4}
            color="white"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.01}
            outlineColor="#000000"
            maxWidth={5}
          >
            {selectedTask.title}
          </Text>

          <Text
            position={[0, -0.5, 0]}
            fontSize={0.25}
            color="#cccccc"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.005}
            outlineColor="#000000"
            maxWidth={5}
          >
            {selectedTask.description || t("noDescription")}
          </Text>

          <Text
            position={[0, -1, 0]}
            fontSize={0.25}
            color="#aaaaaa"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.005}
            outlineColor="#000000"
          >
            {t("priority")}: {t(selectedTask.priority as TranslationKey)} |
            {selectedTask.completed ? ` ${t("completed")}` : ` ${t("incomplete")}`}
          </Text>

          <mesh position={[2.5, -0.5, 0]} onClick={() => setSelectedTask(null)}>
            <planeGeometry args={[1, 0.5]} />
            <meshBasicMaterial color="#ef4444" />
            <Text position={[0, 0, 0.1]} fontSize={0.2} color="white" anchorX="center" anchorY="middle">
              {t("close")}
            </Text>
          </mesh>
        </group>
      )}
    </group>
  )
}

export function ThreeDTaskVisualization({ tasks, language }: ThreeDTaskVisualizationProps) {
  const t = (key: TranslationKey) => getTranslation(language, key)

  return (
    <Card className="overflow-hidden border-slate-200 dark:border-slate-700 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">{t("3dTaskVisualization")}</CardTitle>
        <CardDescription>{t("3dTaskVisualizationDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="h-[500px] w-full rounded-lg overflow-hidden"
        >
          <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Environment preset="city" />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
              <Timeline tasks={tasks} language={language} />
            </Float>

            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={3}
              maxDistance={20}
              minPolarAngle={0}
              maxPolarAngle={Math.PI / 2}
            />
          </Canvas>
        </motion.div>
        <p className="text-sm text-muted-foreground mt-4 text-center">{t("3dVisualizationHelp")}</p>
      </CardContent>
    </Card>
  )
}
