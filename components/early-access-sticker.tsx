"use client"

import React from "react"
import { motion } from "framer-motion"

export function EarlyAccessSticker() {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: 10, scale: 0.8 }}
      animate={{ opacity: 1, rotate: 6, scale: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2 
      }}
      className="relative w-[140px] h-[120px] sm:w-[160px] sm:h-[140px] bg-[#FDFBF7] shadow-lg flex flex-col justify-center items-center p-4 text-center transform rotate-6 z-20 hidden md:flex"
      style={{
        boxShadow: "2px 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      {/* Tape - Top Left */}
      <div className="absolute -top-3 -left-3 w-8 h-20 bg-[#FF8800]/40 rotate-[-45deg] z-10 hidden" /> 
      {/* Tapes */}
      {/* Top Left */}
      <div className="absolute -top-2 -left-3 w-12 h-4 bg-[#FF4500]/40 -rotate-[35deg] z-10 backdrop-blur-[1px] shadow-sm" />
      {/* Top Right */}
      <div className="absolute -top-2 -right-3 w-12 h-4 bg-[#FF4500]/40 rotate-[35deg] z-10 backdrop-blur-[1px] shadow-sm" />
      {/* Bottom Left */}
      <div className="absolute -bottom-2 -left-3 w-12 h-4 bg-[#FF4500]/40 rotate-[35deg] z-10 backdrop-blur-[1px] shadow-sm" />
      {/* Bottom Right */}
      <div className="absolute -bottom-2 -right-3 w-12 h-4 bg-[#FF4500]/40 -rotate-[35deg] z-10 backdrop-blur-[1px] shadow-sm" />
      
      {/* Content */}
      <div className="flex flex-col items-center gap-1">
        <div className="text-[#FF8000] text-[10px] sm:text-xs font-bold font-sans uppercase tracking-wider">
          Early Access
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#A8A29E] text-sm line-through decoration-1">$49</span>
          <span className="text-[#37322F] text-2xl sm:text-3xl font-bold font-serif">$29</span>
        </div>
        <div className="text-[#605A57] text-[10px] sm:text-xs font-medium font-sans leading-tight mt-1">
          Limited Time Offer
        </div>
      </div>
    </motion.div>
  )
}
