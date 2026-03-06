import mongoose from 'mongoose'

const AnalysisPointSchema = new mongoose.Schema({
  siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true, index: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  location: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

AnalysisPointSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.AnalysisPoint || mongoose.model('AnalysisPoint', AnalysisPointSchema)
