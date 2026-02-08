import { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import './index.css'

function App() {
  const [accepted, setAccepted] = useState(false)
  const [noCount, setNoCount] = useState(0)
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })

  const moveNoButton = () => {
    const x = Math.random() * (window.innerWidth - 150)
    const y = Math.random() * (window.innerHeight - 100)
    setNoPosition({ x, y })
    setNoCount(prev => prev + 1)
  }

  const handleYesClick = () => {
    setAccepted(true)
    // Fire confetti multiple times for effect
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }

  if (accepted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Yay! Happy Valentine's Day! 💖🌹
        </motion.h1>
      </div>
    )
  }

  return (
    <div className="card">
      <h1>Will you be my Valentine Niki? 🌹</h1>
      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '2rem' }}>
        <button
          onClick={handleYesClick}
          style={{
            backgroundColor: '#e11d48',
            color: 'white',
            fontSize: '1.5rem',
            padding: '1rem 3rem'
          }}
        >
          Yes
        </button>

        <motion.button
          onClick={moveNoButton}
          animate={noCount > 0 ? {
            position: 'fixed',
            left: `${noPosition.x}px`,
            top: `${noPosition.y}px`,
          } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          style={{
            zIndex: 50,
            backgroundColor: 'white',
            color: '#e11d48',
            border: '2px solid #e11d48',
            fontSize: '1.5rem',
            padding: '1rem 3rem',
            ...(noCount > 0 ? { position: 'fixed' } : {})
          }}
        >
          {noCount === 0 ? "No" : "No 😢"}
        </motion.button>
      </div>
      <div style={{ marginTop: '3rem', fontSize: '1.2rem', color: '#e11d48', fontStyle: 'italic' }}>
        With love, Samuel 💘
      </div>
    </div>
  )
}

export default App
