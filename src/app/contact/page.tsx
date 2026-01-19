import Navbar from "@/components/navbar"
import Footer from "@/sections/footer"
import ContactForm from "@/components/ContactForm"
import StructuredData from "@/components/structured-data"

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <StructuredData type="contact" data={{}} />
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative h-[50vh] w-full bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url("/contactbg.webp")` }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Get In Touch
          </h1>
          <p className="text-white text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Ready to transform your aquatic space? Let&apos;s discuss your project
            and find the perfect solutions.
          </p>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#385785] mb-4 sm:mb-6">
              Our Location
            </h2>
            <p className="text-[#385785] text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Find the perfect solutions for your pool needs. We&apos;re here to
              help you create the aquatic space of your dreams.
            </p>
          </div>

          <div className="grid grid-cols-1 justify-items-center max-w-6xl mx-auto">
            <a
              href="mailto:noblenautica13@gmail.com"
              className="flex flex-col items-center text-center p-6 sm:p-8 border-t border-[#385785]"
            >
              <h3 className="text-[#385785] text-lg sm:text-xl font-semibold">
                Send a Mail
              </h3>
              <p className="text-[#385785] text-xs sm:text-sm opacity-80">
                General enquiries
              </p>
              <p className="text-[#385785] text-base sm:text-lg font-semibold">
                noblenautica13@gmail.com
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <ContactForm />
      </section>

      <Footer />
    </main>
  )
}
