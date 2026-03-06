import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getSeverity(maxWidthMm) {
  if (maxWidthMm <= 0.1) return 'Very Fine'
  if (maxWidthMm <= 0.3) return 'Fine'
  if (maxWidthMm <= 1) return 'Medium'
  return 'Severe'
}

export function getSeverityColor(severity) {
  switch (severity) {
    case 'Severe': return { text: 'text-severe', bg: 'bg-severe/10', border: 'border-severe/30', hex: '#ff3b3b' }
    case 'Medium': return { text: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/30', hex: '#ff8c00' }
    case 'Fine': return { text: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/30', hex: '#e8ff47' }
    case 'Very Fine': return { text: 'text-very-fine', bg: 'bg-very-fine/10', border: 'border-very-fine/30', hex: '#22c55e' }
    default: return { text: 'text-white/60', bg: 'bg-white/5', border: 'border-white/10', hex: '#888' }
  }
}

export function getSeverityLabel(severity) {
  switch (severity) {
    case 'Severe': return 'SEVERE'
    case 'Medium': return 'MEDIUM'
    case 'Fine': return 'FINE'
    case 'Very Fine': return 'VERY FINE'
    default: return 'UNKNOWN'
  }
}

export function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function formatDateShort(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
}
