import mongoose from 'mongoose'

const CrackRecordSchema = new mongoose.Schema({
  pointId: { type: mongoose.Schema.Types.ObjectId, ref: 'AnalysisPoint', required: true, index: true },
  siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true, index: true },
  inspectionDate: { type: Date, required: true },
  baselineMm: { type: Number, required: true },
  leftImageUrl: { type: String, required: true },
  rightImageUrl: { type: String, required: true },
  overlayImageUrl: { type: String },
  heatmapImageUrl: { type: String },
  // Analysis results
  scaleMmPerPixel: { type: Number },
  maxWidthMm: { type: Number },
  avgWidthMm: { type: Number },
  crackAreaMm2: { type: Number },
  severity: { type: String, enum: ['Very Fine', 'Fine', 'Medium', 'Severe'], default: 'Very Fine' },
  notes: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
})

// Delete existing model to prevent caching issues
if (mongoose.models.CrackRecord) {
  delete mongoose.models.CrackRecord
}

export default mongoose.model('CrackRecord', CrackRecordSchema)
