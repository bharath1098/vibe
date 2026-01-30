import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Travel and flight booking related images
  const carouselImages = [
    {
      url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80',
      alt: 'Airplane in sky',
      title: 'Book Your Dream Flight'
    },
    {
      url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80',
      alt: 'Beautiful travel destination',
      title: 'Explore Amazing Destinations'
    },
    {
      url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80',
      alt: 'Travel adventure',
      title: 'Adventure Awaits'
    },
    {
      url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&q=80',
      alt: 'Airport terminal',
      title: 'Seamless Travel Experience'
    },
    {
      url: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=1920&q=80',
      alt: 'Tropical paradise',
      title: 'Discover Paradise'
    },
    {
      url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80',
      alt: 'Mountain travel',
      title: 'Mountain Escapes'
    }
  ]

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [carouselImages.length])

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
  }

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index)
  }

  const scrollToNext = () => {
    const nextSection = document.getElementById('flight-showcase')
    nextSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Image Carousel Background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img
              src={carouselImages[currentImageIndex].url}
              alt={carouselImages[currentImageIndex].alt}
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* Light overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 transition-all duration-300 group"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:text-accent transition-colors" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 transition-all duration-300 group"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:text-accent transition-colors" />
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? 'w-8 bg-accent'
                : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>


      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Heading with Gradient Text */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-4 text-balance leading-tight"
          >
            <span className="text-white drop-shadow-lg">
              Where Every
            </span>
            <br />
            <span className="text-accent drop-shadow-lg">
              Journey Begins
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-2 font-normal tracking-wide"
          >
            Revolutionizing Travel with
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl text-accent font-semibold mb-8 tracking-wide"
          >
            Cutting-Edge Technology
          </motion.p>


        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-accent transition-colors z-20"
        aria-label="Scroll to next section"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.button>
    </section>
  )
}

export default Hero

