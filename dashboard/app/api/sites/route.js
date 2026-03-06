import dbConnect from '@/lib/db'
import Site from '@/models/Site'
import AnalysisPoint from '@/models/AnalysisPoint'
import CrackRecord from '@/models/CrackRecord'
import { getSeverity } from '@/lib/utils'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await dbConnect()
    const sites = await Site.find({}).sort({ createdAt: -1 }).lean()

    // For each site, compute stats
    const sitesWithStats = await Promise.all(
      sites.map(async (site) => {
        const points = await AnalysisPoint.find({ siteId: site._id }).lean()
        const pointIds = points.map((p) => p._id)

        const records = await CrackRecord.find({ pointId: { $in: pointIds } }).lean()

        // Latest record per point
        const latestByPoint = {}
        for (const rec of records) {
          const pid = rec.pointId.toString()
          if (!latestByPoint[pid] || new Date(rec.inspectionDate) > new Date(latestByPoint[pid].inspectionDate)) {
            latestByPoint[pid] = rec
          }
        }

        let severe = 0, medium = 0, fine = 0, veryFine = 0
        for (const rec of Object.values(latestByPoint)) {
          if (rec.severity === 'Severe') severe++
          else if (rec.severity === 'Medium') medium++
          else if (rec.severity === 'Fine') fine++
          else veryFine++
        }

        return {
          ...site,
          stats: {
            totalPoints: points.length,
            totalAnalyses: records.length,
            severe,
            medium,
            fine,
            veryFine,
          },
        }
      })
    )

    return NextResponse.json({ sites: sitesWithStats })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    await dbConnect()
    const body = await req.json()
    const site = await Site.create(body)
    return NextResponse.json({ site }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
