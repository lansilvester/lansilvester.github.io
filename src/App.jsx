import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import Header from './components/layout/Header'
import Home from './components/sections/Home'
import ModeSwitch from './components/sections/ModeSwitch'
import About from './components/sections/About'
import Footer from './components/layout/Footer'
import ScrollUp from './components/layout/ScrollUp'
import WhatsAppFloat from './components/layout/WhatsAppFloat'
import { useTheme } from './hooks/useTheme'
import playModeSound from './utils/playModeSound'
import { LAYOUT } from './data/content'
import site from './data/site.json'

const Skills = lazy(() => import('./components/sections/Skills'))
const Qualification = lazy(() => import('./components/sections/Qualification'))
const Services = lazy(() => import('./components/sections/Services'))
const Portfolio = lazy(() => import('./components/sections/Portfolio'))
const Pricing = lazy(() => import('./components/sections/Pricing'))
const ProjectInMind = lazy(() => import('./components/sections/ProjectInMind'))
const Contact = lazy(() => import('./components/sections/Contact'))
const BlogList = lazy(() => import('./components/blog/BlogList'))

const SWITCH_DURATION = 550

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function HomeSections({ mode, onModeChange }) {
  const modeClass = mode === 'developer' ? 'mode-developer' : 'mode-creative'

  const sections = {
    home: <Home mode={mode} />,
    about: <About mode={mode} />,
    modeswitch: <ModeSwitch mode={mode} onChange={onModeChange} />,
    skills: (
      <div key={`skills-${mode}`} className={`mode-fade ${modeClass}`}>
        <Skills mode={mode} />
      </div>
    ),
    qualification: <Qualification />,
    services: (
      <div key={`services-${mode}`} className={`mode-fade ${modeClass}`}>
        <Services mode={mode} />
      </div>
    ),
    portfolio: (
      <div key={`portfolio-${mode}`} className={`mode-fade ${modeClass}`}>
        <Portfolio mode={mode} />
      </div>
    ),
    blog: (
      <div key="blog">
        <BlogList />
      </div>
    ),
    pricing: <Pricing />,
    cta: <ProjectInMind />,
    contact: <Contact />,
  }

  return (
    <main>
      {LAYOUT.sections
        .filter((s) => s.enabled)
        .map((s) => (
          <Suspense fallback={null} key={s.id}>
            {sections[s.id]}
          </Suspense>
        ))}
    </main>
  )
}

function App() {
  const { dark, toggle } = useTheme()
  const [mode, setMode] = useState('developer')
  const [switching, setSwitching] = useState(false)
  const switchTimer = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === '/') document.title = site.title
  }, [pathname])

  const handleModeChange = (next) => {
    if (next === mode || switching) return
    setSwitching(true)
    setMode(next)
    playModeSound(next)
    window.clearTimeout(switchTimer.current)
    switchTimer.current = window.setTimeout(() => setSwitching(false), SWITCH_DURATION)
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode)
  }, [mode])

  return (
    <div>
      <ScrollToTop />
      <Header dark={dark} onToggleTheme={toggle} mode={mode} />
      <Routes>
        <Route path="/" element={<HomeSections mode={mode} onModeChange={handleModeChange} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <ScrollUp />
      <WhatsAppFloat />
    </div>
  )
}

export default App
