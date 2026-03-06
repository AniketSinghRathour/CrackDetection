import dbConnect from '@/lib/db'
import AnalysisPoint from '@/models/AnalysisPoint'
import CrackRecord from '@/models/CrackRecord'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  try {
    await dbConnect()
    const point = await AnalysisPoint.findById(params.pointId).lean()
    if (!point) return NextResponse.json({ error: 'Point not found' }, { status: 404 })

    const records = await CrackRecord.find({ pointId: params.pointId })
      .sort({ inspectionDate: 1 })
      .lean()

    return NextResponse.json({ point, records })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect()
    const body = await req.json()
    const point = await AnalysisPoint.findByIdAndUpdate(
      params.pointId,
      { ...body, updatedAt: new Date() },
      { new: true }
    )
    if (!point) return NextResponse.json({ error: 'Point not found' }, { status: 404 })
    return NextResponse.json({ point })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect()
    await AnalysisPoint.findByIdAndDelete(params.pointId)
    await CrackRecord.deleteMany({ pointId: params.pointId })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
