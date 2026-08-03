import { useEffect, useRef, useState } from 'react'
import Header from './components/layout/Header'
import Home from './components/sections/Home'
import ModeSwitch from './components/sections/ModeSwitch'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Qualification from './components/sections/Qualification'
import Services from './components/sections/Services'
import Portfolio from './components/sections/Portfolio'
import ProjectInMind from './components/sections/ProjectInMind'
import Testimonial from './components/sections/Testimonial'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'
import ScrollUp from './components/layout/ScrollUp'
import { useTheme } from './hooks/useTheme'
import playModeSound from './utils/playModeSound'

const SWITCH_DURATION = 550

function App() {
  const { dark, toggle } = useTheme()
  const [mode, setMode] = useState('developer')
  const [switching, setSwitching] = useState(false)
  const switchTimer = useRef(null)

  const handleModeChange = (next) => {
    if (next === mode || switching) return
    setSwitching(true)
    setMode(next)
    playModeSound(next)
    window.clearTimeout(switchTimer.current)
    switchTimer.current = window.setTimeout(() => setSwitching(false), SWITCH_DURATION)
  }

  const modeClass = mode === 'developer' ? 'mode-developer' : 'mode-creative'

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode)
  }, [mode])

  return (
    <div>
      <Header dark={dark} onToggleTheme={toggle} />
      <main>
        <Home mode={mode} />
        <About />
        <ModeSwitch mode={mode} onChange={handleModeChange} />
        <div key={`skills-${mode}`} className={`mode-fade ${modeClass}`}>
          <Skills mode={mode} />
        </div>
        <div className={modeClass}>
          <Qualification />
        </div>
        <div key={`services-${mode}`} className={`mode-fade ${modeClass}`}>
          <Services mode={mode} />
        </div>
        <div key={`portfolio-${mode}`} className={`mode-fade ${modeClass}`}>
          <Portfolio mode={mode} />
        </div>
        <Testimonial />
        <ProjectInMind />
        <Contact />
      </main>
      <Footer />
      <ScrollUp />
    </div>
  )
}

export default App
