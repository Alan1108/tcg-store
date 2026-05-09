'use client'

import { useState } from 'react'
import { X, Eye, EyeOff, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { syncMedusaTokenAction } from '@/services/auth.service'
import { useAuth, type AuthModalTab } from '@/providers/auth'

const GOOGLE_ICON = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
  </svg>
)

interface FieldError {
  email?: string
  password?: string
  confirmPassword?: string
  firstName?: string
  lastName?: string
  form?: string
}

export function AuthModal() {
  const { authModalOpen, authModalTab, closeAuthModal, openAuthModal, refreshCustomer } = useAuth()
  const [tab, setTab] = useState<AuthModalTab>(authModalTab)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<FieldError>({})

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const supabase = createSupabaseBrowserClient()

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setFirstName('')
    setLastName('')
    setErrors({})
    setShowPassword(false)
  }

  const switchTab = (t: AuthModalTab) => {
    setTab(t)
    openAuthModal(t)
    resetForm()
  }

  const handleClose = () => {
    closeAuthModal()
    resetForm()
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setErrors({ form: error.message })
      setLoading(false)
      return
    }

    if (data.user) {
      const meta = data.user.user_metadata ?? {}
      await syncMedusaTokenAction(data.user.id, email, meta.first_name, meta.last_name)
      await refreshCustomer()
    }

    setLoading(false)
    handleClose()
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const errs: FieldError = {}
    if (!firstName.trim()) errs.firstName = 'Requerido'
    if (!lastName.trim()) errs.lastName = 'Requerido'
    if (password !== confirmPassword) errs.confirmPassword = 'Las contraseñas no coinciden'
    if (password.length < 6) errs.password = 'Mínimo 6 caracteres'
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { first_name: firstName, last_name: lastName } },
    })

    if (error) {
      setErrors({ form: error.message })
      setLoading(false)
      return
    }

    if (data.user) {
      await syncMedusaTokenAction(data.user.id, email, firstName, lastName)
      await refreshCustomer()
    }

    setLoading(false)
    handleClose()
  }

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true)
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  if (!authModalOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={handleClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-[var(--bg-surface)] rounded-2xl w-full max-w-[420px] flex flex-col shadow-2xl">

          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-4">
            <div className="flex items-center gap-2.5">
              <Image src="/logo-principal-celeste.png" width={24} height={24} alt="Kādo Gallery" />
              <span className="font-heading text-lg font-bold text-text-primary">Kādo Gallery</span>
            </div>
            <button
              onClick={handleClose}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-bg-elevated hover:bg-[var(--border)] transition-colors"
            >
              <X className="w-4 h-4 text-text-primary" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[var(--border)] px-5">
            {(['login', 'register'] as const).map((t) => (
              <button
                key={t}
                onClick={() => switchTab(t)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  tab === t
                    ? 'text-accent-primary border-accent-primary'
                    : 'text-text-secondary border-transparent hover:text-text-primary'
                }`}
              >
                {t === 'login' ? 'Iniciar sesión' : 'Registrarse'}
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="px-5 py-5 flex flex-col gap-4">
            {tab === 'login' ? (
              <form onSubmit={handleSignIn} className="flex flex-col gap-3">
                <Field
                  label="Correo electrónico"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="tu@email.com"
                  error={errors.email}
                  required
                />
                <PasswordField
                  label="Contraseña"
                  value={password}
                  onChange={setPassword}
                  show={showPassword}
                  onToggle={() => setShowPassword((s) => !s)}
                  error={errors.password}
                  required
                />
                {errors.form && (
                  <p className="text-xs text-[var(--danger)]">{errors.form}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 h-11 rounded-lg bg-accent-primary hover:bg-[var(--accent-primary-hover)] disabled:opacity-50 transition-colors text-sm font-semibold text-white mt-1"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Ingresar
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignUp} className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="Nombre"
                    value={firstName}
                    onChange={setFirstName}
                    placeholder="Juan"
                    error={errors.firstName}
                    required
                  />
                  <Field
                    label="Apellido"
                    value={lastName}
                    onChange={setLastName}
                    placeholder="Pérez"
                    error={errors.lastName}
                    required
                  />
                </div>
                <Field
                  label="Correo electrónico"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="tu@email.com"
                  error={errors.email}
                  required
                />
                <PasswordField
                  label="Contraseña"
                  value={password}
                  onChange={setPassword}
                  show={showPassword}
                  onToggle={() => setShowPassword((s) => !s)}
                  error={errors.password}
                  required
                />
                <Field
                  label="Confirmar contraseña"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  placeholder="Repite tu contraseña"
                  error={errors.confirmPassword}
                  required
                />
                {errors.form && (
                  <p className="text-xs text-[var(--danger)]">{errors.form}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 h-11 rounded-lg bg-accent-primary hover:bg-[var(--accent-primary-hover)] disabled:opacity-50 transition-colors text-sm font-semibold text-white mt-1"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Crear cuenta
                </button>
              </form>
            )}

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[var(--border)]" />
              <span className="text-xs text-text-muted">o</span>
              <div className="flex-1 h-px bg-[var(--border)]" />
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="flex items-center justify-center gap-2.5 h-11 w-full rounded-lg border border-black bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors text-sm font-medium text-text-primary"
            >
              {googleLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : GOOGLE_ICON}
              Continuar con Google
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

function Field({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required,
}: {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  error?: string
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-text-primary">
        {label}
        {required && <span className="text-[var(--danger)]"> *</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`h-11 rounded-lg bg-white border ${
          error ? 'border-[var(--danger)]' : 'border-black'
        } px-3.5 text-sm text-text-primary placeholder:text-text-muted outline-none w-full`}
      />
      {error && <span className="text-xs text-[var(--danger)]">{error}</span>}
    </div>
  )
}

function PasswordField({
  label,
  value,
  onChange,
  show,
  onToggle,
  error,
  required,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  show: boolean
  onToggle: () => void
  error?: string
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-text-primary">
        {label}
        {required && <span className="text-[var(--danger)]"> *</span>}
      </label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="••••••••"
          required={required}
          className={`h-11 rounded-lg bg-white border ${
            error ? 'border-[var(--danger)]' : 'border-black'
          } px-3.5 pr-10 text-sm text-text-primary placeholder:text-text-muted outline-none w-full`}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {error && <span className="text-xs text-[var(--danger)]">{error}</span>}
    </div>
  )
}
