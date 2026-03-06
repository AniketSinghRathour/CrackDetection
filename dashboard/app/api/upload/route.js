import { uploadToCloudinary } from '@/lib/cloudinary'
import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const formData = await req.formData()
    const leftFile = formData.get('left')
    const rightFile = formData.get('right')

    if (!leftFile || !rightFile) {
      return NextResponse.json({ error: 'Both left and right images are required' }, { status: 400 })
    }

    const leftBuffer = Buffer.from(await leftFile.arrayBuffer())
    const rightBuffer = Buffer.from(await rightFile.arrayBuffer())

    const [leftResult, rightResult] = await Promise.all([
      uploadToCloudinary(leftBuffer, { folder: 'crack-monitor/stereo' }),
      uploadToCloudinary(rightBuffer, { folder: 'crack-monitor/stereo' }),
    ])

    return NextResponse.json({
      leftUrl: leftResult.secure_url,
      rightUrl: rightResult.secure_url,
    })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
