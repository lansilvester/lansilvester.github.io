let audioCtx = null

function getCtx() {
  if (!audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return null
    audioCtx = new Ctx()
  }
  if (audioCtx.state === 'suspended') audioCtx.resume()
  return audioCtx
}

function playBell(ctx) {
  const t = ctx.currentTime
  const master = ctx.createGain()
  master.gain.setValueAtTime(0.0001, t)
  master.gain.exponentialRampToValueAtTime(0.35, t + 0.01)
  master.gain.exponentialRampToValueAtTime(0.0001, t + 0.8)
  master.connect(ctx.destination)

  const partials = [
    { freq: 880, gain: 1, type: 'sine' },
    { freq: 1760, gain: 0.4, type: 'triangle' },
    { freq: 2640, gain: 0.18, type: 'sine' },
  ]

  partials.forEach(({ freq, gain, type }) => {
    const osc = ctx.createOscillator()
    osc.type = type
    osc.frequency.setValueAtTime(freq, t)
    const g = ctx.createGain()
    g.gain.value = gain
    osc.connect(g).connect(master)
    osc.start(t)
    osc.stop(t + 0.8)
  })
}

function playBulb(ctx) {
  const t = ctx.currentTime

  const pop = ctx.createBufferSource()
  const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.06, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2)
  }
  const popGain = ctx.createGain()
  popGain.gain.setValueAtTime(0.4, t)
  popGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06)
  pop.connect(popGain).connect(ctx.destination)
  pop.start(t)

  const hum = ctx.createOscillator()
  hum.type = 'sine'
  hum.frequency.setValueAtTime(120, t + 0.03)
  const humGain = ctx.createGain()
  humGain.gain.setValueAtTime(0.0001, t + 0.03)
  humGain.gain.exponentialRampToValueAtTime(0.05, t + 0.12)
  humGain.gain.setValueAtTime(0.05, t + 0.4)
  humGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.55)
  hum.connect(humGain).connect(ctx.destination)
  hum.start(t)
  hum.stop(t + 0.6)
}

export default function playModeSound(mode) {
  try {
    const ctx = getCtx()
    if (!ctx) return
    if (mode === 'creative') playBell(ctx)
    else playBulb(ctx)
  } catch {
    // abaikan error audio (autoplay block, dll)
  }
}
