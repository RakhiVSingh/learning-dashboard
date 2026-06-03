'use client'
import { motion } from 'framer-motion'
import { Activity, TrendingUp, Users, Clock, Calendar, Award, Flame, Target, BookOpen, Zap, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ActivityPage() {
  const [animatedValues, setAnimatedValues] = useState({
    hours: 0,
    streak: 0,
    courses: 0,
    rank: 0
  })
  const [selectedDay, setSelectedDay] = useState<{
    day: string;
    hours: number;
    completed: number;
    topics: string[];
    quiz: number;
  } | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues({
        hours: 47,
        streak: 7,
        courses: 5,
        rank: 42
      })
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Weekly activity data with more details
  const weeklyData = [
    { day: 'Mon', hours: 4, completed: 2, topics: ['React Hooks', 'Components'], quiz: 85 },
    { day: 'Tue', hours: 6, completed: 3, topics: ['TypeScript', 'Interfaces'], quiz: 92 },
    { day: 'Wed', hours: 3, completed: 1, topics: ['Animations', 'Framer'], quiz: 78 },
    { day: 'Thu', hours: 7, completed: 4, topics: ['Next.js', 'Routing'], quiz: 88 },
    { day: 'Fri', hours: 5, completed: 2, topics: ['Performance', 'Optimization'], quiz: 90 },
    { day: 'Sat', hours: 8, completed: 5, topics: ['Project Work', 'Deployment'], quiz: 95 },
    { day: 'Sun', hours: 6, completed: 3, topics: ['Review', 'Planning'], quiz: 87 }
  ]

  const handleBarClick = (day: typeof weeklyData[0]) => {
    setSelectedDay(day)
  }

  const closePopup = () => {
    setSelectedDay(null)
  }

  // Recent achievements
  const achievements = [
    { id: 1, title: '7 Day Streak', icon: Flame, color: '#f59e0b', date: 'Today', points: 100 },
    { id: 2, title: 'Course Master', icon: Award, color: '#a855f7', date: 'Yesterday', points: 250 },
    { id: 3, title: 'Speed Learner', icon: Zap, color: '#10b981', date: '2 days ago', points: 150 },
    { id: 4, title: 'Perfect Week', icon: Target, color: '#3b82f6', date: '3 days ago', points: 200 }
  ]

  // Upcoming tasks
  const upcomingTasks = [
    { id: 1, task: 'Complete React Patterns module', due: 'Today', priority: 'high', time: '2 hours' },
    { id: 2, task: 'Submit TypeScript assignment', due: 'Tomorrow', priority: 'medium', time: '1 hour' },
    { id: 3, task: 'Join live session', due: 'Wed', priority: 'high', time: '1.5 hours' },
    { id: 4, task: 'Review pull request', due: 'Fri', priority: 'low', time: '30 min' }
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'black', padding: '32px' }}>
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
              <h4 style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '12px' }}>📋 Topics Covered:</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {selectedDay.topics.map((topic, i) => (
                  <li key={i} style={{ color: 'white', fontSize: '13px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#4ade80' }}>✓</span> {topic}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
              <div style={{
                background: 'rgba(168,85,247,0.1)',
                padding: '12px',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#a855f7' }}>{selectedDay.completed}</div>
                <div style={{ fontSize: '10px', color: '#6b7280' }}>Tasks Completed</div>
              </div>
              <div style={{
                background: 'rgba(16,185,129,0.1)',
                padding: '12px',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>{selectedDay.quiz}%</div>
                <div style={{ fontSize: '10px', color: '#6b7280' }}>Quiz Score</div>
              </div>
            </div>

            <div style={{
              background: 'rgba(168,85,247,0.1)',
              padding: '12px',
              borderRadius: '12px',
              border: '1px solid rgba(168,85,247,0.2)'
            }}>
              <h4 style={{ fontSize: '12px', color: '#a855f7', marginBottom: '8px' }}>💡 Tip:</h4>
              <p style={{ fontSize: '13px', color: '#9ca3af' }}>
                {selectedDay.hours >= 6 
                  ? "Amazing dedication! You're on fire! 🔥" 
                  : selectedDay.hours >= 4 
                  ? "Great consistency! Keep it up! 💪" 
                  : "Every hour counts! Stay consistent! 📚"}
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

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '32px' }}
      >
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
          Activity Dashboard 📊
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '18px' }}>
          Track your learning progress and achievements
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}
      >
        {[
          { icon: Clock, label: 'Total Hours', value: animatedValues.hours, suffix: 'hrs', color: '#a855f7' },
          { icon: Flame, label: 'Current Streak', value: animatedValues.streak, suffix: 'days', color: '#f59e0b' },
          { icon: BookOpen, label: 'Courses Active', value: animatedValues.courses, suffix: '', color: '#10b981' },
          { icon: TrendingUp, label: 'Global Rank', value: animatedValues.rank, suffix: '', color: '#3b82f6' }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            style={{
              background: 'linear-gradient(135deg, #1a1a1a, #0a0a0a)',
              borderRadius: '20px',
              padding: '24px',
              border: `1px solid ${stat.color}30`,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <stat.icon size={28} style={{ color: stat.color }} />
                <span style={{ color: '#9ca3af', fontSize: '14px' }}>{stat.label}</span>
              </div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'white' }}>
                {stat.value}{stat.suffix && ` ${stat.suffix}`}
              </div>
            </div>
            <div style={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: '100px',
              height: '100px',
              background: `radial-gradient(circle, ${stat.color}20, transparent)`,
              borderRadius: '50%'
            }} />
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
        
        {/* Weekly Activity Chart - Clickable bars */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: 'linear-gradient(135deg, #1a1a1a, #0a0a0a)',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <Activity size={24} style={{ color: '#a855f7' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>Weekly Activity</h3>
            <div style={{ marginLeft: 'auto', fontSize: '11px', color: '#6b7280' }}>
              Click bars for details
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '12px' }}>
            {weeklyData.map((day, i) => (
              <div 
                key={day.day} 
                style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}
                onClick={() => handleBarClick(day)}
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${day.hours * 12}px` }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  whileHover={{ 
                    scaleX: 1.05,
                    background: 'linear-gradient(180deg, #ec4899, #a855f7)',
                    boxShadow: '0 0 15px rgba(168,85,247,0.5)'
                  }}
                  style={{
                    height: `${day.hours * 12}px`,
                    background: 'linear-gradient(180deg, #a855f7, #ec4899)',
                    borderRadius: '8px',
                    marginBottom: '8px',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.2s'
                  }}
                />
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>{day.day}</div>
                <div style={{ fontSize: '10px', color: '#a855f7' }}>{day.hours}h</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #2a2a2a' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>39</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Total hours this week</div>
              </div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#4ade80' }}>+23%</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>vs last week</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            background: 'linear-gradient(135deg, #1a1a1a, #0a0a0a)',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <Award size={24} style={{ color: '#f59e0b' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>Recent Achievements</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {achievements.map((achievement, i) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ x: 5, scale: 1.02 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '12px',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  background: `${achievement.color}20`,
                  padding: '10px',
                  borderRadius: '10px'
                }}>
                  <achievement.icon size={20} style={{ color: achievement.color }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'white' }}>{achievement.title}</div>
                  <div style={{ fontSize: '10px', color: '#6b7280' }}>{achievement.date}</div>
                </div>
                <div style={{ fontSize: '12px', color: achievement.color }}>+{achievement.points} pts</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            background: 'linear-gradient(135deg, #1a1a1a, #0a0a0a)',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(255,255,255,0.1)',
            gridColumn: 'span 2'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <Calendar size={24} style={{ color: '#ec4899' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>Upcoming Tasks</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '12px' }}>
            {upcomingTasks.map((task, i) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                whileHover={{ scale: 1.02 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '12px',
                  border: `1px solid ${task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#f59e0b' : '#10b981'}20`,
                  cursor: 'pointer'
                }}
              >
                <div>
                  <div style={{ fontSize: '14px', color: 'white', marginBottom: '4px' }}>{task.task}</div>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: '#6b7280' }}>
                    <span>📅 Due: {task.due}</span>
                    <span>⏱️ {task.time}</span>
                  </div>
                </div>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#f59e0b' : '#10b981'
                }} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}