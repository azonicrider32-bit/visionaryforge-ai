import { motion } from "framer-motion";

export function LucidLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <motion.div 
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        initial={{ rotate: -180 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        {/* Outer ring with gradient */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#lucidGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Central crystalline structure */}
        <motion.g
          initial={{ scale: 0, rotate: 45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          {/* Diamond core */}
          <motion.polygon
            points="50,20 70,50 50,80 30,50"
            fill="url(#coreGradient)"
            stroke="hsl(var(--director-gold))"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
          
          {/* Inner facets */}
          <motion.path
            d="M50,20 L50,50 L70,50 M50,50 L50,80 M50,50 L30,50"
            stroke="hsl(var(--director-gold-muted))"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />
        </motion.g>
        
        {/* Orbiting elements */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "50px 50px" }}
        >
          <motion.circle cx="50" cy="15" r="2" fill="hsl(var(--cinema-blue))" />
          <motion.circle cx="85" cy="50" r="2" fill="hsl(var(--video-red))" />
          <motion.circle cx="50" cy="85" r="2" fill="hsl(var(--audio-green))" />
          <motion.circle cx="15" cy="50" r="2" fill="hsl(var(--image-purple))" />
        </motion.g>
        
        {/* Pulsing energy waves */}
        <motion.circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="hsl(var(--director-gold))"
          strokeWidth="1"
          opacity="0.5"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="lucidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "hsl(var(--director-gold))", stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: "hsl(var(--cinema-blue))", stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: "hsl(var(--director-gold))", stopOpacity: 1 }} />
          </linearGradient>
          <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: "hsl(var(--director-gold))", stopOpacity: 0.8 }} />
            <stop offset="70%" style={{ stopColor: "hsl(var(--director-gold-dark))", stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: "hsl(var(--studio-dark))", stopOpacity: 0.9 }} />
          </radialGradient>
        </defs>
      </motion.svg>
    </motion.div>
  );
}