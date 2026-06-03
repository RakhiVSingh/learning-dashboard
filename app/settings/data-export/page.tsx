'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Database, Download, FileText, ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function DataExportPage() {
  const [exporting, setExporting] = useState(false)
  const [exported, setExported] = useState(false)

  const handleExport = () => {
    setExporting(true)
    setTimeout(() => {
      setExporting(false)
      setExported(true)
      // Simulate data download
      const data = {
        user: { name: 'Student', email: 'student@learnhub.com', joinDate: '2026-01-01' },
        courses: [
          { title: 'Advanced React Patterns', progress: 75 },
          { title: 'TypeScript Mastery', progress: 45 },
          { title: 'UI Animation Fundamentals', progress: 90 }
        ],
        activity: { totalHours: 47, streak: 7, achievements: 8 }
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'learnhub-data.json'
      a.click()
      URL.revokeObjectURL(url)
      setTimeout(() => setExported(false), 3000)
    }, 2000)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'black', padding: '32px' }}>
      <Link href="/settings">
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'transparent',
          border: 'none',
          color: '#a855f7',
          cursor: 'pointer',
          marginBottom: '24px',
          fontSize: '14px'
        }}>
          <ArrowLeft size={16} /> Back to Settings
        </button>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          maxWidth: '500px',
          margin: '0 auto',
          background: 'linear-gradient(135deg, #1a1a1a, #0a0a0a)',
          borderRadius: '24px',
          padding: '32px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <Database size={28} style={{ color: '#a855f7' }} />
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Data Export</h2>
        </div>

        <p style={{ color: '#9ca3af', marginBottom: '24px', fontSize: '14px' }}>
          Export all your learning data including course progress, activity history, and achievements.
        </p>

        <div style={{
          background: 'rgba(168,85,247,0.05)',
          padding: '16px',
          borderRadius: '12px',
          marginBottom: '24px',
          border: '1px solid rgba(168,85,247,0.2)'
        }}>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
            <FileText size={20} style={{ color: '#a855f7' }} />
            <div>
              <div style={{ color: 'white', fontSize: '14px' }}>Your data includes:</div>
              <ul style={{ marginTop: '8px', listStyle: 'none', padding: 0 }}>
                <li style={{ color: '#6b7280', fontSize: '12px', marginBottom: '4px' }}>• Profile information</li>
                <li style={{ color: '#6b7280', fontSize: '12px', marginBottom: '4px' }}>• Course progress (5 courses)</li>
                <li style={{ color: '#6b7280', fontSize: '12px', marginBottom: '4px' }}>• Learning activity (47 hours)</li>
                <li style={{ color: '#6b7280', fontSize: '12px' }}>• Achievement history (8 badges)</li>
              </ul>
            </div>
          </div>
        </div>

        {exported && (
          <div style={{
            padding: '12px',
            borderRadius: '12px',
            marginBottom: '20px',
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid #10b981',
            color: '#10b981',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle size={16} /> Data exported successfully! Check your downloads folder.
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExport}
          disabled={exporting}
          style={{
            width: '100%',
            padding: '14px',
            background: 'linear-gradient(135deg, #a855f7, #ec4899)',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            fontWeight: 'bold',
            cursor: exporting ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            opacity: exporting ? 0.7 : 1
          }}
        >
          {exporting ? (
            <>Exporting...</>
          ) : (
            <><Download size={16} /> Export All Data</>
          )}
        </motion.button>

        <p style={{ color: '#6b7280', fontSize: '11px', marginTop: '16px', textAlign: 'center' }}>
          Your data will be downloaded as a JSON file. This may take a few moments.
        </p>
      </motion.div>
    </div>
  )
}