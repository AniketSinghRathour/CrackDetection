'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft, Plus, Upload, X, Loader2, ScanLine, ChevronDown,
  ChevronUp, Calendar, Ruler, ZoomIn, ImageIcon, Activity,
  AlertTriangle, CheckCircle2, ShieldAlert, BarChart3, Eye
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine
} from 'recharts'
import { formatDate, formatDateShort, getSeverity, getSeverityColor, getSeverityLabel } from '@/lib/utils'

// ─────────────────────────────────────────────
// Severity badge
function SeverityBadge({ severity, size = 'sm' }) {
  const colors = getSeverityColor(severity)
  const label = getSeverityLabel(severity)
  const base = size === 'lg'
    ? 'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-mono font-bold border'
    : 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold border'
  return (
    <span className={`${base} ${colors.bg} ${colors.text} ${colors.border} uppercase tracking-wider`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {label}
    </span>
  )
}

// ─────────────────────────────────────────────
// Custom chart tooltip
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const d = payload[0]?.payload
    const colors = getSeverityColor(d?.severity)
    return (
      <div className="bg-surface-1 border border-subtle rounded-xl px-4 py-3 text-xs font-mono shadow-xl">
        <div className="text-white/60 mb-2">{label}</div>
        <div className={`${colors.text} font-bold text-base`}>{d?.maxWidthMm?.toFixed(2)} mm <span className="text-white/40 text-xs font-normal">max</span></div>
        <div className="text-white/50">{d?.avgWidthMm?.toFixed(2)} mm avg</div>
        <div className="mt-1.5">
          <SeverityBadge severity={d?.severity} />
        </div>
      </div>
    )
  }
  return null
}

// ─────────────────────────────────────────────
// Image preview modal
function ImageModal({ url, onClose }) {
  return (
    <div className="fixed inset-0 modal-backdrop z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-10 right-0 text-white/60 hover:text-white z-10">
          <X size={20} />
        </button>
        <img src={url} alt="Crack analysis" className="w-full h-full object-contain rounded-xl border border-subtle" />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Record row / card
function RecordCard({ record, index }) {
  const [expanded, setExpanded] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)
  const colors = getSeverityColor(record.severity)

  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${expanded ? 'border-white/15 bg-surface-2' : 'border-subtle bg-surface-1'}`}>
      {/* Header row */}
      <button
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/2 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-surface-3 border border-subtle flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-mono text-white/40">#{index + 1}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-white font-semibold text-sm">{formatDate(record.inspectionDate)}</span>
              <SeverityBadge severity={record.severity} />
            </div>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-xs font-mono text-white/40">Max: <span className="text-white/70">{record.maxWidthMm?.toFixed(2)}mm</span></span>
              <span className="text-xs font-mono text-white/40">Avg: <span className="text-white/70">{record.avgWidthMm?.toFixed(2)}mm</span></span>
              <span className="text-xs font-mono text-white/40">Area: <span className="text-white/70">{record.crackAreaMm2?.toFixed(1)}mm²</span></span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {expanded ? <ChevronUp size={16} className="text-white/40" /> : <ChevronDown size={16} className="text-white/40" />}
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-subtle pt-4">
          {/* Metrics grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Max Width', value: `${record.maxWidthMm?.toFixed(3)} mm`, highlight: true },
              { label: 'Avg Width', value: `${record.avgWidthMm?.toFixed(3)} mm` },
              { label: 'Crack Area', value: `${record.crackAreaMm2?.toFixed(2)} mm²` },
              { label: 'Scale', value: `${record.scaleMmPerPixel?.toFixed(4)} mm/px` },
            ].map(({ label, value, highlight }) => (
              <div key={label} className="bg-surface-0 rounded-lg p-3 border border-subtle">
                <div className="text-xs text-white/40 uppercase tracking-wide mb-1">{label}</div>
                <div className={`font-mono font-bold text-sm ${highlight ? colors.text : 'text-white'}`}>{value}</div>
              </div>
            ))}
          </div>

          {/* Baseline */}
          <div className="flex items-center gap-2 text-xs text-white/40">
            <Ruler size={12} />
            <span>Stereo baseline: <span className="font-mono text-white/60">{record.baselineMm} mm</span></span>
          </div>

          {/* Images */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Left Image', url: record.leftImageUrl },
              { label: 'Right Image', url: record.rightImageUrl },
              { label: 'Overlay', url: record.overlayImageUrl },
              { label: 'Heatmap', url: record.heatmapImageUrl },
            ].map(({ label, url }) => (
              <div key={label} className="space-y-1.5">
                <div className="text-xs text-white/40 uppercase tracking-wide">{label}</div>
                {url ? (
                  <div
                    className="relative aspect-square rounded-lg overflow-hidden bg-surface-0 border border-subtle cursor-pointer group"
                    onClick={() => setPreviewUrl(url)}
                  >
                    <img src={url} alt={label} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn size={18} className="text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="aspect-square rounded-lg bg-surface-0 border border-subtle flex items-center justify-center">
                    <ImageIcon size={18} className="text-white/20" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {record.notes && (
            <div className="bg-surface-0 rounded-lg p-3 border border-subtle">
              <div className="text-xs text-white/40 uppercase tracking-wide mb-1">Notes</div>
              <div className="text-sm text-white/70">{record.notes}</div>
            </div>
          )}
        </div>
      )}

      {previewUrl && <ImageModal url={previewUrl} onClose={() => setPreviewUrl(null)} />}
    </div>
  )
}

// ─────────────────────────────────────────────
// File drop zone
function DropZone({ label, file, onChange, previewUrl }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  return (
    <div>
      <div className="text-xs text-white/50 uppercase tracking-wider mb-2 flex items-center gap-1.5">
        <ImageIcon size={12} />
        {label}
      </div>
      <div
        className={`upload-zone cursor-pointer ${dragging ? 'active' : ''} ${previewUrl ? 'border-accent/40' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          const f = e.dataTransfer.files[0]
          if (f) onChange(f)
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files[0] && onChange(e.target.files[0])}
        />
        {previewUrl ? (
          <div className="relative">
            <img src={previewUrl} alt={label} className="w-full h-40 object-cover rounded-xl" />
            <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <span className="text-xs text-white font-mono">Change image</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
            <Upload size={24} className="text-white/20 mb-2" />
            <span className="text-sm text-white/40">Drop or click to upload</span>
            <span className="text-xs text-white/25 mt-1">JPG, PNG, WEBP</span>
          </div>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// New Analysis Modal
function NewAnalysisModal({ siteId, pointId, onClose, onCreated }) {
  const [leftFile, setLeftFile] = useState(null)
  const [rightFile, setRightFile] = useState(null)
  const [leftPreview, setLeftPreview] = useState(null)
  const [rightPreview, setRightPreview] = useState(null)
  const [baseline, setBaseline] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState('form') // form | uploading | analyzing | done
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  function handleLeftFile(file) {
    setLeftFile(file)
    setLeftPreview(URL.createObjectURL(file))
  }
  function handleRightFile(file) {
    setRightFile(file)
    setRightPreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!leftFile || !rightFile || !baseline || !date) {
      setError('Please fill all required fields and upload both images.')
      return
    }
    setError('')
    setLoading(true)

    try {
      // Step 1: Upload images to Cloudinary
      setStep('uploading')
      const formData = new FormData()
      formData.append('left', leftFile)
      formData.append('right', rightFile)
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData })
      const uploadData = await uploadRes.json()
      if (!uploadRes.ok) throw new Error(uploadData.error)

      // Step 2: Analyze via FastAPI
      setStep('analyzing')
      const analyzeRes = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leftUrl: uploadData.leftUrl,
          rightUrl: uploadData.rightUrl,
          baselineMm: parseFloat(baseline),
        }),
      })
      const analyzeData = await analyzeRes.json()
      if (!analyzeRes.ok) throw new Error(analyzeData.error)

      // Step 3: Save record to MongoDB
      const severity = getSeverity(analyzeData.maxWidthMm)
      const recordRes = await fetch(`/api/sites/${siteId}/points/${pointId}/records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteId,
          pointId,
          inspectionDate: date,
          baselineMm: parseFloat(baseline),
          leftImageUrl: uploadData.leftUrl,
          rightImageUrl: uploadData.rightUrl,
          overlayImageUrl: analyzeData.overlayUrl,
          heatmapImageUrl: analyzeData.heatmapUrl,
          scaleMmPerPixel: analyzeData.scaleMmPerPixel,
          maxWidthMm: analyzeData.maxWidthMm,
          avgWidthMm: analyzeData.avgWidthMm,
          crackAreaMm2: analyzeData.crackAreaMm2,
          severity,
          notes,
        }),
      })
      const recordData = await recordRes.json()
      if (!recordRes.ok) throw new Error(recordData.error)

      setResult({ ...analyzeData, severity, record: recordData.record })
      setStep('done')
      onCreated(recordData.record)
    } catch (err) {
      setError(err.message)
      setStep('form')
    } finally {
      setLoading(false)
    }
  }

  const severityColors = result ? getSeverityColor(result.severity) : null

  return (
    <div className="fixed inset-0 modal-backdrop z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-surface-1 border border-subtle rounded-2xl w-full max-w-2xl my-4 animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-subtle">
          <div>
            <h2 className="font-display font-bold text-xl">New Crack Analysis</h2>
            <p className="text-xs text-white/40 mt-0.5">Upload stereo images to measure crack width</p>
          </div>
          <button onClick={onClose} className="btn-ghost p-2"><X size={16} /></button>
        </div>

        {step === 'done' && result ? (
          <div className="p-6 space-y-6">
            <div className="text-center py-4">
              <div className={`inline-flex items-center gap-2 text-4xl font-mono font-bold mb-2 ${severityColors.text}`}>
                {result.maxWidthMm?.toFixed(3)} <span className="text-xl text-white/40 font-normal">mm</span>
              </div>
              <div className="text-white/50 text-sm mb-3">Maximum crack width detected</div>
              <SeverityBadge severity={result.severity} size="lg" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Avg Width', value: `${result.avgWidthMm?.toFixed(3)} mm` },
                { label: 'Crack Area', value: `${result.crackAreaMm2?.toFixed(2)} mm²` },
                { label: 'Scale', value: `${result.scaleMmPerPixel?.toFixed(4)} mm/px` },
                { label: 'Severity', value: getSeverityLabel(result.severity) },
              ].map(({ label, value }) => (
                <div key={label} className="bg-surface-2 rounded-xl p-4 border border-subtle text-center">
                  <div className="text-xs text-white/40 uppercase tracking-wide mb-1">{label}</div>
                  <div className="font-mono font-bold text-white">{value}</div>
                </div>
              ))}
            </div>

            {/* Result images */}
            {(result.overlayUrl || result.heatmapUrl) && (
              <div className="grid grid-cols-2 gap-3">
                {result.overlayUrl && (
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wide mb-2">Crack Overlay</div>
                    <img src={result.overlayUrl} alt="overlay" className="w-full rounded-xl border border-subtle" />
                  </div>
                )}
                {result.heatmapUrl && (
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wide mb-2">Width Heatmap</div>
                    <img src={result.heatmapUrl} alt="heatmap" className="w-full rounded-xl border border-subtle" />
                  </div>
                )}
              </div>
            )}

            <button onClick={onClose} className="btn-primary w-full">Done</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Loading overlay */}
            {loading && (
              <div className="absolute inset-0 bg-surface-0/80 backdrop-blur-sm rounded-2xl z-10 flex flex-col items-center justify-center gap-4">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent dot-1" />
                  <div className="w-2.5 h-2.5 rounded-full bg-accent dot-2" />
                  <div className="w-2.5 h-2.5 rounded-full bg-accent dot-3" />
                </div>
                <div className="text-center">
                  <div className="font-display font-bold text-white mb-1">
                    {step === 'uploading' ? 'Uploading Images…' : 'Running Analysis…'}
                  </div>
                  <div className="text-xs text-white/40">
                    {step === 'uploading' ? 'Saving to Cloudinary' : 'Stereo crack measurement in progress'}
                  </div>
                </div>
              </div>
            )}

            {/* Image upload */}
            <div className="grid grid-cols-2 gap-4">
              <DropZone label="Left Image (L)" file={leftFile} onChange={handleLeftFile} previewUrl={leftPreview} />
              <DropZone label="Right Image (R)" file={rightFile} onChange={handleRightFile} previewUrl={rightPreview} />
            </div>

            {/* Parameters */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Camera Baseline (mm) *</label>
                <input
                  className="input-field"
                  type="number"
                  step="0.1"
                  min="1"
                  placeholder="e.g. 65.0"
                  value={baseline}
                  onChange={(e) => setBaseline(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Inspection Date *</label>
                <input
                  className="input-field"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Notes</label>
              <textarea
                className="input-field resize-none"
                rows={2}
                placeholder="Optional observations..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {error && (
              <div className="text-severe text-sm bg-severe/10 border border-severe/20 rounded-lg px-4 py-3 flex items-start gap-2">
                <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose} className="btn-ghost flex-1">Cancel</button>
              <button type="submit" className="btn-primary flex-1" disabled={loading}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2"><Loader2 size={14} className="animate-spin" /> Processing…</span>
                ) : (
                  <span className="flex items-center justify-center gap-2"><ScanLine size={14} /> Run Analysis</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Main page
export default function PointPage() {
  const params = useParams()
  const { siteId, pointId } = params
  const [site, setSite] = useState(null)
  const [point, setPoint] = useState(null)
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAnalysis, setShowAnalysis] = useState(false)

  useEffect(() => {
    if (siteId && pointId) fetchData()
  }, [siteId, pointId])

  async function fetchData() {
    try {
      const [siteRes, pointRes] = await Promise.all([
        fetch(`/api/sites/${siteId}`),
        fetch(`/api/sites/${siteId}/points/${pointId}`),
      ])
      const siteData = await siteRes.json()
      const pointData = await pointRes.json()
      setSite(siteData.site)
      setPoint(pointData.point)
      setRecords(pointData.records || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function handleNewRecord(record) {
    setRecords((prev) => [...prev, record].sort((a, b) => new Date(a.inspectionDate) - new Date(b.inspectionDate)))
  }

  // Chart data
  const chartData = records.map((r) => ({
    date: formatDateShort(r.inspectionDate),
    maxWidthMm: r.maxWidthMm,
    avgWidthMm: r.avgWidthMm,
    severity: r.severity,
    ...r,
  }))

  const latestRecord = records.length > 0 ? records[records.length - 1] : null
  const latestColors = latestRecord ? getSeverityColor(latestRecord.severity) : null

  return (
    <div className="min-h-screen bg-surface-0 grid-bg">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-accent/2 blur-[100px] rounded-full" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-subtle glass">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <Link href="/" className="text-white/50 hover:text-white transition-colors flex-shrink-0">
              <span className="text-sm hidden sm:block">Dashboard</span>
            </Link>
            <span className="text-white/20 flex-shrink-0">/</span>
            <Link href={`/sites/${siteId}`} className="text-white/50 hover:text-white transition-colors text-sm truncate max-w-[120px] hidden sm:block">
              {site?.name}
            </Link>
            <span className="text-white/20 flex-shrink-0 hidden sm:block">/</span>
            <div className="flex items-center gap-2 min-w-0">
              <ArrowLeft size={14} className="sm:hidden flex-shrink-0 text-white/50" />
              <div className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center flex-shrink-0">
                <ScanLine size={12} className="text-accent" />
              </div>
              <span className="font-display font-bold text-white truncate text-sm">
                {point?.name || '—'}
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowAnalysis(true)}
            className="btn-primary flex items-center gap-2 text-xs flex-shrink-0"
          >
            <Plus size={14} /> New Analysis
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
            {/* Point header */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-xs font-mono text-accent/70 uppercase tracking-widest mb-2">Analysis Point</p>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white leading-none">
                  {point?.name}
                </h1>
                {point?.location && <p className="text-white/40 text-sm mt-2">{point.location}</p>}
                {point?.description && <p className="text-white/30 text-sm mt-1">{point.description}</p>}
              </div>
              {latestRecord && (
                <div className={`rounded-2xl border p-4 text-center min-w-[140px] ${latestColors.bg} ${latestColors.border}`}>
                  <div className="text-xs text-white/50 uppercase tracking-wider mb-1">Latest</div>
                  <div className={`text-3xl font-mono font-bold ${latestColors.text}`}>
                    {latestRecord.maxWidthMm?.toFixed(2)}
                  </div>
                  <div className="text-xs text-white/40 mb-2">mm max width</div>
                  <SeverityBadge severity={latestRecord.severity} />
                </div>
              )}
            </div>

            {/* Stats overview */}
            {records.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {[
                  { label: 'Total Records', value: records.length, mono: true },
                  { label: 'Max Ever', value: `${Math.max(...records.map(r => r.maxWidthMm || 0)).toFixed(2)} mm`, mono: true },
                  { label: 'Avg of Maxes', value: `${(records.reduce((a, r) => a + (r.maxWidthMm || 0), 0) / records.length).toFixed(2)} mm`, mono: true },
                  { label: 'First Scan', value: formatDate(records[0]?.inspectionDate), mono: false },
                ].map(({ label, value, mono }) => (
                  <div key={label} className="bg-surface-1 border border-subtle rounded-xl p-4">
                    <div className="text-xs text-white/40 uppercase tracking-wide mb-1">{label}</div>
                    <div className={`font-bold text-white ${mono ? 'font-mono' : 'text-sm'}`}>{value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Crack progression chart */}
            {records.length > 0 && (
              <div className="bg-surface-1 border border-subtle rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-2 border border-subtle flex items-center justify-center">
                      <BarChart3 size={16} className="text-accent" />
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-lg text-white">Crack Progression</h2>
                      <p className="text-xs text-white/40">Max & avg width over time</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-white/40">
                    <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded bg-accent/70 inline-block" />Max Width</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded bg-white/20 inline-block" />Avg Width</span>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={chartData} barGap={2} barCategoryGap="30%">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11, fontFamily: 'Space Mono' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11, fontFamily: 'Space Mono' }}
                      axisLine={false}
                      tickLine={false}
                      unit=" mm"
                      width={55}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                    {/* Severity reference lines */}
                    <ReferenceLine y={0.1} stroke="rgba(34,197,94,0.3)" strokeDasharray="4 4" label={{ value: 'Very Fine ≤0.1', fill: 'rgba(34,197,94,0.5)', fontSize: 10 }} />
                    <ReferenceLine y={0.3} stroke="rgba(232,255,71,0.3)" strokeDasharray="4 4" label={{ value: 'Fine ≤0.3', fill: 'rgba(232,255,71,0.5)', fontSize: 10 }} />
                    <ReferenceLine y={1} stroke="rgba(255,140,0,0.3)" strokeDasharray="4 4" label={{ value: 'Medium ≤1', fill: 'rgba(255,140,0,0.5)', fontSize: 10 }} />
                    <Bar dataKey="maxWidthMm" name="Max Width" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => {
                        const c = getSeverityColor(entry.severity)
                        return <Cell key={index} fill={c.hex} fillOpacity={0.85} />
                      })}
                    </Bar>
                    <Bar dataKey="avgWidthMm" name="Avg Width" radius={[4, 4, 0, 0]} fill="rgba(255,255,255,0.12)" />
                  </BarChart>
                </ResponsiveContainer>

                {/* Legend / severity key */}
                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-subtle">
                  {[
                    { label: 'Very Fine (≤0.1mm)', color: '#22c55e' },
                    { label: 'Fine (≤0.3mm)', color: '#e8ff47' },
                    { label: 'Medium (≤1mm)', color: '#ff8c00' },
                    { label: 'Severe (>1mm)', color: '#ff3b3b' },
                  ].map(({ label, color }) => (
                    <div key={label} className="flex items-center gap-2 text-xs text-white/40">
                      <span className="w-3 h-3 rounded-sm inline-block" style={{ background: color, opacity: 0.85 }} />
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Records list */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-xl text-white">
                  Inspection Records
                  {records.length > 0 && (
                    <span className="ml-2 text-sm font-mono font-normal text-white/40">({records.length})</span>
                  )}
                </h2>
                <button
                  onClick={() => setShowAnalysis(true)}
                  className="btn-ghost flex items-center gap-1.5 text-sm"
                >
                  <Plus size={14} /> Add Record
                </button>
              </div>

              {records.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-surface-2 border border-subtle flex items-center justify-center mb-4">
                    <ScanLine size={22} className="text-white/20" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-white/50 mb-2">No records yet</h3>
                  <p className="text-white/30 text-sm mb-6">
                    Run your first crack analysis to begin tracking progression.
                  </p>
                  <button onClick={() => setShowAnalysis(true)} className="btn-primary flex items-center gap-2">
                    <Plus size={16} /> Run Analysis
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {[...records].reverse().map((record, index) => (
                    <RecordCard key={record._id} record={record} index={records.length - 1 - index} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {showAnalysis && (
        <NewAnalysisModal
          siteId={siteId}
          pointId={pointId}
          onClose={() => setShowAnalysis(false)}
          onCreated={handleNewRecord}
        />
      )}
    </div>
  )
}
