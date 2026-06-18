import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)
  const timerRef = useRef(null)

  const showToast = useCallback((message) => {
    setToast(message)
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setToast(null), 3200)
  }, [])

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 z-[200] -translate-x-1/2 rounded-full border border-amber-300/30 bg-slate-900/95 px-5 py-3 text-sm font-semibold text-amber-100 shadow-2xl shadow-black/40 backdrop-blur-xl"
          role="status"
        >
          {toast}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }

  return context
}
