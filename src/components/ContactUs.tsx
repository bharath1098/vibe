import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react'
import { useState } from 'react'

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  message: string
  investing: boolean
  partnership: boolean
}

const ContactUs = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    investing: false,
    partnership: false,
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      // Shake animation for errors
      const form = e.currentTarget as HTMLFormElement
      form.style.animation = 'shake 0.5s'
      setTimeout(() => {
        form.style.animation = ''
      }, 500)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Google Sheets integration via Apps Script Web App
      // Set VITE_GOOGLE_SHEETS_URL in your .env file or use the default
      const scriptURL = import.meta.env.VITE_GOOGLE_SHEETS_URL || 'https://script.google.com/macros/s/AKfycbxAeqtd6po7ou_e7tQP47Uv9yZ-uEFigKjnIaN1QxgoNkS-rjsNU7YERW4SDjMBUlmI/exec'
      
      console.log('Submitting form to:', scriptURL)
      console.log('Form data:', formData)
      
      // Prepare form data
      const formFields = {
        timestamp: new Date().toISOString(),
        name: formData.name || '',
        email: formData.email || '',
        phone: formData.phone || '',
        company: formData.company || '',
        message: formData.message || '',
        investing: formData.investing ? 'true' : 'false',
        partnership: formData.partnership ? 'true' : 'false',
      }

      // Build URL-encoded string for POST
      const formBody = Object.entries(formFields)
        .map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(String(value)))
        .join('&')

      console.log('Form body:', formBody)

      // Try POST first, then fallback to GET if needed
      try {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', scriptURL, true)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        
        await new Promise((resolve) => {
          xhr.onload = function() {
            console.log('POST Response:', xhr.status, xhr.responseText)
            resolve(xhr.responseText)
          }
          
          xhr.onerror = function() {
            console.log('POST failed, trying GET fallback...')
            // Fallback to GET method
            const queryString = Object.entries(formFields)
              .map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(String(value)))
              .join('&')
            
            // Use hidden iframe for GET request
            const iframe = document.createElement('iframe')
            iframe.style.display = 'none'
            iframe.src = scriptURL + '?' + queryString
            document.body.appendChild(iframe)
            
            setTimeout(() => {
              if (iframe.parentNode) {
                document.body.removeChild(iframe)
              }
            }, 3000)
            
            resolve('')
          }
          
          xhr.send(formBody)
          
          // Timeout after 5 seconds
          setTimeout(() => {
            if (xhr.readyState !== 4) {
              console.log('POST timeout, trying GET fallback...')
              const queryString = Object.entries(formFields)
                .map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(String(value)))
                .join('&')
              
              const iframe = document.createElement('iframe')
              iframe.style.display = 'none'
              iframe.src = scriptURL + '?' + queryString
              document.body.appendChild(iframe)
              
              setTimeout(() => {
                if (iframe.parentNode) {
                  document.body.removeChild(iframe)
                }
              }, 3000)
            }
          }, 5000)
        })
      } catch (error) {
        console.log('Error submitting form:', error)
        // Fallback to GET
        const queryString = Object.entries(formFields)
          .map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(String(value)))
          .join('&')
        
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = scriptURL + '?' + queryString
        document.body.appendChild(iframe)
        
        setTimeout(() => {
          if (iframe.parentNode) {
            document.body.removeChild(iframe)
          }
        }, 3000)
      }

      // Wait a moment for the submission to complete
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        investing: false,
        partnership: false,
      })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error) {
      setIsSubmitting(false)
      setSubmitStatus('error')
      console.error('Error submitting form:', error)
    }
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Interested in partnering or investing? Let's talk!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Email</p>
                    <a 
                      href="mailto:info@kandala.travel" 
                      className="text-primary hover:text-blue-700 transition-colors"
                    >
                      info@kandala.travel
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Phone</p>
                    <a 
                      href="tel:+919876543210" 
                      className="text-primary hover:text-blue-700 transition-colors"
                    >
                      +91 9876543210
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Office Locations</p>
                    <p className="text-gray-600">
                      Amsterdam, Netherlands<br />
                      Global presence across 43 countries
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="bg-gray-50 rounded-2xl p-8 shadow-lg"
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company / Organization
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Acme Corp"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tell us about your interest..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.investing}
                    onChange={(e) => setFormData({ ...formData, investing: e.target.checked })}
                    className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">Interested in investing</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.partnership}
                    onChange={(e) => setFormData({ ...formData, partnership: e.target.checked })}
                    className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">Interested in partnership</span>
                </label>
              </div>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800"
                >
                  Thank you! We'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800"
                >
                  Something went wrong. Please try again later.
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
      `}</style>
    </section>
  )
}

export default ContactUs

