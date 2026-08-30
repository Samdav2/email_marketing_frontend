'use client'

import { Toaster } from 'react-hot-toast'

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#0f172a',
          color: '#f8fafc',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
          padding: '12px 16px',
          fontSize: '14px',
        },
        success: {
          iconTheme: {
            primary: '#10b981',
            secondary: '#0f172a',
          },
        },
        error: {
          iconTheme: {
            primary: '#f43f5e',
            secondary: '#0f172a',
          },
        },
      }}
    />
  )
}
