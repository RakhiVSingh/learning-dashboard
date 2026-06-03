'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from './Sidebar'
import HeroTile from './HeroTile'
import CourseCard from './CourseCard'
import ActivityTile from './ActivityTile'

export default function DashboardClient({ courses }: { courses: any[] }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const router = useRouter()

  // Auto-refresh when coming back to this page
  useEffect(() => {
    router.refresh()
  }, [])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'black' }}>
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      
      <main style={{ flex: 1, padding: '24px', overflow: 'auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <HeroTile userName="Student" streak={7} />
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '24px',
          marginBottom: '24px'
        }}>
          {courses && courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>

        <div>
          <ActivityTile />
        </div>
      </main>
    </div>
  )
}