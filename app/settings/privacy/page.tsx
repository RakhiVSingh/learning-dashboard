'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, Users, Globe, Search, ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
  const [settings, setSettings] = useState({
    profileVisibility: 'public',
    showActivity: true,
    showProgress: true,
    allowMessages: true,
    searchable: true
  })

  const handleSave = () => {
    alert('Privacy settings saved successfully!')
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
          maxWidth: '600px',
          margin: '0 auto',
          background: 'linear-gradient(135deg, #1a1a1a, #0a0a0a)',
          borderRadius: '24px',
          padding: '32px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <Eye size={28} style={{ color: '#a855f7' }} />
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Privacy Settings</h2>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', color: '#9ca3af', marginBottom: '8px', fontSize: '14px' }}>
            Profile Visibility
          </label>
          <select
            value={settings.profileVisibility}
            onChange={(e) => setSettings({ ...settings, profileVisibility: e.target.value })}
            style={{
              width: '100%',
              padding: '12px',
              background: '#2a2a2a',
              border: '1px solid #444',
              borderRadius: '12px',
              color: 'white',
              fontSize: '14px'
            }}
          >
            <option value="public">Public - Anyone can see</option>
            <option value="private">Private - Only me</option>
            <option value="friends">Friends only</option>
          </select>
        </div>

        {[
          { key: 'showActivity', label: 'Show Activity Status', icon: Users, desc: 'Let others see when you are active' },
          { key: 'showProgress', label: 'Show Learning Progress', icon: Eye, desc: 'Share your course progress with others' },
          { key: 'allowMessages', label: 'Allow Direct Messages', icon: Globe, desc: 'Receive messages from other learners' },
          { key: 'searchable', label: 'Searchable by Email', icon: Search, desc: 'Allow others to find you by email' }
        ].map((item) => (
          <div key={item.key} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 0',
            borderBottom: '1px solid #2a2a2a'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <item.icon size={20} style={{ color: '#a855f7' }} />
              <div>
                <div style={{ color: 'white', fontSize: '14px' }}>{item.label}</div>
                <div style={{ color: '#6b7280', fontSize: '11px' }}>{item.desc}</div>
              </div>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '22px' }}>
              <input
                type="checkbox"
                checked={settings[item.key as keyof typeof settings] as boolean}
                onChange={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof typeof settings] })}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: settings[item.key as keyof typeof settings] ? '#a855f7' : '#2a2a2a',
                transition: '0.3s',
                borderRadius: '22px'
              }}>
                <span style={{
                  position: 'absolute',
                  height: '16px',
                  width: '16px',
                  left: settings[item.key as keyof typeof settings] ? '24px' : '4px',
                  bottom: '3px',
                  backgroundColor: 'white',
                  transition: '0.3s',
                  borderRadius: '50%'
                }} />
              </span>
            </label>
          </div>
        ))}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          style={{
            width: '100%',
            marginTop: '24px',
            padding: '14px',
            background: 'linear-gradient(135deg, #a855f7, #ec4899)',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <Save size={16} /> Save Settings
        </motion.button>
      </motion.div>
    </div>
  )
}