'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import * as Icons from 'lucide-react'

const getIcon = (iconName: string) => {
  const Icon = (Icons as any)[iconName]
  return Icon || Icons.BookOpen
}

export default function CourseCard({ course, index }: { course: any; index: number }) {
  const [progress, setProgress] = useState(0)
  const Icon = getIcon(course.icon_name)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(course.progress)
    }, 100 * index)
    return () => clearTimeout(timer)
  }, [course.progress, index])

  const handleClick = () => {
    alert(`Course: ${course.title}\nProgress: ${course.progress}%`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      onClick={handleClick}
      style={{
        background: 'linear-gradient(135deg, #1a1a1a, #0a0a0a)',
        borderRadius: '20px',
        padding: '20px',
        border: '1px solid rgba(168,85,247,0.2)',
        cursor: 'pointer'
      }}
    >
      <Icon size={32} style={{ color: '#a855f7', marginBottom: '16px' }} />
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
        {course.title}
      </h3>
      <div style={{ marginTop: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
          <span style={{ color: '#9ca3af' }}>Progress</span>
          <span style={{ color: '#a855f7', fontWeight: 'bold' }}>{progress}%</span>
        </div>
        <div style={{ height: '8px', background: '#2a2a2a', borderRadius: '9999px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #a855f7, #ec4899)',
              borderRadius: '9999px'
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}