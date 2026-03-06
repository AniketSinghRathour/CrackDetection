import { uploadToCloudinary } from '@/lib/cloudinary'
import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const body = await req.json()
    const { leftUrl, rightUrl, baselineMm } = body

    if (!leftUrl || !rightUrl || !baselineMm) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const FASTAPI_URL = process.env.FASTAPI_URL || 'http://127.0.0.1:8000'

    const response = await fetch(`${FASTAPI_URL}/analyze-crack`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        left_path: leftUrl,
        right_path: rightUrl,
        baseline_mm: parseFloat(baselineMm),
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      return NextResponse.json({ error: `FastAPI error: ${errText}` }, { status: 502 })
    }

    const result = await response.json()

    // Upload overlay and heatmap to Cloudinary
    let overlayUrl = null
    let heatmapUrl = null

    if (result.overlay) {
      const overlayBuffer = Buffer.from(result.overlay, 'base64')
      const overlayResult = await uploadToCloudinary(overlayBuffer, {
        folder: 'crack-monitor/overlays',
        format: 'png',
      })
      overlayUrl = overlayResult.secure_url
    }

    if (result.heatmap) {
      const heatmapBuffer = Buffer.from(result.heatmap, 'base64')
      const heatmapResult = await uploadToCloudinary(heatmapBuffer, {
        folder: 'crack-monitor/heatmaps',
        format: 'png',
      })
      heatmapUrl = heatmapResult.secure_url
    }

    return NextResponse.json({
      scaleMmPerPixel: result.scale_mm_per_pixel,
      maxWidthMm: result.max_width_mm,
      avgWidthMm: result.avg_width_mm,
      crackAreaMm2: result.crack_area_mm2,
      overlayUrl,
      heatmapUrl,
    })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
