'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Smartphone, Mail, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function TwoFactorPage() {
  const [method, setMethod] = useState<'sms' | 'email' | null>(null)
  const [verified, setVerified] = useState(false)

  const handleEnable = () => {
    setVerified(true)
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
          <Shield size={28} style={{ color: '#a855f7' }} />
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Two-Factor Authentication</h2>
        </div>

        {verified ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            background: 'rgba(16,185,129,0.1)',
            borderRadius: '16px',
            border: '1px solid #10b981'
          }}>
            <CheckCircle size={48} style={{ color: '#10b981', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', color: 'white', marginBottom: '8px' }}>2FA Enabled!</h3>
            <p style={{ fontSize: '13px', color: '#9ca3af' }}>
              Your account is now more secure. You'll need a verification code to log in.
            </p>
          </div>
        ) : (
          <>
            <p style={{ color: '#9ca3af', marginBottom: '24px', fontSize: '14px' }}>
              Add an extra layer of security to your account by requiring a verification code.
            </p>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ color: 'white', marginBottom: '16px', fontSize: '16px' }}>Choose verification method:</h3>
              
              <div
                onClick={() => setMethod('sms')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  background: method === 'sms' ? 'rgba(168,85,247,0.1)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${method === 'sms' ? '#a855f7' : '#333'}`,
                  borderRadius: '12px',
                  marginBottom: '12px',
                  cursor: 'pointer'
                }}
              >
                <Smartphone size={24} style={{ color: method === 'sms' ? '#a855f7' : '#6b7280' }} />
                <div>
                  <div style={{ color: 'white', fontSize: '14px' }}>SMS</div>
                  <div style={{ color: '#6b7280', fontSize: '12px' }}>Receive codes via text message</div>
                </div>
              </div>

              <div
                onClick={() => setMethod('email')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  background: method === 'email' ? 'rgba(168,85,247,0.1)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${method === 'email' ? '#a855f7' : '#333'}`,
                  borderRadius: '12px',
                  cursor: 'pointer'
                }}
              >
                <Mail size={24} style={{ color: method === 'email' ? '#a855f7' : '#6b7280' }} />
                <div>
                  <div style={{ color: 'white', fontSize: '14px' }}>Email</div>
                  <div style={{ color: '#6b7280', fontSize: '12px' }}>Receive codes via email</div>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleEnable}
              disabled={!method}
              style={{
                width: '100%',
                padding: '14px',
                background: method ? 'linear-gradient(135deg, #a855f7, #ec4899)' : '#2a2a2a',
                border: 'none',
                borderRadius: '12px',
                color: method ? 'white' : '#6b7280',
                fontWeight: 'bold',
                cursor: method ? 'pointer' : 'not-allowed'
              }}
            >
              Enable 2FA
            </motion.button>
          </>
        )}
      </motion.div>
    </div>
  )
}