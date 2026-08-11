import { useEffect, useState } from 'react'

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        right: 24,
        bottom: 32,
        zIndex: 9999,
        display: visible ? 'block' : 'none',
        background: '#0ea5a4',
        color: '#fff',
        border: 'none',
        borderRadius: '20%',
        width: 40,
        height: 40,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        cursor: 'pointer',
        fontSize: 24,
        transition: 'opacity 0.2s',
        opacity: visible ? 1 : 0
      }}
      aria-label="Back to top"
      title="Back to top"
    >
      ↑
    </button>
  )
}
