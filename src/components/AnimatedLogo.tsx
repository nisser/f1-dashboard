'use client'

import { motion } from 'framer-motion'

export default function AnimatedLogo() {
  return (
    <motion.div
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="w-10 h-10"
    >
      <img src="/favicon.ico" alt="Logo" className="w-10 h-10" />
    </motion.div>
  )
}
