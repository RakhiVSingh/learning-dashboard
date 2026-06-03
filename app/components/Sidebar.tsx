'use client'
import { motion } from 'framer-motion'
import { LayoutDashboard, BookOpen, Activity, Settings, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Sidebar({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: (val: boolean) => void }) {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { id: '/', label: 'Dashboard', icon: LayoutDashboard },
    { id: '/courses', label: 'Courses', icon: BookOpen },
    { id: '/activity', label: 'Activity', icon: Activity },
    { id: '/settings', label: 'Settings', icon: Settings },
  ]

  const handleNavigation = (path: string) => {
    if (pathname === path) {
      // If already on the page, force refresh
      router.refresh()
    } else {
      router.push(path)
    }
  }

  return (
    <motion.nav
      initial={{ width: 260 }}
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{
        backgroundColor: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(12px)',
        borderRight: '1px solid rgba(255,255,255,0.1)',
        padding: '20px 16px',
        position: 'relative',
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
        {!collapsed ? (
          <h2 style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>LearnHub</h2>
        ) : (
          <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #a855f7, #ec4899)', borderRadius: 8 }} />
        )}
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                borderRadius: '12px',
                width: '100%',
                cursor: 'pointer',
                position: 'relative',
                backgroundColor: isActive ? 'rgba(168,85,247,0.1)' : 'transparent',
                border: 'none',
                color: isActive ? '#a855f7' : '#9ca3af'
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2))',
                    borderRadius: '12px'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Icon size={20} style={{ position: 'relative', zIndex: 1 }} />
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ position: 'relative', zIndex: 1, fontSize: '14px' }}
                >
                  {item.label}
                </motion.span>
              )}
            </button>
          )
        })}
      </div>
      
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: 'absolute',
          bottom: '20px',
          right: collapsed ? '50%' : '20px',
          transform: collapsed ? 'translateX(50%)' : 'none',
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
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
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </motion.nav>
  )
}