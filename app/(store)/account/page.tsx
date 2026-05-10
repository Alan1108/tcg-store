'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Camera, Eye, EyeOff, Loader2, LogOut, MapPin, Package, Plus, Trash2, User, X } from 'lucide-react'
import { useAuth } from '@/providers/auth'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { updateCustomerProfile, getCustomerAddresses, createCustomerAddress, deleteCustomerAddress } from '@/services/customers.service'
import { getCustomerOrders } from '@/services/orders.service'
import { BadgeOrderStatus } from '@/components/atoms'
import { formatPrice } from '@/lib/format'
import type { Order, OrderStatus } from '@/types'
import type { HttpTypes } from '@medusajs/types'

type Tab = 'profile' | 'orders' | 'addresses'

// ─── Reusable field helpers ───────────────────────────────────────────────────

function Field({
  label, type = 'text', value, onChange, placeholder, required,
}: {
  label: string; type?: string; value: string
  onChange: (v: string) => void; placeholder?: string; required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-text-primary">
        {label}{required && <span className="text-danger"> *</span>}
      </label>
      <input
        type={type} value={value} placeholder={placeholder} required={required}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-lg bg-white border border-black px-3.5 text-sm text-text-primary placeholder:text-text-muted outline-none w-full"
      />
    </div>
  )
}

function PasswordField({
  label, value, onChange, show, onToggle, required,
}: {
  label: string; value: string; onChange: (v: string) => void
  show: boolean; onToggle: () => void; required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-text-primary">
        {label}{required && <span className="text-[var(--danger)]"> *</span>}
      </label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'} value={value} placeholder="••••••••" required={required}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 rounded-lg bg-white border border-black px-3.5 pr-10 text-sm text-text-primary placeholder:text-text-muted outline-none w-full"
        />
        <button type="button" onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary">
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}

function Feedback({ success, error }: { success?: string; error?: string }) {
  if (success) return <p className="text-xs text-green-600">{success}</p>
  if (error) return <p className="text-xs text-danger">{error}</p>
  return null
}

// ─── Profile Tab ──────────────────────────────────────────────────────────────

function ProfileTab({ onRefresh }: { onRefresh: () => Promise<void> }) {
  const { customer, user } = useAuth()
  const supabase = createSupabaseBrowserClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const meta = user?.user_metadata ?? {}
  const [firstName, setFirstName] = useState(customer?.first_name ?? meta.first_name ?? '')
  const [lastName, setLastName] = useState(customer?.last_name ?? meta.last_name ?? '')
  const [phone, setPhone] = useState(customer?.phone ?? '')

  // Sync form fields when customer/user data arrives — done during render to avoid
  // the set-state-in-effect rule and prevent a double-render cycle.
  const [prevCustomer, setPrevCustomer] = useState(customer)
  const [prevUser, setPrevUser] = useState(user)
  if (prevCustomer !== customer || prevUser !== user) {
    setPrevCustomer(customer)
    setPrevUser(user)
    setFirstName(customer?.first_name ?? meta.first_name ?? '')
    setLastName(customer?.last_name ?? meta.last_name ?? '')
    setPhone(customer?.phone ?? meta.phone ?? '')
  }
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState<{ ok?: string; err?: string }>({})

  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [changingPw, setChangingPw] = useState(false)
  const [pwMsg, setPwMsg] = useState<{ ok?: string; err?: string }>({})

  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const avatarUrl: string | undefined = user?.user_metadata?.avatar_url
  const initials =
    `${customer?.first_name?.[0] ?? ''}${customer?.last_name?.[0] ?? ''}`.toUpperCase() || '?'

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return
    setUploading(true)
    setUploadError('')
    const ext = file.name.split('.').pop()
    const path = `${user.id}/avatar.${ext}`
    const { error } = await supabase.storage
      .from('avatars')
      .upload(path, file, { upsert: true, contentType: file.type })
    if (error) {
      setUploadError(error.message)
    } else {
      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path)
      await supabase.auth.updateUser({ data: { avatar_url: `${publicUrl}?t=${Date.now()}` } })
      await onRefresh()
    }
    setUploading(false)
    e.target.value = ''
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSaveMsg({})
    const result = await updateCustomerProfile(firstName, lastName, phone)
    if (result.error) {
      setSaveMsg({ err: result.error })
    } else {
      setSaveMsg({ ok: 'Cambios guardados correctamente' })
      await onRefresh()
      setTimeout(() => setSaveMsg({}), 3000)
    }
    setSaving(false)
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPwMsg({})
    if (newPw !== confirmPw) { setPwMsg({ err: 'Las contraseñas no coinciden' }); return }
    if (newPw.length < 6) { setPwMsg({ err: 'Mínimo 6 caracteres' }); return }
    setChangingPw(true)
    const { error } = await supabase.auth.updateUser({ password: newPw })
    if (error) {
      setPwMsg({ err: error.message })
    } else {
      setPwMsg({ ok: 'Contraseña actualizada correctamente' })
      setNewPw('')
      setConfirmPw('')
      setTimeout(() => setPwMsg({}), 3000)
    }
    setChangingPw(false)
  }

  return (
    <div className="flex flex-col gap-5 max-w-2xl w-full">

      {/* Avatar */}
      <div className="flex flex-col items-center gap-2 py-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="relative group focus:outline-none"
          aria-label="Cambiar foto de perfil"
        >
          <div className="w-24 h-24 rounded-full overflow-hidden bg-accent-primary flex items-center justify-center relative">
            {avatarUrl ? (
              <Image src={avatarUrl} alt="Avatar" fill className="object-cover" sizes="96px" />
            ) : (
              <span className="text-2xl font-bold text-white">{initials}</span>
            )}
          </div>
          <div className="absolute inset-0 rounded-full bg-black/45 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            {uploading
              ? <Loader2 className="w-5 h-5 text-white animate-spin" />
              : <Camera className="w-5 h-5 text-white" />}
          </div>
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
        <p className="text-xs text-text-muted">Toca para cambiar foto de perfil</p>
        {uploadError && <p className="text-xs text-[var(--danger)] text-center max-w-xs">{uploadError}</p>}
      </div>

      {/* Personal info */}
      <div className="bg-[var(--bg-surface)] rounded-2xl p-5 flex flex-col gap-4 border border-[var(--border)]">
        <h2 className="text-sm font-semibold text-text-primary">Información Personal</h2>
        <form onSubmit={handleSaveProfile} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Nombre" value={firstName} onChange={setFirstName} required />
            <Field label="Apellido" value={lastName} onChange={setLastName} required />
          </div>
          <Field label="Teléfono" type="tel" value={phone} onChange={setPhone} placeholder="+593 99 999 9999" />
          <Feedback success={saveMsg.ok} error={saveMsg.err} />
          <button
            type="submit" disabled={saving}
            className="flex items-center justify-center gap-2 h-10 rounded-lg bg-accent-primary hover:bg-[var(--accent-primary-hover)] disabled:opacity-50 transition-colors text-sm font-semibold text-white"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Guardar cambios
          </button>
        </form>
      </div>

      {/* Change password */}
      <div className="bg-[var(--bg-surface)] rounded-2xl p-5 flex flex-col gap-4 border border-[var(--border)]">
        <h2 className="text-sm font-semibold text-text-primary">Cambiar Contraseña</h2>
        <form onSubmit={handleChangePassword} className="flex flex-col gap-3">
          <PasswordField label="Nueva contraseña" value={newPw} onChange={setNewPw} show={showPw} onToggle={() => setShowPw(s => !s)} required />
          <PasswordField label="Confirmar contraseña" value={confirmPw} onChange={setConfirmPw} show={showPw} onToggle={() => setShowPw(s => !s)} required />
          <Feedback success={pwMsg.ok} error={pwMsg.err} />
          <button
            type="submit" disabled={changingPw}
            className="flex items-center justify-center gap-2 h-10 rounded-lg bg-accent-primary hover:bg-[var(--accent-primary-hover)] disabled:opacity-50 transition-colors text-sm font-semibold text-white"
          >
            {changingPw && <Loader2 className="w-4 h-4 animate-spin" />}
            Actualizar contraseña
          </button>
        </form>
      </div>

    </div>
  )
}

// ─── Orders Tab ───────────────────────────────────────────────────────────────

function deriveOrderStatus(order: Order): OrderStatus {
  if (order.status === 'canceled') return 'cancelled'
  const fs = order.fulfillment_status as string | undefined
  if (fs === 'delivered' || fs === 'partially_delivered') return 'delivered'
  if (fs === 'shipped' || fs === 'partially_shipped') return 'shipped'
  if (fs === 'fulfilled' || fs === 'partially_fulfilled') return 'processing'
  const ps = order.payment_status as string | undefined
  if (ps === 'captured' || ps === 'partially_captured') return 'processing'
  return 'pending'
}

function OrderCard({ order }: { order: Order }) {
  const status = deriveOrderStatus(order)
  const date = new Date(order.created_at).toLocaleDateString('es-EC', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
  const currency = order.currency_code ?? 'USD'
  const items = order.items ?? []

  return (
    <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-semibold text-text-primary">
            Pedido #{order.display_id ?? order.id.slice(-8).toUpperCase()}
          </span>
          <span className="text-[11px] text-text-muted">{date}</span>
        </div>
        <BadgeOrderStatus status={status} />
      </div>

      <div className="flex flex-col divide-y divide-[var(--border)]">
        {items.map((item) => {
          const img = (item as unknown as Record<string, unknown>).thumbnail as string | undefined
          return (
            <div key={item.id} className="flex items-center gap-3 px-4 py-3">
              <div className="w-12 h-12 rounded-lg bg-bg-elevated flex-shrink-0 relative overflow-hidden">
                {img && <Image src={img} alt={item.title ?? ''} fill className="object-cover" sizes="48px" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-text-primary line-clamp-1">{item.title}</p>
                {item.variant_title && (
                  <p className="text-xs text-text-muted">{item.variant_title}</p>
                )}
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-semibold text-text-primary">
                  {formatPrice(item.unit_price ?? 0, currency)}
                </p>
                <p className="text-xs text-text-muted">×{item.quantity}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-between px-4 py-3 bg-bg-elevated">
        <span className="text-sm text-text-secondary">Total del pedido</span>
        <span className="font-heading text-base font-bold text-accent-primary">
          {formatPrice(order.total ?? 0, currency)}
        </span>
      </div>
    </div>
  )
}

function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCustomerOrders()
      .then(({ data }) => setOrders(data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col gap-4 max-w-2xl w-full">
        {[1, 2].map((i) => (
          <div key={i} className="h-40 rounded-2xl bg-bg-elevated animate-pulse" />
        ))}
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-bg-elevated">
          <Package className="w-6 h-6 text-text-muted" />
        </div>
        <p className="text-sm font-medium text-text-primary">Sin pedidos aún</p>
        <p className="text-xs text-text-muted max-w-xs">
          Cuando realices tu primera compra, aparecerá aquí.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 max-w-2xl w-full">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  )
}

// ─── Addresses Tab ────────────────────────────────────────────────────────────

const EMPTY_ADDR: HttpTypes.StoreCreateCustomerAddress = {
  first_name: '', last_name: '', address_1: '', city: '',
  province: '', postal_code: '', phone: '', country_code: 'ec',
}

function AddressesTab() {
  const [addresses, setAddresses] = useState<HttpTypes.StoreCustomerAddress[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<HttpTypes.StoreCreateCustomerAddress>(EMPTY_ADDR)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    setAddresses(await getCustomerAddresses())
    setLoading(false)
  }

  // Initial fetch — all setState calls are in async callbacks to satisfy react-hooks/set-state-in-effect
  useEffect(() => {
    getCustomerAddresses()
      .then(setAddresses)
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const result = await createCustomerAddress(form)
    if (result.error) {
      setError(result.error)
    } else {
      setForm(EMPTY_ADDR)
      setShowForm(false)
      await load()
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    await deleteCustomerAddress(id)
    setAddresses((prev) => prev.filter((a) => a.id !== id))
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-3 max-w-2xl w-full">
        {[1, 2].map((i) => <div key={i} className="h-24 rounded-2xl bg-bg-elevated animate-pulse" />)}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 max-w-2xl w-full">
      {/* Address list */}
      {addresses.length === 0 && !showForm && (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-bg-elevated">
            <MapPin className="w-6 h-6 text-text-muted" />
          </div>
          <p className="text-sm font-medium text-text-primary">Sin direcciones guardadas</p>
          <p className="text-xs text-text-muted max-w-xs">Agrega una dirección para agilizar tus próximas compras.</p>
        </div>
      )}

      {addresses.map((addr) => {
        const line = [addr.address_1, addr.city, addr.province].filter(Boolean).join(', ')
        const name = [addr.first_name, addr.last_name].filter(Boolean).join(' ')
        return (
          <div key={addr.id} className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] p-4 flex items-start gap-3">
            <MapPin className="w-4 h-4 text-text-muted shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              {name && <p className="text-sm font-semibold text-text-primary">{name}</p>}
              <p className="text-sm text-text-secondary">{line}</p>
              {addr.phone && <p className="text-xs text-text-muted mt-0.5">{addr.phone}</p>}
            </div>
            <button
              onClick={() => handleDelete(addr.id)}
              className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-bg-elevated transition-colors shrink-0"
            >
              <Trash2 className="w-4 h-4 text-[var(--danger)]" />
            </button>
          </div>
        )
      })}

      {/* Add address form */}
      {showForm ? (
        <div className="bg-[var(--bg-surface)] rounded-2xl border border-[var(--border)] p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text-primary">Nueva dirección</h3>
            <button onClick={() => { setShowForm(false); setError('') }}>
              <X className="w-4 h-4 text-text-muted" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              {([
                { key: 'first_name', label: 'Nombre',   placeholder: 'Juan' },
                { key: 'last_name',  label: 'Apellido', placeholder: 'Pérez' },
              ] as const).map(({ key, label, placeholder }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-text-secondary">{label}</label>
                  <input
                    type="text" placeholder={placeholder}
                    value={form[key] ?? ''}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="h-10 rounded-xl border border-[var(--border)] bg-bg-elevated px-3 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent-primary transition-colors"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-text-secondary">Dirección</label>
              <input
                type="text" placeholder="Av. República E3-71 y Diego de Almagro" required
                value={form.address_1 ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, address_1: e.target.value }))}
                className="h-10 rounded-xl border border-[var(--border)] bg-bg-elevated px-3 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent-primary transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {([
                { key: 'city',        label: 'Ciudad',        placeholder: 'Quito',            req: true  },
                { key: 'province',    label: 'Provincia',     placeholder: 'Pichincha',        req: false },
                { key: 'postal_code', label: 'Código postal', placeholder: '170150',           req: false },
                { key: 'phone',       label: 'Teléfono',      placeholder: '+593 99 000 0000', req: false },
              ] as const).map(({ key, label, placeholder, req }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-text-secondary">{label}</label>
                  <input
                    type="text" placeholder={placeholder} required={req}
                    value={form[key] ?? ''}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="h-10 rounded-xl border border-[var(--border)] bg-bg-elevated px-3 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent-primary transition-colors"
                  />
                </div>
              ))}
            </div>
            {error && <p className="text-xs text-[var(--danger)]">{error}</p>}
            <button
              type="submit" disabled={saving}
              className="flex items-center justify-center gap-2 h-10 rounded-xl bg-accent-primary text-white text-sm font-semibold disabled:opacity-60 transition-opacity"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              Guardar dirección
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 h-10 px-4 rounded-xl border-2 border-dashed border-[var(--border)] text-sm font-semibold text-text-secondary hover:border-accent-primary hover:text-accent-primary transition-colors"
        >
          <Plus className="w-4 h-4" />
          Agregar dirección
        </button>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string }[] = [
  { id: 'profile', label: 'Perfil' },
  { id: 'orders', label: 'Mis Pedidos' },
  { id: 'addresses', label: 'Mis Direcciones' },
]

export default function AccountPage() {
  const { customer, user, loading, signOut, openAuthModal, refreshCustomer } = useAuth()
  const [tab, setTab] = useState<Tab>('profile')

  // Hydrating — prevents flash of guest state while session loads
  if (loading) {
    return (
      <div className="flex flex-col pb-12">
        <div className="bg-[var(--bg-surface)] border-b border-[var(--border)] px-4 py-5">
          <div className="max-w-[1280px] mx-auto flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-bg-elevated animate-pulse" />
            <div className="flex flex-col gap-2">
              <div className="h-4 w-32 rounded bg-bg-elevated animate-pulse" />
              <div className="h-3 w-48 rounded bg-bg-elevated animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Not logged in
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-bg-elevated">
          <User className="w-7 h-7 text-text-muted" />
        </div>
        <div className="text-center">
          <h1 className="text-lg font-bold text-text-primary">Mi Cuenta</h1>
          <p className="text-sm text-text-secondary mt-1">Inicia sesión para ver tus pedidos</p>
        </div>
        <button
          onClick={() => openAuthModal('login')}
          className="flex items-center justify-center h-10 px-6 rounded-lg bg-accent-primary text-sm font-semibold text-white"
        >
          Iniciar sesión
        </button>
      </div>
    )
  }

  // User authenticated — use Supabase metadata as fallback when Medusa customer is unavailable
  const meta = user.user_metadata ?? {}
  const firstName = customer?.first_name ?? meta.first_name ?? ''
  const lastName = customer?.last_name ?? meta.last_name ?? ''
  const fullName = [firstName, lastName].filter(Boolean).join(' ')
  const avatarUrl: string | undefined = meta.avatar_url
  const initials =
    `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase() || user.email?.[0]?.toUpperCase() || '?'

  return (
    <div className="flex flex-col pb-12">
      {/* Header */}
      <div className="bg-[var(--bg-surface)] border-b border-[var(--border)] px-4 py-5">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-accent-primary flex items-center justify-center relative flex-shrink-0">
              {avatarUrl
                ? <Image src={avatarUrl} alt="Avatar" fill className="object-cover" sizes="48px" />
                : <span className="text-base font-semibold text-white">{initials}</span>}
            </div>
            <div>
              <h1 className="text-base font-bold text-text-primary">{fullName || 'Mi Cuenta'}</h1>
              <p className="text-sm text-text-secondary">{customer?.email ?? user.email}</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-1.5 text-sm text-text-muted hover:text-[var(--danger)] transition-colors flex-shrink-0"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Cerrar sesión</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[var(--bg-surface)] border-b border-[var(--border)] px-4 sticky top-0 z-10">
        <div className="max-w-[1280px] mx-auto flex">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                tab === t.id
                  ? 'text-accent-primary border-accent-primary'
                  : 'text-text-secondary border-transparent hover:text-text-primary'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1280px] mx-auto w-full px-4 pt-6 flex flex-col items-center">
        {tab === 'profile' && <ProfileTab onRefresh={refreshCustomer} />}
        {tab === 'orders' && <OrdersTab />}
        {tab === 'addresses' && <AddressesTab />}
      </div>
    </div>
  )
}
