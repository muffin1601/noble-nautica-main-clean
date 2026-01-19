import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY!)
const ADMIN_EMAIL = "noblenautica13@gmail.com"

export async function POST(request: NextRequest) {
  try {
    console.log(" Contact request API HIT")

    const data = await request.json()
    const { name, email, mobile, enquiry, message } = data

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      )
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // OPTIONAL: save to DB
    await supabase.from("contact_requests").insert([
      { name, email, mobile, enquiry, message }
    ])

    // -------- USER EMAIL --------
    await resend.emails.send({
      from: "Noble Nautica <no-reply@noblenautica.co.uk>",
      to: email,
      subject: "Thank you for contacting Noble Nautica 💙",
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for getting in touch with <strong>Noble Nautica</strong>.</p>
        <p>Our team will review your message and respond shortly.</p>
        <br/>
        <p>Warm regards,<br/>Team Noble Nautica</p>
      `,
    })

    // -------- ADMIN EMAIL --------
    await resend.emails.send({
      from: "Noble Nautica <no-reply@noblenautica.co.uk>",
      to: ADMIN_EMAIL,
      subject: "📩 New Contact Enquiry",
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Enquiry:</strong> ${enquiry}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error(" Contact API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
