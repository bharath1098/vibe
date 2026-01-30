import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProjectOverview from './components/ProjectOverview'
import ContactUs from './components/ContactUs'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ProjectOverview />
      <ContactUs />
      <Footer />
    </div>
  )
}

export default App

