import { motion } from 'framer-motion'
import {
  Building2,
  Users,
  Globe,
  Zap,
  Shield,
  Database,
  Server,
  Code,
  Layers,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  CreditCard,
  BarChart3,
  Settings,
  Palette,
  Rocket,
  Cloud,
  Smartphone,
} from 'lucide-react'
import { useState } from 'react'

const ProjectOverview = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'subscription' | 'features'>('subscription')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="w-[80%] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Rocket className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Travibe Platform</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 mb-4">
            Platform Overview
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive multi-tenant travel booking platform empowering agents with white-label solutions
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: 'subscription', label: 'Subscription Model', icon: CreditCard },
            { id: 'architecture', label: 'Architecture', icon: Layers },
            { id: 'features', label: 'Features', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </motion.button>
            )
          })}
        </div>

        {/* Subscription Model Tab */}
        {activeTab === 'subscription' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Subscription Plans for Agents</h3>
              <p className="text-lg text-gray-600">Choose the perfect plan for your travel agency</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Starter',
                  price: '$99',
                  period: '/month',
                  description: 'Perfect for small agencies',
                  features: [
                    'White-label portal',
                    'Up to 100 bookings/month',
                    'Basic branding customization',
                    'Flight booking only',
                    'Email support',
                    'Standard API access',
                  ],
                  color: 'from-blue-500 to-blue-600',
                  popular: false,
                },
                {
                  name: 'Professional',
                  price: '$299',
                  period: '/month',
                  description: 'For growing travel businesses',
                  features: [
                    'Full white-label solution',
                    'Unlimited bookings',
                    'Advanced branding & customization',
                    'Flights + Hotels + Cars',
                    'Priority support',
                    'Advanced API access',
                    'Analytics dashboard',
                    'Multi-currency support',
                  ],
                  color: 'from-primary to-blue-700',
                  popular: true,
                },
                {
                  name: 'Enterprise',
                  price: 'Custom',
                  period: '',
                  description: 'For large agencies & corporations',
                  features: [
                    'Everything in Professional',
                    'Dedicated account manager',
                    'Custom integrations',
                    'SLA guarantee',
                    '24/7 phone support',
                    'Custom domain support',
                    'Advanced security features',
                    'Volume discounts',
                  ],
                  color: 'from-purple-500 to-purple-600',
                  popular: false,
                },
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`relative bg-white rounded-3xl shadow-xl p-8 border-2 flex flex-col ${
                    plan.popular ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h4>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${plan.color} shadow-lg hover:shadow-xl transition-all mt-auto`}
                  >
                    Get Started
                  </motion.button>
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-6 border border-accent/20"
            >
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Revenue Model
              </h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Subscription Fees</p>
                  <p className="text-gray-600">Monthly/annual subscription based on plan tier</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Transaction Fees</p>
                  <p className="text-gray-600">Small commission per booking (2-5%)</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Add-on Services</p>
                  <p className="text-gray-600">Premium features, custom integrations, training</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Architecture Tab */}
        {activeTab === 'architecture' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Architecture Diagram */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Layers className="w-6 h-6 text-primary" />
                System Architecture
              </h3>
              
              <div className="space-y-6">
                {/* Flow Diagram */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { icon: Users, label: 'Agents', color: 'bg-blue-100 text-blue-600' },
                    { icon: Globe, label: 'Subdomain', color: 'bg-purple-100 text-purple-600' },
                    { icon: Server, label: 'BFF API', color: 'bg-green-100 text-green-600' },
                    { icon: Database, label: 'Backend', color: 'bg-orange-100 text-orange-600' },
                  ].map((step, index) => {
                    const Icon = step.icon
                    return (
                      <div key={index} className="relative">
                        <div className={`${step.color} rounded-2xl p-6 text-center`}>
                          <Icon className="w-8 h-8 mx-auto mb-3" />
                          <p className="font-semibold">{step.label}</p>
                        </div>
                        {index < 3 && (
                          <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                            <ArrowRight className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Architecture Details */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                        <Smartphone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Frontend Layer</h4>
                        <p className="text-sm text-gray-600">React + TypeScript</p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        Multi-tenant detection via subdomain
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        Dynamic brand configuration
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        Real-time flight search & booking
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-6 border border-green-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                        <Server className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">BFF Layer</h4>
                        <p className="text-sm text-gray-600">Fastify + TypeScript</p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        Tenant isolation middleware
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        API request proxying
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        Security & rate limiting
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Multi-Tenant Flow */}
                <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-purple-600" />
                    Multi-Tenant Flow
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                        1
                      </div>
                      <p className="text-gray-700">Agent accesses their branded subdomain: <code className="bg-white px-2 py-1 rounded">agent.travibe.com</code></p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                        2
                      </div>
                      <p className="text-gray-700">System detects tenant ID from subdomain and loads custom branding</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                        3
                      </div>
                      <p className="text-gray-700">All API requests include tenant context for data isolation</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                        4
                      </div>
                      <p className="text-gray-700">Backend filters all data by tenant_id ensuring complete isolation</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Features Tab */}
        {activeTab === 'features' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Platform Features</h3>
              <p className="text-lg text-gray-600">Everything agents need to run their travel business</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Palette,
                  title: 'White-Label Branding',
                  description: 'Fully customizable portal with your logo, colors, and domain',
                  color: 'bg-purple-100 text-purple-600',
                },
                {
                  icon: Zap,
                  title: 'Real-Time Search',
                  description: 'Search 600+ airlines with live availability and pricing',
                  color: 'bg-yellow-100 text-yellow-600',
                },
                {
                  icon: Building2,
                  title: 'Multi-Tenant Architecture',
                  description: 'Complete data isolation with secure tenant management',
                  color: 'bg-blue-100 text-blue-600',
                },
                {
                  icon: Globe,
                  title: '43 Languages',
                  description: 'Multi-language support for global reach',
                  color: 'bg-green-100 text-green-600',
                },
                {
                  icon: Shield,
                  title: 'Secure Payments',
                  description: 'Bank-level encryption with Stripe integration',
                  color: 'bg-red-100 text-red-600',
                },
                {
                  icon: Smartphone,
                  title: 'Mobile Responsive',
                  description: 'Perfect experience on all devices',
                  color: 'bg-pink-100 text-pink-600',
                },
                {
                  icon: BarChart3,
                  title: 'Analytics Dashboard',
                  description: 'Track bookings, revenue, and customer insights',
                  color: 'bg-indigo-100 text-indigo-600',
                },
                {
                  icon: Settings,
                  title: 'API Access',
                  description: 'RESTful APIs for custom integrations',
                  color: 'bg-teal-100 text-teal-600',
                },
                {
                  icon: Cloud,
                  title: 'Cloud Infrastructure',
                  description: 'Scalable, reliable hosting with 99.9% uptime',
                  color: 'bg-cyan-100 text-cyan-600',
                },
              ].map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
                  >
                    <div className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </motion.div>
                )
              })}
            </div>

            {/* Tech Stack */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 mt-8"
            >
              <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Code className="w-6 h-6 text-primary" />
                Technology Stack
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold text-gray-900 mb-3">Frontend</p>
                  <div className="flex flex-wrap gap-2">
                    {['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Radix UI', 'React Query'].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-3">Backend</p>
                  <div className="flex flex-wrap gap-2">
                    {['Fastify', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default ProjectOverview

