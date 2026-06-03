'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { motion } from 'framer-motion'
import { BookOpen, Clock, Award, ChevronRight, Calendar, Target } from 'lucide-react'

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    async function fetchCourses() {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (!error && data) {
        setCourses(data)
      }
      setLoading(false)
    }
    
    fetchCourses()
  }, [])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'black', padding: '32px' }}>
        <p style={{ color: 'white' }}>Loading courses...</p>
      </div>
    )
  }

  // Color schemes for different cards
  const colorSchemes = [
    { primary: '#a855f7', secondary: '#ec4899', bg: 'rgba(168,85,247,0.1)' },
    { primary: '#3b82f6', secondary: '#06b6d4', bg: 'rgba(59,130,246,0.1)' },
    { primary: '#f59e0b', secondary: '#ef4444', bg: 'rgba(245,158,11,0.1)' },
    { primary: '#10b981', secondary: '#14b8a6', bg: 'rgba(16,185,129,0.1)' },
    { primary: '#8b5cf6', secondary: '#d946ef', bg: 'rgba(139,92,246,0.1)' },
  ]

  const getStatusMessage = (progress: number) => {
    if (progress < 30) return { text: 'Just Started', icon: '🚀', color: '#f59e0b' }
    if (progress < 70) return { text: 'In Progress', icon: '📖', color: '#3b82f6' }
    if (progress < 100) return { text: 'Almost Done', icon: '🔥', color: '#a855f7' }
    return { text: 'Completed', icon: '🎉', color: '#10b981' }
  }

  const getEstimatedHours = (progress: number) => {
    const totalHours = 40
    const remaining = totalHours - (totalHours * progress / 100)
    return Math.ceil(remaining)
  }

  const handleCardClick = (course: any) => {
    alert(`📚 ${course.title}\n\nProgress: ${course.progress}%\nEstimated remaining: ${getEstimatedHours(course.progress)} hours\n\nContinue your learning journey!`)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'black', padding: '32px' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '32px' }}
      >
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
          All Courses 📚
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '18px' }}>
          Continue your learning journey. {courses.length} courses available.
        </p>
      </motion.div>

      {/* Courses Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', 
        gap: '24px' 
      }}>
        {courses.map((course, index) => {
          const colors = colorSchemes[index % colorSchemes.length]
          const status = getStatusMessage(course.progress)
          const isHovered = hoveredCard === index
          const estimatedHours = getEstimatedHours(course.progress)

          return (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(course)}
              style={{
                background: `linear-gradient(135deg, #1a1a1a, #0a0a0a)`,
                borderRadius: '20px',
                border: `1px solid ${isHovered ? colors.primary : 'rgba(255,255,255,0.1)'}`,
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Hover Glow Effect */}
              <motion.div
                animate={{
                  opacity: isHovered ? 1 : 0,
                }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(circle at 50% 50%, ${colors.primary}20, transparent)`,
                  borderRadius: '20px',
                  pointerEvents: 'none'
                }}
              />

              <div style={{ padding: '24px', position: 'relative', zIndex: 1 }}>
                {/* Header with Icon and Status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <motion.div
                    animate={{
                      rotate: isHovered ? 360 : 0,
                      scale: isHovered ? 1.1 : 1
                    }}
                    transition={{ duration: 0.5 }}
                    style={{
                      background: colors.bg,
                      padding: '12px',
                      borderRadius: '16px',
                      display: 'inline-flex'
                    }}
                  >
                    <BookOpen size={28} style={{ color: colors.primary }} />
                  </motion.div>
                  
                  <div style={{
                    background: `${status.color}20`,
                    padding: '6px 12px',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span style={{ fontSize: '14px' }}>{status.icon}</span>
                    <span style={{ fontSize: '12px', color: status.color, fontWeight: 'bold' }}>
                      {status.text}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>
                  {course.title}
                </h3>

                {/* Progress Section */}
                <div style={{ marginTop: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>Course Progress</span>
                    <motion.span 
                      animate={{ scale: isHovered ? 1.1 : 1 }}
                      style={{ fontSize: '14px', fontWeight: 'bold', color: colors.primary }}
                    >
                      {course.progress}%
                    </motion.span>
                  </div>
                  <div style={{
                    height: '8px',
                    background: '#2a2a2a',
                    borderRadius: '10px',
                    overflow: 'hidden'
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 0.8 }}
                      style={{
                        height: '100%',
                        background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                        borderRadius: '10px'
                      }}
                    />
                  </div>
                </div>

                {/* Additional Info - Shows on Hover */}
                <motion.div
                  animate={{
                    height: isHovered ? 'auto' : 0,
                    opacity: isHovered ? 1 : 0,
                    marginTop: isHovered ? '20px' : 0
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={14} style={{ color: '#6b7280' }} />
                      <div>
                        <div style={{ fontSize: '10px', color: '#6b7280' }}>Est. Remaining</div>
                        <div style={{ fontSize: '14px', color: 'white', fontWeight: 'bold' }}>
                          {estimatedHours} hours
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Target size={14} style={{ color: '#6b7280' }} />
                      <div>
                        <div style={{ fontSize: '10px', color: '#6b7280' }}>Next Milestone</div>
                        <div style={{ fontSize: '14px', color: 'white', fontWeight: 'bold' }}>
                          {Math.ceil(course.progress / 10) * 10}%
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Award size={14} style={{ color: '#6b7280' }} />
                      <div>
                        <div style={{ fontSize: '10px', color: '#6b7280' }}>Points Earned</div>
                        <div style={{ fontSize: '14px', color: 'white', fontWeight: 'bold' }}>
                          {course.progress * 10}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar size={14} style={{ color: '#6b7280' }} />
                      <div>
                        <div style={{ fontSize: '10px', color: '#6b7280' }}>Last Active</div>
                        <div style={{ fontSize: '14px', color: 'white', fontWeight: 'bold' }}>Today</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Continue Button */}
                <motion.div
                  animate={{
                    opacity: isHovered ? 1 : 0.7,
                    y: isHovered ? 0 : 5
                  }}
                  transition={{ duration: 0.2 }}
                  style={{
                    marginTop: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 0 0 0'
                  }}
                >
                  <span style={{ fontSize: '13px', color: colors.primary }}>
                    Click to continue learning
                  </span>
                  <motion.div
                    animate={{ x: isHovered ? 5 : 0 }}
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                      padding: '8px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <ChevronRight size={16} style={{ color: 'white' }} />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}