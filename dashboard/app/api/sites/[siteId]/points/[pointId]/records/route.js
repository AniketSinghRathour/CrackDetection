import dbConnect from '@/lib/db'
import CrackRecord from '@/models/CrackRecord'
import { getSeverity } from '@/lib/utils'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  try {
    await dbConnect()
    const records = await CrackRecord.find({ pointId: params.pointId })
      .sort({ inspectionDate: 1 })
      .lean()
    return NextResponse.json({ records })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req, { params }) {
  try {
    await dbConnect()
    const body = await req.json()
    const severity = getSeverity(body.maxWidthMm)

    const record = await CrackRecord.create({
      ...body,
      pointId: params.pointId,
      siteId: params.siteId,
      severity,
    })

    return NextResponse.json({ record }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
