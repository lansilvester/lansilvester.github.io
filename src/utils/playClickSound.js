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

export default function playClickSound() {
  try {
    const ctx = getCtx()
    if (!ctx) return
    const t = ctx.currentTime

    const master = ctx.createGain()
    master.gain.setValueAtTime(0.0001, t)
    master.gain.exponentialRampToValueAtTime(0.15, t + 0.005)
    master.gain.exponentialRampToValueAtTime(0.0001, t + 0.12)
    master.connect(ctx.destination)

    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(880, t)
    osc.frequency.exponentialRampToValueAtTime(440, t + 0.1)
    osc.connect(master)
    osc.start(t)
    osc.stop(t + 0.12)
  } catch {
    // abaikan error audio (autoplay block, dll)
  }
}
