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
        className="relative h-[70vh] w-full bg-cover bg-center flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: `url("/contactbg.webp")` }}
      >
       
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Get In Touch
          </h1>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg">
            Ready to transform your aquatic space? Let’s discuss your project and find
            the perfect solutions.
          </p>

          {/* Contact Card */}
          <a
            href="mailto:noblenautica13@gmail.com"
            className="mt-6 flex flex-col items-center text-center px-8 py-6 rounded-xl border border-[#385785]/40 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300"
          >
            <h3 className="text-[#6fa3ff] text-lg sm:text-xl font-semibold">
              Send a Mail
            </h3>

            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              General enquiries
            </p>

            <p className="text-white text-base sm:text-lg font-medium mt-2">
              noblenautica13@gmail.com
            </p>
          </a>
        </div>
      </section>

      {/* Location Section */}
      {/* <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
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
      </section> */}

      {/* Contact Form Section */}
      <section className="py-12 sm:py-16 md:py-10 lg:py-0">
        <ContactForm />
      </section>

      <Footer />
    </main>
  )
}
