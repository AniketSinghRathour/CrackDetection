'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, MapPin, Activity, AlertTriangle, CheckCircle, ChevronRight, Trash2, X, Loader2 } from 'lucide-react'
import { formatDate, getSeverityColor } from '@/lib/utils'

function StatBadge({ count, label, colorClass }) {
  return (
    <div className={`flex flex-col items-center px-3 py-2 rounded-lg border ${colorClass}`}>
      <span className="text-lg font-bold font-mono leading-none">{count}</span>
      <span className="text-xs mt-1 opacity-70 uppercase tracking-wider">{label}</span>
    </div>
  )
}

function SiteCard({ site, onDelete }) {
  const { stats = {} } = site
  const totalPoints = stats.totalPoints || 0
  const totalAnalyses = stats.totalAnalyses || 0
  const severe = stats.severe || 0
  const medium = stats.medium || 0
  const fine = stats.fine || 0
  const veryFine = stats.veryFine || 0

  return (
    <div className="group relative border border-subtle rounded-2xl p-6 card-hover bg-surface-1 overflow-hidden">
      {/* Accent line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-accent/70 uppercase tracking-widest">Site</span>
          </div>
          <h3 className="font-display font-bold text-xl text-white truncate">{site.name}</h3>
          {site.location && (
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={12} className="text-white/40" />
              <span className="text-sm text-white/50 truncate">{site.location}</span>
            </div>
          )}
          {site.description && (
            <p className="text-sm text-white/40 mt-2 line-clamp-2">{site.description}</p>
          )}
        </div>
        <button
          onClick={(e) => { e.preventDefault(); onDelete(site._id) }}
          className="btn-danger-ghost ml-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="bg-surface-2 rounded-lg p-3 text-center border border-subtle">
          <div className="text-xl font-mono font-bold text-white">{totalPoints}</div>
          <div className="text-xs text-white/40 mt-0.5 uppercase tracking-wide">Points</div>
        </div>
        <div className="bg-surface-2 rounded-lg p-3 text-center border border-subtle">
          <div className="text-xl font-mono font-bold text-white">{totalAnalyses}</div>
          <div className="text-xs text-white/40 mt-0.5 uppercase tracking-wide">Scans</div>
        </div>
        <div className="severity-severe rounded-lg p-3 text-center border">
          <div className="text-xl font-mono font-bold">{severe}</div>
          <div className="text-xs mt-0.5 opacity-70 uppercase tracking-wide">Severe</div>
        </div>
        <div className="severity-danger rounded-lg p-3 text-center border">
          <div className="text-xl font-mono font-bold">{medium}</div>
          <div className="text-xs mt-0.5 opacity-70 uppercase tracking-wide">Medium</div>
        </div>
      </div>

      {/* Severity bar */}
      {totalPoints > 0 && (
        <div className="mb-4">
          <div className="flex h-2 rounded-full overflow-hidden gap-px">
            {severe > 0 && (
              <div className="bg-severe/80 transition-all" style={{ width: `${(severe / totalPoints) * 100}%` }} />
            )}
            {medium > 0 && (
              <div className="bg-danger/80 transition-all" style={{ width: `${(medium / totalPoints) * 100}%` }} />
            )}
            {fine > 0 && (
              <div className="bg-accent/80 transition-all" style={{ width: `${(fine / totalPoints) * 100}%` }} />
            )}
            {veryFine > 0 && (
              <div className="bg-mild/60 transition-all" style={{ width: `${(veryFine / totalPoints) * 100}%` }} />
            )}
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-white/30">{fine} fine · {veryFine} very fine</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs text-white/30 font-mono">Since {formatDate(site.createdAt)}</span>
        <Link
          href={`/sites/${site._id}`}
          className="flex items-center gap-1 text-accent text-sm font-display font-semibold hover:gap-2 transition-all"
        >
          View Site <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  )
}

function CreateSiteModal({ onClose, onCreated }) {
  const [form, setForm] = useState({ name: '', location: '', description: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      onCreated(data.site)
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
          <h2 className="font-display font-bold text-xl">New Inspection Site</h2>
          <button onClick={onClose} className="btn-ghost p-2">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Site Name *</label>
            <input
              className="input-field"
              placeholder="e.g. Bridge A - Column 3"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Location</label>
            <input
              className="input-field"
              placeholder="e.g. 12.9716° N, 77.5946° E"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Description</label>
            <textarea
              className="input-field resize-none"
              rows={3}
              placeholder="Brief description of the site..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          {error && (
            <div className="text-severe text-sm bg-severe/10 border border-severe/20 rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost flex-1">Cancel</button>
            <button type="submit" className="btn-primary flex-1" disabled={loading}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={14} className="animate-spin" /> Creating…
                </span>
              ) : 'Create Site'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [sites, setSites] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)

  useEffect(() => {
    fetchSites()
  }, [])

  async function fetchSites() {
    try {
      const res = await fetch('/api/sites')
      const data = await res.json()
      setSites(data.sites || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(siteId) {
    if (!confirm('Delete this site and all its data?')) return
    await fetch(`/api/sites/${siteId}`, { method: 'DELETE' })
    setSites((prev) => prev.filter((s) => s._id !== siteId))
  }

  // Global stats
  const totalSites = sites.length
  const totalSevere = sites.reduce((acc, s) => acc + (s.stats?.severe || 0), 0)
  const totalMedium = sites.reduce((acc, s) => acc + (s.stats?.medium || 0), 0)
  const totalFine = sites.reduce((acc, s) => acc + (s.stats?.fine || 0), 0)
  const totalVeryFine = sites.reduce((acc, s) => acc + (s.stats?.veryFine || 0), 0)
  const totalScans = sites.reduce((acc, s) => acc + (s.stats?.totalAnalyses || 0), 0)

  return (
    <div className="min-h-screen bg-surface-0 grid-bg">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/3 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-subtle glass">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Activity size={16} className="text-surface-0" />
            </div>
            <div>
              <span className="font-display font-bold text-white tracking-tight">CrackMonitor</span>
              <span className="text-white/30 text-xs ml-2 font-mono"></span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/30 font-mono hidden sm:block">
              {new Date().toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-mild animate-pulse-slow" />
              <span className="text-xs text-white/50">System Online</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Hero section */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-mono text-accent/70 uppercase tracking-widest mb-2">Structural Health Monitoring</p>
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white leading-none">
                Inspection<br />
                <span className="accent-text glow-accent">Dashboard</span>
              </h1>
              <p className="text-white/40 mt-3 text-sm max-w-lg">
                Digital crack measurement & logging system. Monitor crack progression across all sites with precision stereo-camera analysis.
              </p>
            </div>
            <button onClick={() => setShowCreate(true)} className="btn-primary flex items-center gap-2 whitespace-nowrap self-start sm:self-auto">
              <Plus size={16} /> New Site
            </button>
          </div>
        </div>

        {/* Global stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 mb-10">
          {[
            { label: 'Total Sites', value: totalSites, color: 'border-white/10' },
            { label: 'Total Scans', value: totalScans, color: 'border-white/10' },
            { label: 'Severe', value: totalSevere, color: 'border-severe/30', text: 'text-severe' },
            { label: 'Medium', value: totalMedium, color: 'border-danger/30', text: 'text-danger' },
            { label: 'Fine', value: totalFine, color: 'border-accent/30', text: 'text-accent' },
            { label: 'Very Fine', value: totalVeryFine, color: 'border-mild/30', text: 'text-mild' },
          ].map(({ label, value, color, text }) => (
            <div key={label} className={`bg-surface-1 rounded-xl p-4 border ${color} text-center`}>
              <div className={`text-2xl font-mono font-bold ${text || 'text-white'}`}>{value}</div>
              <div className="text-xs text-white/40 uppercase tracking-wider mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Sites grid */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-accent dot-1" />
              <div className="w-2 h-2 rounded-full bg-accent dot-2" />
              <div className="w-2 h-2 rounded-full bg-accent dot-3" />
            </div>
          </div>
        ) : sites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-16 h-16 rounded-2xl bg-surface-2 border border-subtle flex items-center justify-center mb-4">
              <MapPin size={24} className="text-white/20" />
            </div>
            <h3 className="font-display font-bold text-xl text-white/60 mb-2">No sites yet</h3>
            <p className="text-white/30 text-sm mb-6 max-w-sm">
              Create your first inspection site to start monitoring structural cracks.
            </p>
            <button onClick={() => setShowCreate(true)} className="btn-primary flex items-center gap-2">
              <Plus size={16} /> Create First Site
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {sites.map((site) => (
              <SiteCard key={site._id} site={site} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>

      {showCreate && (
        <CreateSiteModal
          onClose={() => setShowCreate(false)}
          onCreated={(site) => setSites((prev) => [{ ...site, stats: {} }, ...prev])}
        />
      )}
    </div>
  )
}
