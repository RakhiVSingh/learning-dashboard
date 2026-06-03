'use client'
import { motion } from 'framer-motion'
import { Flame, Calendar, ArrowRight, Award } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function HeroTile({ userName, streak }: { userName: string; streak: number }) {
  const router = useRouter()

  const handleContinueLearning = () => {
    router.push('/courses')
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        background: 'linear-gradient(135deg, #1a1a1a, #0a0a0a)',
        borderRadius: '24px',
        padding: '32px',
        border: '1px solid rgba(255,255,255,0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}
        >
          Welcome back, {userName}! 👋
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ color: '#9ca3af', marginBottom: '24px' }}
        >
          Ready to continue your learning journey?
        </motion.p>
        
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
            >
              <Flame style={{ color: '#f59e0b' }} size={24} />
            </motion.div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>{streak}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Day Streak</div>
            </div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Calendar size={24} style={{ color: '#a855f7' }} />
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>12</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Hours This Week</div>
            </div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Award size={24} style={{ color: '#10b981' }} />
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>8</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Achievements</div>
            </div>
          </motion.div>
        </div>
        
        <div style={{ marginTop: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: '#9ca3af' }}>Weekly Goal Progress</span>
            <span style={{ fontSize: '12px', color: '#a855f7' }}>12/15 hours</span>
          </div>
          <div style={{
            height: '6px',
            backgroundColor: '#2a2a2a',
            borderRadius: '9999px',
            overflow: 'hidden'
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '80%' }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                borderRadius: '9999px'
              }}
            />
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleContinueLearning}
          style={{
            marginTop: '24px',
            background: 'linear-gradient(135deg, #a855f7, #ec4899)',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '12px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Continue Learning <ArrowRight size={16} />
        </motion.button>
      </div>
    </motion.div>
  )
}