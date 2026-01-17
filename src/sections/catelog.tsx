"use client"

import { useState, ChangeEvent, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const CATALOGUE_DOWNLOAD_URL =
  "https://drive.google.com/uc?export=download&id=13LQcai_vrwLP3Sl9wr492bdqNxxX35iW"

const Catelog = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    location: ""
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.name || !formData.number || !formData.email || !formData.location) {
      alert("Please fill in all fields")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/catalogue-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          productName: "Catalogue (General)",
          timestamp: new Date().toISOString()
        })
      })

      if (!response.ok) throw new Error("Submission failed")

      window.open(CATALOGUE_DOWNLOAD_URL, "_blank")

      setDialogOpen(false)
      setFormData({ name: "", number: "", email: "", location: "" })

      alert("Thank you! Your catalogue download has started.")
    } catch (error) {
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex px-4 sm:px-6 lg:px-0 items-center justify-center py-12">
      <div className="bg-[#6384AA] max-w-7xl gap-8 mx-auto text-white p-4 md:p-6 lg:p-8 rounded-xl shadow-lg flex flex-col lg:flex-row items-center w-full">
        <div className="w-full lg:w-1/2 p-2 md:p-4">
          <h2 className="text-xl md:text-2xl lg:text-5xl font-bold mb-4">
            Our Catalogue
          </h2>
          <p className="mb-4 text-sm md:text-lg">
            Our digital catalogue redefines product discovery, visually immersive,
            technically robust, and intuitively structured. From spec sheets to
            standout visuals, everything you need to specify with confidence, all
            in one place.
          </p>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#385785] text-lg text-white px-6 md:px-12 py-3 md:py-8 rounded w-full sm:w-auto">
                Download Now
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Download Catalogue</DialogTitle>
                <DialogDescription>
                  Please fill in your details to download the catalogue.
                </DialogDescription>
              </DialogHeader>

              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="number">Phone Number *</Label>
                  <Input
                    id="number"
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <DialogFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Download Catalogue"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <p className="mt-3 text-sm opacity-80">
            PDF • 266 MB • Download may take a few moments
          </p>
        </div>

        <div className="w-full lg:w-1/2 p-2 md:p-4 flex justify-center">
          <Image
            unoptimized
            src="/catalogue.jpg"
            width={500}
            height={400}
            alt="Catalogue Preview"
            className="object-contain w-full rounded-xl h-auto max-w-sm md:max-w-md lg:max-w-lg"
          />
        </div>
      </div>
    </div>
  )
}

export default Catelog
