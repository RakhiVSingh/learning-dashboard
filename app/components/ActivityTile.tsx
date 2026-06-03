'use client'
import { motion } from 'framer-motion'
import { Activity, TrendingUp, Users, Clock, X } from 'lucide-react'
import { useState } from 'react'

export default function ActivityTile() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const contributions = [12, 8, 15, 10, 20, 25, 18]
  const [selectedDay, setSelectedDay] = useState<{ day: string; hours: number; index: number } | null>(null)

  const dayDetails = {
    Mon: { tasks: ['Completed React module', 'Watched 2 videos'], tips: 'Keep the momentum!' },
    Tue: { tasks: ['TypeScript practice', 'Code review'], tips: 'Great consistency!' },
    Wed: { tasks: ['UI animations lab', 'Quiz completed'], tips: 'You are crushing it!' },
    Thu: { tasks: ['Next.js lesson', 'Group study'], tips: 'Almost there!' },
    Fri: { tasks: ['Performance optimization', 'Code challenge'], tips: 'Weekend is near!' },
    Sat: { tasks: ['Project work', 'Live session'], tips: 'Excellent dedication!' },
    Sun: { tasks: ['Review week', 'Plan next week'], tips: 'Perfect finish!' }
  }

  const handleBarClick = (day: string, hours: number, index: number) => {
    setSelectedDay({ day, hours, index })
  }

  const closePopup = () => {
    setSelectedDay(null)
  }

  return (
    <>
      <motion.div
        whileHover={{ 
          scale: 1.01,
          transition: { type: 'spring', stiffness: 400, damping: 10 }
        }}
        style={{
          background: 'linear-gradient(135deg, #1a1a1a, #0a0a0a)',
          borderRadius: '24px',
          padding: '24px',
          border: '1px solid rgba(255,255,255,0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Activity size={24} style={{ color: '#a855f7' }} />
            </motion.div>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>Activity Overview</h3>
          </motion.div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            {[
              { value: '108', label: 'Total Hours', color: '#a855f7' },
              { value: '+23%', label: 'vs Last Week', color: '#4ade80' },
              { value: '8', label: 'Courses Active', color: '#f59e0b' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'white' }}>{item.value}</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>{item.label}</div>
              </motion.div>
            ))}
          </div>
          
          {/* Contribution graph - Clickable bars */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
            {days.map((day, i) => (
              <motion.div 
                key={day} 
                style={{ textAlign: 'center', cursor: 'pointer' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                onClick={() => handleBarClick(day, contributions[i], i)}
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${contributions[i] * 3}px` }}
                  transition={{ delay: i * 0.05, duration: 0.5, type: "spring" }}
                  whileHover={{ 
                    scaleX: 1.1,
                    background: 'linear-gradient(180deg, #ec4899, #a855f7)',
                    cursor: 'pointer'
                  }}
                  style={{
                    width: '32px',
                    background: 'linear-gradient(180deg, #a855f7, #ec4899)',
                    borderRadius: '4px',
                    marginBottom: '8px',
                    height: `${contributions[i] * 3}px`,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                />
                <div style={{ fontSize: '12px', color: '#6b7280' }}>{day}</div>
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  style={{ fontSize: '10px', color: '#a855f7' }}
                >
                  {contributions[i]}h
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #2a2a2a' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <motion.div whileHover={{ x: 5 }} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <TrendingUp size={14} style={{ color: '#4ade80' }} />
                <span style={{ fontSize: '12px', color: '#9ca3af' }}>+15% this week</span>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Users size={14} style={{ color: '#a855f7' }} />
                <span style={{ fontSize: '12px', color: '#9ca3af' }}>Rank #42</span>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={14} style={{ color: '#f59e0b' }} />
                <span style={{ fontSize: '12px', color: '#9ca3af' }}>3h avg/day</span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Popup Modal for Day Details */}
      {selectedDay && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
          }}
          onClick={closePopup}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            style={{
              background: 'linear-gradient(135deg, #1a1a1a, #0a0a0a)',
              borderRadius: '24px',
              padding: '32px',
              maxWidth: '400px',
              width: '90%',
              border: '1px solid rgba(168,85,247,0.3)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePopup}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#9ca3af'
              }}
            >
              <X size={16} />
            </button>

            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
              {selectedDay.day}
            </h3>
            <p style={{ color: '#a855f7', marginBottom: '24px' }}>
              {selectedDay.hours} hours of learning
            </p>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '12px' }}>Tasks Completed:</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {dayDetails[selectedDay.day as keyof typeof dayDetails].tasks.map((task, i) => (
                  <li key={i} style={{ color: 'white', fontSize: '13px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#4ade80' }}>[OK]</span> {task}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{
              background: 'rgba(168,85,247,0.1)',
              padding: '12px',
              borderRadius: '12px',
              border: '1px solid rgba(168,85,247,0.2)'
            }}>
              <h4 style={{ fontSize: '12px', color: '#a855f7', marginBottom: '8px' }}>Tip:</h4>
              <p style={{ fontSize: '13px', color: '#9ca3af' }}>
                {dayDetails[selectedDay.day as keyof typeof dayDetails].tips}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={closePopup}
              style={{
                marginTop: '24px',
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Got it!
            </motion.button>
          </motion.div>
        </div>
      )}
    </>
  )
}