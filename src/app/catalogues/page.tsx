"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/sections/footer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { getCategoriesWithCounts, sortCategoriesCustomOrder } from "@/lib/products"

interface Category {
    id: number
    name: string
    slug: string
    image: string
    description: string | null
}

export default function CataloguesPage() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)

    const [open, setOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

    const [formData, setFormData] = useState({
        name: "",
        number: "",
        email: "",
        location: "",
    })


    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true)
                const data = await getCategoriesWithCounts()

                const mapped = data.map(cat => ({
                    id: cat.id,
                    name: cat.name,
                    slug: cat.slug,
                    image: cat.image || "/pool.svg",
                    description: cat.description,
                }))

                setCategories(sortCategoriesCustomOrder(mapped))
            } catch (err) {
                console.error("Failed to load catalogues:", err)
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedCategory) return

        await fetch("/api/catalogue-request", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...formData,
                category: selectedCategory.slug,
                timestamp: new Date().toISOString(),
            }),
        })

        const link = document.createElement("a")
        link.href = `/api/catalogue?category=${encodeURIComponent(selectedCategory.slug)}`
        link.download = "catalogue.pdf"
        link.click()

        setOpen(false)
        setFormData({ name: "", number: "", email: "", location: "" })
    }

    return (
        <main className="min-h-screen">
            <Navbar />

            <div className="relative h-[50vh] w-full bg-cover bg-center"
                style={{ backgroundImage: `url("/productbg.webp")` }}
            >

                <div className="absolute inset-0 bg-[#0b1c2d]/70" />


                <div className="relative flex items-center justify-center h-full px-6 text-center">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            Our Product Catalogues
                        </h1>
                        <p className="text-lg md:text-xl text-[#FBF5E4]">
                            Download detailed catalogues for each product category
                        </p>
                    </div>
                </div>
            </div>


            <div className="max-w-7xl mx-auto px-4 py-16">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} className="h-64 rounded-xl" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map(cat => (
                            <div
                                key={cat.id}
                                className="border-2 border-[#385785] rounded-xl p-6 flex flex-col"
                            >
                                <div className="flex justify-center mb-4">
                                    <div className="w-32 h-32 rounded-full bg-white border flex items-center justify-center">
                                        <Image
                                            unoptimized
                                            src={cat.image}
                                            alt={cat.name}
                                            width={80}
                                            height={80}
                                            className="object-contain"
                                        />
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-center text-[#385785] mb-2">
                                    {cat.name}
                                </h3>

                                {cat.description && (
                                    <p className="text-sm text-slate-600 text-center mb-4 line-clamp-3">
                                        {cat.description}
                                    </p>
                                )}

                                <Button
                                    className="mt-auto bg-[#385785]"
                                    onClick={() => {
                                        setSelectedCategory(cat)
                                        setOpen(true)
                                    }}
                                >
                                    Download Catalogue
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* LEAD FORM */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md rounded-xl">

                    {/* Header */}
                    <DialogHeader className="space-y-2 text-center">
                        <DialogTitle className="text-2xl font-semibold">
                            Download {selectedCategory?.name} Catalogue
                        </DialogTitle>
                        <p className="text-sm text-muted-foreground">
                            Fill in your details to get instant access
                        </p>
                    </DialogHeader>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4 mt-4"
                    >
                        {/* Name */}
                        <div className="space-y-1">
                            <Label className="text-sm">Full Name</Label>
                            <Input
                                placeholder="Enter your full name"
                                required
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-1">
                            <Label className="text-sm">Phone Number</Label>
                            <Input
                                placeholder="Enter your phone number"
                                required
                                onChange={(e) =>
                                    setFormData({ ...formData, number: e.target.value })
                                }
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                            <Label className="text-sm">Email Address</Label>
                            <Input
                                type="email"
                                placeholder="you@example.com"
                                required
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                            />
                        </div>

                        {/* Location */}
                        <div className="space-y-1">
                            <Label className="text-sm">Location</Label>
                            <Input
                                placeholder="City, State"
                                required
                                onChange={(e) =>
                                    setFormData({ ...formData, location: e.target.value })
                                }
                            />
                        </div>

                        {/* CTA */}
                        <Button
                            type="submit"
                            className="w-full bg-[#385785] hover:bg-[#2f4a6b] text-white font-medium py-2.5 rounded-lg"
                        >
                            Submit & Download
                        </Button>


                    </form>
                </DialogContent>
            </Dialog>

            <Footer />
        </main>
    )
}
