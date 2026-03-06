'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Plus, MapPin, Activity, ChevronRight,
  Trash2, X, Loader2, ScanLine, AlertTriangle, CheckCircle2, ShieldAlert
} from 'lucide-react'
import { formatDate, getSeverityColor, getSeverityLabel } from '@/lib/utils'

function SeverityBadge({ severity }) {
  const colors = getSeverityColor(severity)
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${colors.bg} ${colors.text} ${colors.border} uppercase tracking-wider`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {getSeverityLabel(severity)}
    </span>
  )
}

function PointCard({ point, siteId, onDelete }) {
  const latest = point.latestRecord
  const colors = latest ? getSeverityColor(latest.severity) : null

  return (
    <div className="group relative border border-subtle rounded-2xl bg-surface-1 overflow-hidden card-hover">
      {latest && (
        <div className={`absolute top-0 left-0 right-0 h-0.5`} style={{ background: colors?.hex }} />
      )}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="text-xs font-mono text-white/30 uppercase tracking-widest mb-1">Analysis Point</div>
            <h3 className="font-display font-bold text-lg text-white truncate">{point.name}</h3>
            {point.location && (
              <div className="flex items-center gap-1 mt-0.5">
                <MapPin size={11} className="text-white/30" />
                <span className="text-xs text-white/40 truncate">{point.location}</span>
              </div>
            )}
          </div>
          <button
            onClick={(e) => { e.preventDefault(); onDelete(point._id) }}
            className="btn-danger-ghost ml-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg"
          >
            <Trash2 size={13} />
          </button>
        </div>

        {latest ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <SeverityBadge severity={latest.severity} />
              <span className="text-xs text-white/30 font-mono">{formatDate(latest.inspectionDate)}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-surface-2 rounded-lg p-3 border border-subtle">
                <div className="text-xs text-white/40 uppercase tracking-wide mb-1">Max Width</div>
                <div className="font-mono font-bold text-white">
                  {latest.maxWidthMm?.toFixed(2)}<span className="text-white/40 text-xs ml-1">mm</span>
                </div>
              </div>
              <div className="bg-surface-2 rounded-lg p-3 border border-subtle">
                <div className="text-xs text-white/40 uppercase tracking-wide mb-1">Avg Width</div>
                <div className="font-mono font-bold text-white">
                  {latest.avgWidthMm?.toFixed(2)}<span className="text-white/40 text-xs ml-1">mm</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-white/30">
              <span className="font-mono">{point.recordCount}</span> record{point.recordCount !== 1 ? 's' : ''} total
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center py-4 text-center">
            <ScanLine size={20} className="text-white/20 mb-2" />
            <span className="text-xs text-white/30">No analysis yet</span>
          </div>
        )}
      </div>
      <div className="border-t border-subtle px-5 py-3 flex justify-between items-center bg-surface-0/50">
        <span className="text-xs text-white/30 font-mono">Created {formatDate(point.createdAt)}</span>
        <Link
          href={`/sites/${siteId}/points/${point._id}`}
          className="flex items-center gap-1 text-accent text-xs font-display font-semibold hover:gap-2 transition-all"
        >
          Inspect <ChevronRight size={12} />
        </Link>
      </div>
    </div>
  )
}

function CreatePointModal({ siteId, onClose, onCreated }) {
  const [form, setForm] = useState({ name: '', location: '', description: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/sites/${siteId}/points`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      onCreated(data.point)
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 modal-backdrop z-50 flex items-center justify-center p-4">
      <div className="bg-surface-1 border border-subtle rounded-2xl w-full max-w-md p-6 animate-fade-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-xl">New Analysis Point</h2>
          <button onClick={onClose} className="btn-ghost p-2"><X size={16} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Point Name *</label>
            <input className="input-field" placeholder="e.g. Column Base - North Face" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Location / Reference</label>
            <input className="input-field" placeholder="e.g. 2.4m from base, East side" value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Description</label>
            <textarea className="input-field resize-none" rows={2} placeholder="Additional notes..."
              value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          {error && <div className="text-severe text-sm bg-severe/10 border border-severe/20 rounded-lg px-4 py-3">{error}</div>}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost flex-1">Cancel</button>
            <button type="submit" className="btn-primary flex-1" disabled={loading}>
              {loading ? <span className="flex items-center justify-center gap-2"><Loader2 size={14} className="animate-spin" /> Creating…</span> : 'Add Point'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function SitePage() {
  const params = useParams()
  const router = useRouter()
  const { siteId } = params
  const [site, setSite] = useState(null)
  const [points, setPoints] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)

  useEffect(() => {
    if (siteId) fetchData()
  }, [siteId])

  async function fetchData() {
    try {
      const [siteRes, pointsRes] = await Promise.all([
        fetch(`/api/sites/${siteId}`),
        fetch(`/api/sites/${siteId}/points`),
      ])
      const siteData = await siteRes.json()
      const pointsData = await pointsRes.json()
      setSite(siteData.site)
      setPoints(pointsData.points || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleDeletePoint(pointId) {
    if (!confirm('Delete this point and all its records?')) return
    await fetch(`/api/sites/${siteId}/points/${pointId}`, { method: 'DELETE' })
    setPoints((prev) => prev.filter((p) => p._id !== pointId))
  }

  // Stats
  const totalRecords = points.reduce((acc, p) => acc + (p.recordCount || 0), 0)
  const bySeverity = points.reduce((acc, p) => {
    if (p.latestRecord) acc[p.latestRecord.severity] = (acc[p.latestRecord.severity] || 0) + 1
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-surface-0 grid-bg">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-accent/2 blur-[100px] rounded-full" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-subtle glass">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
              <ArrowLeft size={16} />
              <span className="text-sm">Dashboard</span>
            </Link>
            <span className="text-white/20">/</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center">
                <MapPin size={12} className="text-accent" />
              </div>
              <span className="font-display font-bold text-white truncate max-w-[200px]">
                {site?.name || '—'}
              </span>
            </div>
          </div>
          <button onClick={() => setShowCreate(true)} className="btn-primary flex items-center gap-2 text-xs">
            <Plus size={14} /> Add Point
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-accent dot-1" />
              <div className="w-2 h-2 rounded-full bg-accent dot-2" />
              <div className="w-2 h-2 rounded-full bg-accent dot-3" />
            </div>
          </div>
        ) : (
          <>
            {/* Site info */}
            <div className="mb-8">
              <p className="text-xs font-mono text-accent/70 uppercase tracking-widest mb-2">Inspection Site</p>
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white leading-none mb-3">
                {site?.name}
              </h1>
              {site?.location && (
                <div className="flex items-center gap-2 text-white/40">
                  <MapPin size={14} />
                  <span className="text-sm">{site.location}</span>
                </div>
              )}
              {site?.description && (
                <p className="text-white/40 text-sm mt-2 max-w-xl">{site.description}</p>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
              {[
                { label: 'Analysis Points', value: points.length, icon: Activity, color: '' },
                { label: 'Total Scans', value: totalRecords, icon: ScanLine, color: '' },
                { label: 'Severe', value: bySeverity['Severe'] || 0, icon: ShieldAlert, color: 'text-severe' },
                { label: 'Medium', value: bySeverity['Medium'] || 0, icon: AlertTriangle, color: 'text-danger' },
                { label: 'Fine', value: bySeverity['Fine'] || 0, icon: CheckCircle2, color: 'text-accent' },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-surface-1 border border-subtle rounded-xl p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-surface-2 border border-subtle flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className={color || 'text-white/50'} />
                  </div>
                  <div>
                    <div className={`text-2xl font-mono font-bold ${color || 'text-white'}`}>{value}</div>
                    <div className="text-xs text-white/40 uppercase tracking-wide">{label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Points grid */}
            {points.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-14 h-14 rounded-2xl bg-surface-2 border border-subtle flex items-center justify-center mb-4">
                  <ScanLine size={22} className="text-white/20" />
                </div>
                <h3 className="font-display font-bold text-xl text-white/50 mb-2">No analysis points</h3>
                <p className="text-white/30 text-sm mb-6 max-w-sm">
                  Add your first analysis point to start tracking crack data at this site.
                </p>
                <button onClick={() => setShowCreate(true)} className="btn-primary flex items-center gap-2">
                  <Plus size={16} /> Add First Point
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {points.map((point) => (
                  <PointCard key={point._id} point={point} siteId={siteId} onDelete={handleDeletePoint} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {showCreate && (
        <CreatePointModal
          siteId={siteId}
          onClose={() => setShowCreate(false)}
          onCreated={(p) => setPoints((prev) => [{ ...p, recordCount: 0, latestRecord: null }, ...prev])}
        />
      )}
    </div>
  )
}
