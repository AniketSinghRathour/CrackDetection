import dbConnect from '@/lib/db'
import Site from '@/models/Site'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  try {
    await dbConnect()
    const site = await Site.findById(params.siteId).lean()
    if (!site) return NextResponse.json({ error: 'Site not found' }, { status: 404 })
    return NextResponse.json({ site })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect()
    const body = await req.json()
    const site = await Site.findByIdAndUpdate(params.siteId, { ...body, updatedAt: new Date() }, { new: true })
    if (!site) return NextResponse.json({ error: 'Site not found' }, { status: 404 })
    return NextResponse.json({ site })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect()
    await Site.findByIdAndDelete(params.siteId)
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
