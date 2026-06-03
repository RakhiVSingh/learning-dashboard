'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  User, Bell, Lock, Palette, Globe, Volume2, 
  Eye, Moon, Sun, Monitor, ChevronRight, 
  Shield, Database, LogOut, Trash2, Save,
  Mail, Phone, MapPin, Calendar, Edit2
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [soundEffects, setSoundEffects] = useState(false)
  const [autoPlay, setAutoPlay] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)

  const [profile, setProfile] = useState({
    name: 'Student',
    email: 'student@learnhub.com',
    phone: '+1 234 567 8900',
    location: 'San Francisco, CA',
    joinDate: 'January 2026',
    bio: 'Passionate learner exploring React, Next.js, and modern web technologies.'
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editProfile, setEditProfile] = useState(profile)

  const handleSave = () => {
    setProfile(editProfile)
    setIsEditing(false)
    alert('Profile updated successfully!')
  }

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      alert('Logged out successfully!')
      router.push('/')
    }
  }

  const handleDeleteAccount = () => {
    if (confirm('WARNING: This action cannot be undone! Are you sure you want to delete your account?')) {
      alert('Account deleted. Redirecting...')
      router.push('/')
    }
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
          Settings ⚙️
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '18px' }}>
          Manage your account preferences and application settings
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
        
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: 'linear-gradient(135deg, #1a1a1a, #0a0a0a)',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <User size={24} style={{ color: '#a855f7' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>Profile Information</h3>
            </div>
            {!isEditing ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setEditProfile(profile)
                  setIsEditing(true)
                }}
                style={{
                  background: 'rgba(168,85,247,0.1)',
                  border: '1px solid rgba(168,85,247,0.3)',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  color: '#a855f7',
                  cursor: 'pointer',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Edit2 size={14} /> Edit Profile
              </motion.button>
            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsEditing(false)}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid #333',
                    padding: '8px 16px',
                    borderRadius: '10px',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleSave}
                  style={{
                    background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '10px',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Save size={14} /> Save
                </motion.button>
              </div>
            )}
          </div>

          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #a855f7, #ec4899)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px'
            }}>
              <User size={40} style={{ color: 'white' }} />
            </div>
            {!isEditing ? (
              <>
                <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>{profile.name}</h4>
                <p style={{ fontSize: '12px', color: '#a855f7' }}>Premium Student</p>
              </>
            ) : (
              <input
                type="text"
                value={editProfile.name}
                onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                style={{
                  background: '#2a2a2a',
                  border: '1px solid #a855f7',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  color: 'white',
                  fontSize: '16px',
                  textAlign: 'center',
                  width: '100%'
                }}
              />
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { icon: Mail, label: 'Email', value: profile.email, editKey: 'email' },
              { icon: Phone, label: 'Phone', value: profile.phone, editKey: 'phone' },
              { icon: MapPin, label: 'Location', value: profile.location, editKey: 'location' },
              { icon: Calendar, label: 'Joined', value: profile.joinDate, editKey: 'joinDate' }
            ].map((field) => (
              <div key={field.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0' }}>
                <field.icon size={18} style={{ color: '#6b7280' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', color: '#6b7280' }}>{field.label}</div>
                  {!isEditing ? (
                    <div style={{ fontSize: '14px', color: 'white' }}>{field.value}</div>
                  ) : (
                    <input
                      type="text"
                      value={editProfile[field.editKey as keyof typeof editProfile]}
                      onChange={(e) => setEditProfile({ ...editProfile, [field.editKey]: e.target.value })}
                      style={{
                        background: '#2a2a2a',
                        border: '1px solid #444',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '14px',
                        width: '100%'
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {!isEditing && (
            <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(168,85,247,0.05)', borderRadius: '12px' }}>
              <p style={{ fontSize: '12px', color: '#9ca3af' }}>{profile.bio}</p>
            </div>
          )}
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: 'linear-gradient(135deg, #1a1a1a, #0a0a0a)',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Palette size={24} style={{ color: '#ec4899' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>Preferences</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { icon: Moon, label: 'Dark Mode', description: 'Switch between light and dark theme', value: darkMode, setValue: setDarkMode, disabled: true },
              { icon: Bell, label: 'Push Notifications', description: 'Receive notifications about your progress', value: notifications, setValue: setNotifications },
              { icon: Volume2, label: 'Sound Effects', description: 'Play sounds for achievements and reminders', value: soundEffects, setValue: setSoundEffects },
              { icon: Play, label: 'Auto-play Videos', description: 'Automatically start course videos', value: autoPlay, setValue: setAutoPlay },
              { icon: Mail, label: 'Email Alerts', description: 'Get weekly progress reports via email', value: emailAlerts, setValue: setEmailAlerts }
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <item.icon size={20} style={{ color: item.disabled ? '#6b7280' : '#a855f7' }} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: item.disabled ? '#6b7280' : 'white' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '11px', color: '#6b7280' }}>{item.description}</div>
                  </div>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
                  <input
                    type="checkbox"
                    checked={item.value}
                    onChange={() => !item.disabled && item.setValue(!item.value)}
                    disabled={item.disabled}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: item.disabled ? 'not-allowed' : 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: item.value ? '#a855f7' : '#2a2a2a',
                    transition: '0.3s',
                    borderRadius: '24px',
                    opacity: item.disabled ? 0.5 : 1
                  }}>
                    <span style={{
                      position: 'absolute',
                      height: '18px',
                      width: '18px',
                      left: item.value ? '28px' : '4px',
                      bottom: '3px',
                      backgroundColor: 'white',
                      transition: '0.3s',
                      borderRadius: '50%'
                    }} />
                  </span>
                </label>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Security - NOW WITH WORKING LINKS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            background: 'linear-gradient(135deg, #1a1a1a, #0a0a0a)',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Shield size={24} style={{ color: '#10b981' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>Security</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link href="/settings/change-password" style={{ textDecoration: 'none', width: '100%' }}>
              <motion.div
                whileHover={{ x: 5 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Lock size={18} style={{ color: '#a855f7' }} />
                  <span style={{ color: 'white', fontSize: '14px' }}>Change Password</span>
                </div>
                <ChevronRight size={16} style={{ color: '#6b7280' }} />
              </motion.div>
            </Link>

            <Link href="/settings/two-factor" style={{ textDecoration: 'none', width: '100%' }}>
              <motion.div
                whileHover={{ x: 5 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Shield size={18} style={{ color: '#a855f7' }} />
                  <span style={{ color: 'white', fontSize: '14px' }}>Two-Factor Authentication</span>
                </div>
                <ChevronRight size={16} style={{ color: '#6b7280' }} />
              </motion.div>
            </Link>

            <Link href="/settings/privacy" style={{ textDecoration: 'none', width: '100%' }}>
              <motion.div
                whileHover={{ x: 5 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Eye size={18} style={{ color: '#a855f7' }} />
                  <span style={{ color: 'white', fontSize: '14px' }}>Privacy Settings</span>
                </div>
                <ChevronRight size={16} style={{ color: '#6b7280' }} />
              </motion.div>
            </Link>

            <Link href="/settings/data-export" style={{ textDecoration: 'none', width: '100%' }}>
              <motion.div
                whileHover={{ x: 5 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Database size={18} style={{ color: '#a855f7' }} />
                  <span style={{ color: 'white', fontSize: '14px' }}>Data Export</span>
                </div>
                <ChevronRight size={16} style={{ color: '#6b7280' }} />
              </motion.div>
            </Link>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #2a2a2a' }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: '12px',
                color: '#ef4444',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '14px'
              }}
            >
              <LogOut size={16} /> Log Out
            </motion.button>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            background: 'linear-gradient(135deg, #1a1a1a, #0a0a0a)',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(239,68,68,0.3)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Trash2 size={24} style={{ color: '#ef4444' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ef4444' }}>Danger Zone</h3>
          </div>

          <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '20px' }}>
            Once you delete your account, there is no going back. All your data will be permanently removed.
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={handleDeleteAccount}
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '12px',
              color: '#ef4444',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Delete Account
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

// Play icon for auto-play videos
const Play = ({ size, style }: { size: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
)