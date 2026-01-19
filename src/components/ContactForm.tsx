"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, CheckCircle, XCircle } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    enquiry: "",
    message: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] =
    useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString()
        })
      })

      if (!response.ok) throw new Error("Submission failed")

      setSubmitStatus("success")
      setFormData({
        name: "",
        email: "",
        mobile: "",
        enquiry: "",
        message: ""
      })
    } catch (error) {
      console.error(error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="h-fit lg:min-h-screen flex items-center justify-center p-4 py-6">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#385785] mb-2">
            Get in Touch
          </h1>
        </div>

        <div className="bg-[#C7DAE7] rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="mb-6">
            <p className="text-slate-600 text-lg italic mb-2">Partnership</p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-700">
              Send your message
            </h2>
          </div>

          {submitStatus === "success" && (
            <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-800">
                Message sent successfully! We&apos;ll get back to you soon.
              </span>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg flex items-center space-x-2">
              <XCircle className="h-5 w-5 text-red-600" />
              <span className="text-red-800">
                Failed to send message. Please try again.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleInputChange}
              />
              <Input
                name="enquiry"
                placeholder="Type of Enquiry"
                value={formData.enquiry}
                onChange={handleInputChange}
              />
            </div>

            <Textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleInputChange}
              rows={6}
              required
            />

            <div className="flex justify-center pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
