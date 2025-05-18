"use client"

import { Button, type ButtonProps } from "@/components/ui/button"
import { motion } from "framer-motion"
import { forwardRef } from "react"

export const AnimatedButton = forwardRef<HTMLButtonElement, ButtonProps>(({ children, className, ...props }, ref) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button ref={ref} className={`transition-all duration-300 ${className}`} {...props}>
        {children}
      </Button>
    </motion.div>
  )
})
AnimatedButton.displayName = "AnimatedButton"
