import { motion } from 'framer-motion'
import { Plane, Mail } from 'lucide-react'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gradient-to-r from-white via-blue-50 to-primary shadow-xl'
          : 'bg-gradient-to-r from-white/95 via-blue-50/95 to-primary/95 backdrop-blur-md'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Name - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Plane className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-heading font-bold text-gray-900">
              Travibe
            </span>
          </motion.div>

          {/* Contact Us Button - Right Side */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={scrollToContact}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-2.5 md:px-8 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 bg-gradient-to-r from-accent via-yellow-400 to-yellow-500 text-gray-900 shadow-xl hover:shadow-2xl hover:from-yellow-300 hover:via-yellow-400 hover:to-accent"
          >
            <Mail className="w-4 h-4 md:w-5 md:h-5" />
            <span>Contact Us</span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar

