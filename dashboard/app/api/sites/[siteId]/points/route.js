import dbConnect from '@/lib/db'
import AnalysisPoint from '@/models/AnalysisPoint'
import CrackRecord from '@/models/CrackRecord'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  try {
    await dbConnect()
    const points = await AnalysisPoint.find({ siteId: params.siteId }).sort({ createdAt: -1 }).lean()

    const pointsWithStats = await Promise.all(
      points.map(async (point) => {
        const records = await CrackRecord.find({ pointId: point._id })
          .sort({ inspectionDate: -1 })
          .lean()

        const latest = records[0] || null

        return {
          ...point,
          recordCount: records.length,
          latestRecord: latest,
        }
      })
    )

    return NextResponse.json({ points: pointsWithStats })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req, { params }) {
  try {
    await dbConnect()
    const body = await req.json()
    const point = await AnalysisPoint.create({ ...body, siteId: params.siteId })
    return NextResponse.json({ point }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
