'use client'

import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, Camera, Ruler, CheckCircle2, XCircle, BookOpen, Crosshair, ArrowRight } from 'lucide-react'

const GUIDE_STEPS = [
  {
    id: 'overview',
    title: 'How Stereo Crack Analysis Works',
    icon: BookOpen,
    content: (
      <div className="space-y-5">
        <div className="bg-surface-2 rounded-xl p-5 border border-subtle">
          <p className="text-white/70 text-sm leading-relaxed">
            This system uses <span className="text-accent font-semibold">stereo vision</span> to measure real-world crack dimensions.
            By taking <span className="text-white font-semibold">two photos</span> of the same crack from slightly different horizontal positions,
            the system computes depth and converts pixel measurements into accurate <span className="text-white font-semibold">millimeter values</span>.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs text-white/40 uppercase tracking-widest font-mono">What You Need</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: Camera, label: 'Left Image', desc: 'First photo of the crack' },
              { icon: Camera, label: 'Right Image', desc: 'Second photo, shifted right' },
              { icon: Ruler, label: 'Baseline', desc: 'Distance between camera positions' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-surface-2 rounded-xl p-4 border border-subtle text-center">
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-3">
                  <Icon size={18} className="text-accent" />
                </div>
                <div className="text-sm font-semibold text-white mb-1">{label}</div>
                <div className="text-xs text-white/40">{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-accent/5 border border-accent/15 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Crosshair size={16} className="text-accent flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-accent mb-1">What You Get</div>
              <p className="text-xs text-white/50 leading-relaxed">
                Max & average crack width in mm, crack area in mm², a visual overlay highlighting the crack,
                and a severity-colored heatmap — all computed automatically from your two images.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'capture',
    title: 'How to Capture Images',
    icon: Camera,
    content: (
      <div className="space-y-5">
        <div className="rounded-xl overflow-hidden border border-subtle">
          <img
            src="/guide/stereo-capture-guide.png"
            alt="Stereo capture guide showing left and right camera positions"
            className="w-full"
          />
        </div>

        <div className="space-y-3">
          <h4 className="text-xs text-white/40 uppercase tracking-widest font-mono">Step-by-Step</h4>
          <div className="space-y-2">
            {[
              { step: '1', text: 'Position your camera directly facing the crack, keeping it parallel to the surface.' },
              { step: '2', text: 'Take the first photo — this is your Left Image (L).' },
              { step: '3', text: 'Slide your camera horizontally to the right by 50–150 mm (keep the same height and angle).' },
              { step: '4', text: 'Take the second photo — this is your Right Image (R).' },
              { step: '5', text: 'Measure the exact horizontal distance you moved — this is the Baseline value.' },
            ].map(({ step, text }) => (
              <div key={step} className="flex items-start gap-3 bg-surface-2 rounded-lg p-3 border border-subtle">
                <div className="w-7 h-7 rounded-lg bg-accent/15 border border-accent/25 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-mono font-bold text-accent">{step}</span>
                </div>
                <p className="text-sm text-white/70 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-2 border border-subtle rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Camera size={14} className="text-white/40 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-white/40 leading-relaxed">
              <span className="text-white/60 font-semibold">Tip:</span> Both images must show the same crack region.
              Only move horizontally — don't rotate, tilt, or change height between shots.
              A phone camera works great for this.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'baseline',
    title: 'Understanding Baseline',
    icon: Ruler,
    content: (
      <div className="space-y-5">
        <div className="rounded-xl overflow-hidden border border-subtle">
          <img
            src="/guide/baseline-explanation.png"
            alt="Baseline explanation — distance between camera positions"
            className="w-full"
          />
        </div>

        <div className="bg-surface-2 rounded-xl p-5 border border-subtle">
          <h4 className="text-sm font-semibold text-white mb-3">What is Baseline?</h4>
          <p className="text-sm text-white/60 leading-relaxed mb-4">
            The <span className="text-accent font-semibold">baseline</span> is the horizontal distance (in millimeters) between your two camera positions.
            It's the most critical measurement — an inaccurate baseline will produce inaccurate crack width results.
          </p>
          <div className="flex items-center gap-3 bg-surface-0 rounded-lg p-3 border border-subtle">
            <ArrowRight size={14} className="text-accent flex-shrink-0" />
            <span className="text-sm text-white/60">
              Move camera <span className="text-white font-mono font-bold">purely sideways</span> — the baseline is <span className="text-white font-mono font-bold">only</span> the horizontal component.
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs text-white/40 uppercase tracking-widest font-mono">How to Measure</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: 'Use a ruler', desc: 'Place a ruler or tape measure between the two camera positions on the surface/tripod.' },
              { label: 'Mark positions', desc: 'Before shooting, place two marks on a flat surface and measure the gap.' },
            ].map(({ label, desc }) => (
              <div key={label} className="bg-surface-2 rounded-xl p-4 border border-subtle">
                <div className="text-sm font-semibold text-white mb-1">{label}</div>
                <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs text-white/40 uppercase tracking-widest font-mono">Typical Values</h4>
          <div className="grid grid-cols-3 gap-3">
            {[
              { range: '50–80 mm', use: 'Close-up cracks', note: 'phone held close' },
              { range: '80–120 mm', use: 'Standard surveys', note: 'recommended' },
              { range: '120–200 mm', use: 'Wide surfaces', note: 'farther distances' },
            ].map(({ range, use, note }) => (
              <div key={range} className="bg-surface-2 rounded-xl p-3 border border-subtle text-center">
                <div className="text-sm font-mono font-bold text-accent mb-1">{range}</div>
                <div className="text-xs text-white/60">{use}</div>
                <div className="text-xs text-white/30 mt-0.5">{note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'dos-donts',
    title: "Do's & Don'ts",
    icon: CheckCircle2,
    content: (
      <div className="space-y-5">
        <div className="rounded-xl overflow-hidden border border-subtle">
          <img
            src="/guide/capture-dos-donts.png"
            alt="Do's and Don'ts for crack imaging"
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Do's column */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 size={16} className="text-mild" />
              <span className="text-sm font-bold text-mild uppercase tracking-wider">Do</span>
            </div>
            {[
              'Keep camera parallel to the surface',
              'Move only horizontally between shots',
              'Ensure good, even lighting',
              'Capture the full crack in both images',
              'Measure baseline with a ruler — be precise',
              'Hold the camera steady (use both hands)',
            ].map((text) => (
              <div key={text} className="flex items-start gap-2 bg-mild/5 rounded-lg p-3 border border-mild/15">
                <CheckCircle2 size={12} className="text-mild flex-shrink-0 mt-0.5" />
                <span className="text-xs text-white/60">{text}</span>
              </div>
            ))}
          </div>

          {/* Don'ts column */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <XCircle size={16} className="text-severe" />
              <span className="text-sm font-bold text-severe uppercase tracking-wider">Don&apos;t</span>
            </div>
            {[
              'Rotate or tilt the camera between shots',
              'Move the camera vertically (only sideways)',
              'Take blurry or motion-blurred images',
              'Change zoom or focal length between shots',
              'Guess or estimate the baseline distance',
              'Move more than ~200 mm between positions',
            ].map((text) => (
              <div key={text} className="flex items-start gap-2 bg-severe/5 rounded-lg p-3 border border-severe/15">
                <XCircle size={12} className="text-severe flex-shrink-0 mt-0.5" />
                <span className="text-xs text-white/60">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'params',
    title: 'Parameter Reference',
    icon: Ruler,
    content: (
      <div className="space-y-5">
        <div className="space-y-3">
          {[
            {
              param: 'Left Image (L)',
              required: true,
              desc: 'The first photo of the crack. This is the primary image used for crack segmentation and measurement.',
              tip: 'This should be high resolution and well-lit. The crack must be clearly visible.',
            },
            {
              param: 'Right Image (R)',
              required: true,
              desc: 'The second photo taken after sliding the camera horizontally to the right. Used for stereo depth computation.',
              tip: 'Must show the same crack region as the left image. Only the horizontal position should change.',
            },
            {
              param: 'Camera Baseline (mm)',
              required: true,
              desc: 'The horizontal distance in millimeters between the two camera positions when the left and right images were taken.',
              tip: 'Measure carefully with a ruler. Typical range: 50–150 mm. Accurate baseline = accurate crack measurements.',
            },
            {
              param: 'Inspection Date',
              required: true,
              desc: 'The date when the images were captured. Used for tracking crack progression over time.',
              tip: 'Defaults to today. Adjust if uploading older images.',
            },
            {
              param: 'Notes',
              required: false,
              desc: 'Optional text notes about this inspection — weather conditions, observations, crack characteristics, etc.',
              tip: 'Helpful for future reference when reviewing historical records.',
            },
          ].map(({ param, required, desc, tip }) => (
            <div key={param} className="bg-surface-2 rounded-xl p-4 border border-subtle">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-white">{param}</span>
                {required ? (
                  <span className="text-[10px] font-mono font-bold text-accent bg-accent/10 border border-accent/20 px-1.5 py-0.5 rounded uppercase">Required</span>
                ) : (
                  <span className="text-[10px] font-mono font-bold text-white/30 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded uppercase">Optional</span>
                )}
              </div>
              <p className="text-sm text-white/50 leading-relaxed mb-2">{desc}</p>
              <div className="flex items-start gap-2 bg-surface-0 rounded-lg p-2.5 border border-subtle">
                <span className="text-[10px] text-accent font-mono font-bold flex-shrink-0 mt-px">TIP</span>
                <p className="text-xs text-white/40 leading-relaxed">{tip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
]

export default function InfoGuideModal({ onClose }) {
  const [currentStep, setCurrentStep] = useState(0)
  const step = GUIDE_STEPS[currentStep]
  const StepIcon = step.icon

  return (
    <div className="fixed inset-0 z-[55] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
      <div className="bg-surface-1 border border-subtle rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-subtle flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <StepIcon size={16} className="text-accent" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white leading-tight">{step.title}</h2>
              <p className="text-xs text-white/30 font-mono mt-0.5">
                Step {currentStep + 1} of {GUIDE_STEPS.length}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn-ghost p-2 rounded-lg hover:bg-white/5 transition-colors">
            <X size={16} className="text-white/50" />
          </button>
        </div>

        {/* Step indicator dots */}
        <div className="flex items-center justify-center gap-1.5 py-3 border-b border-subtle flex-shrink-0">
          {GUIDE_STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrentStep(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentStep
                  ? 'w-6 bg-accent'
                  : i < currentStep
                  ? 'w-1.5 bg-accent/40'
                  : 'w-1.5 bg-white/10'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
          {step.content}
        </div>

        {/* Footer navigation */}
        <div className="flex items-center justify-between p-5 border-t border-subtle flex-shrink-0">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white disabled:opacity-30 disabled:hover:text-white/50 transition-colors"
          >
            <ChevronLeft size={14} /> Previous
          </button>

          <div className="flex items-center gap-2">
            {GUIDE_STEPS.map((s, i) => {
              const Icon = s.icon
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentStep(i)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    i === currentStep
                      ? 'bg-accent/15 border border-accent/30 text-accent'
                      : 'bg-surface-2 border border-subtle text-white/30 hover:text-white/50'
                  }`}
                  title={s.title}
                >
                  <Icon size={13} />
                </button>
              )
            })}
          </div>

          {currentStep < GUIDE_STEPS.length - 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="flex items-center gap-1.5 text-sm text-accent font-semibold hover:gap-2.5 transition-all"
            >
              Next <ChevronRight size={14} />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 text-sm bg-accent text-surface-0 font-bold px-4 py-2 rounded-lg hover:bg-accent-dim transition-colors"
            >
              Got It
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
