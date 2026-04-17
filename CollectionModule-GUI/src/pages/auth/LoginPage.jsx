import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Alert } from '../../components/ui'
import { useState, useEffect } from 'react'
import { Lock, Mail, ArrowRight, Eye, EyeOff, RotateCcw } from 'lucide-react'

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { login, error } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [captcha, setCaptcha] = useState({})
  const [captchaInput, setCaptchaInput] = useState('')
  const [captchaError, setCaptchaError] = useState('')

  // Generate CAPTCHA image
  const generateCaptcha = (canvasElement) => {
    // Generate random alphanumeric text
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
    let captchaText = ''
    for (let i = 0; i < 6; i++) {
      captchaText += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    if (canvasElement) {
      const ctx = canvasElement.getContext('2d')
      const width = 200
      const height = 60

      // Clear canvas
      ctx.fillStyle = '#f5f5f5'
      ctx.fillRect(0, 0, width, height)

      // Add noise
      for (let i = 0; i < 50; i++) {
        ctx.fillStyle = `rgba(200, 200, 200, ${Math.random() * 0.3})`
        ctx.beginPath()
        ctx.arc(
          Math.random() * width,
          Math.random() * height,
          Math.random() * 2,
          0,
          Math.PI * 2
        )
        ctx.fill()
      }

      // Draw lines
      for (let i = 0; i < 3; i++) {
        ctx.strokeStyle = `rgba(100, 100, 100, ${Math.random() * 0.2})`
        ctx.lineWidth = Math.random() * 2
        ctx.beginPath()
        ctx.moveTo(Math.random() * width, Math.random() * height)
        ctx.lineTo(Math.random() * width, Math.random() * height)
        ctx.stroke()
      }

      // Draw text with distortion
      ctx.font = 'bold 38px Arial'
      ctx.fillStyle = '#1f2937'
      ctx.textBaseline = 'middle'

      for (let i = 0; i < captchaText.length; i++) {
        const x = 20 + i * 28
        const y = height / 2 + (Math.random() - 0.5) * 10
        const angle = (Math.random() - 0.5) * 0.4

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(angle)
        ctx.fillText(captchaText[i], 0, 0)
        ctx.restore()
      }
    }

    setCaptcha({
      text: captchaText,
      answer: captchaText.toLowerCase()
    })
    setCaptchaInput('')
    setCaptchaError('')
  }

  // Initialize CAPTCHA on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const canvas = document.getElementById('captchaCanvas')
      if (canvas) {
        generateCaptcha(canvas)
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  // Validate CAPTCHA
  const validateCaptcha = () => {
    if (!captchaInput) {
      setCaptchaError('Please enter the CAPTCHA')
      return false
    }
    if (captchaInput.toLowerCase() !== captcha.answer) {
      setCaptchaError('Incorrect CAPTCHA. Please try again.')
      const canvas = document.getElementById('captchaCanvas')
      if (canvas) generateCaptcha(canvas)
      return false
    }
    setCaptchaError('')
    return true
  }

  const onSubmit = async (data) => {
    // Validate CAPTCHA first
    if (!validateCaptcha()) {
      return
    }

    setLoading(true)
    try {
      await login(data)
      navigate('/dashboard')
    } catch (err) {
      console.error('Login failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center px-4 py-12 overflow-auto">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary-50/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header - Blue accent bar */}
          <div className="h-1 bg-gradient-to-r from-primary-600 to-primary-500"></div>

          {/* Content */}
          <div className="p-5">
            {/* Logo/Title */}
            <div className="text-center mb-3">
              <div className="inline-block p-3 bg-primary-50 rounded-xl mb-3">
                <Lock className="w-6 h-6 text-primary-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-0.5">
                Collection Module
              </h1>
              {/* <p className="text-gray-500 text-xs">
                CenterBank Asset Management
              </p> */}
            </div>

            {/* Error Alert */}
            {error && (
              <Alert variant="danger" className="mb-5">
                {error}
              </Alert>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              {/* User ID */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  User ID
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter your user ID"
                    className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                    {...register('userId', { required: 'User ID is required' })}
                  />
                </div>
                {errors.userId && (
                  <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                    {errors.userId.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                    {...register('password', { required: 'Password is required' })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* CAPTCHA Verification */}
              <div className="flex items-center gap-2">
                <canvas
                  id="captchaCanvas"
                  width="200"
                  height="60"
                  className="border border-gray-300 rounded bg-gray-50"
                />
                <button
                  type="button"
                  onClick={() => {
                    const canvas = document.getElementById('captchaCanvas')
                    if (canvas) generateCaptcha(canvas)
                  }}
                  className="text-gray-500 hover:text-gray-700 p-1 flex-shrink-0"
                  title="Refresh"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
              <input
                type="text"
                placeholder="Enter CAPTCHA text"
                value={captchaInput}
                onChange={(e) => {
                  setCaptchaInput(e.target.value)
                  setCaptchaError('')
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
              />
              {captchaError && (
                <p className="text-sm text-red-600">
                  {captchaError}
                </p>
              )}

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm pt-2">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 rounded border-gray-300 cursor-pointer"
                    {...register('rememberMe')}
                  />
                  <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-700">
                    Remember me
                  </span>
                </label>
                <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>
                    Login
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}
