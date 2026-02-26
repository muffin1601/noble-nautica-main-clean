import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

const ADMIN_EMAIL = 'noblenautica13@gmail.com' 

interface CatalogueRequestData {
  name: string
  number: string
  email: string
  location: string
  productId: number
  productName: string
  timestamp: string
}

export async function POST(request: NextRequest) {
  try {
    console.log(' Catalogue request API HIT')

    const data: CatalogueRequestData = await request.json()

    console.log(' Incoming data:', data)
    console.log(' User email:', data.email)

    // Validate required fields
    if (!data.name || !data.number || !data.email || !data.location) {
      console.warn(' Validation failed')
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Initialize Supabase client
    console.log(' Initializing Supabase client')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    console.log(' Saving catalogue request to DB')

    const { error } = await supabase
      .from('catalogue_requests')
      .insert([
        {
          name: data.name,
          phone: data.number,
          email: data.email,
          location: data.location,
          product_id: data.productId,
          product_name: data.productName,
        }
      ])

    if (error) {
      console.error(' Supabase insert error:', error)
      return NextResponse.json(
        { error: 'Failed to save catalogue request' },
        { status: 500 }
      )
    }

    console.log(' Catalogue request saved successfully')

    // ---------------- USER EMAIL ----------------
    console.log(' Sending email to user')

    const userEmailResponse = await resend.emails.send({
      from: 'Noble Nautica <no-reply@noblenautica.co.uk>',
      to: data.email,
      subject: 'Thank You for Connecting with Noble Nautica 💙',
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #222;">
          <h2>Hello ${data.name},</h2>

          <p>
            Thank you for sharing your details with <strong>Noble Nautica</strong>!
            We truly appreciate your interest and the time you took to reach out.
          </p>

          <p>
            We’re passionate about delivering <strong>premium maritime-inspired products</strong>
            that combine quality, style, and durability — just like the heritage behind Noble Nautica.
          </p>

          <p>
            👉 <a href="https://github.com/muffin1601/noble-nautica-main-clean/releases/download/catalogue-v1/Noble.Nautica.Catlog.1.pdf" target="_blank" style="color:#0a5bd3; font-weight:600;">
              Browse our catalog & collections
            </a>
          </p>

          <p>
            Our team will review your request and be in touch soon.
            If you have any questions, just reply to this email.
          </p>

          <br/>
          <p>
            Warm regards,<br/>
            <strong>Team Noble Nautica</strong><br/>
            <em>Crafted with Quality. Inspired by the Sea. 🌊</em>
          </p>
        </div>
      `,
    })

    console.log(' User email response:', userEmailResponse)

    if (userEmailResponse.error) {
      console.error(' User email error:', userEmailResponse.error)
    }

    // ---------------- ADMIN EMAIL ----------------
    console.log(' Sending email to admin')

    const adminEmailResponse = await resend.emails.send({
      from: 'Noble Nautica <no-reply@noblenautica.co.uk>',
      to: ADMIN_EMAIL,
      subject: 'New Catalogue Request Received - Noble Nautica 🛥️',
      html: `
        <h2>New Catalogue Request</h2>

        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.number}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Product:</strong> ${data.productName}</p>

        <br/>
        <p>This enquiry was submitted from the website.</p>
      `,
    })

    console.log(' Admin email response:', adminEmailResponse)

    if (adminEmailResponse.error) {
      console.error(' Admin email error:', adminEmailResponse.error)
    }

    // ------------------------------------------------

    return NextResponse.json(
      {
        success: true,
        message: 'Catalogue request submitted successfully'
      },
      { status: 200 }
    )

  } catch (error) {
    console.error(' Unhandled error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
