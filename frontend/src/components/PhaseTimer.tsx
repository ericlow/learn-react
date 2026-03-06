import { useState, useEffect, useRef, useCallback } from 'react'

type Phase = 1 | 2 | 3 | 4

const PHASE_DURATIONS: Record<Phase, number> = {
  1: 10,
  2: 25,
  3: 25,
  4: 30,
}

const PHASE_LABELS: Record<Phase, string> = {
  1: 'Phase 1',
  2: 'Phase 2',
  3: 'Phase 3',
  4: 'Phase 4',
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${pad(m)}:${pad(s)}`
}

function beep(frequency: number, duration: number) {
  try {
    const ctx = new AudioContext()
    const oscillator = ctx.createOscillator()
    const gain = ctx.createGain()
    oscillator.connect(gain)
    gain.connect(ctx.destination)
    oscillator.frequency.value = frequency
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + duration)
  } catch {
    // AudioContext not available
  }
}

export default function PhaseTimer() {
  const [open, setOpen] = useState(false)
  const [phase, setPhase] = useState<Phase>(1)
  const [totalSeconds, setTotalSeconds] = useState(PHASE_DURATIONS[1] * 60)
  const [remaining, setRemaining] = useState(PHASE_DURATIONS[1] * 60)
  const [running, setRunning] = useState(false)
  const fiveMinAlertFired = useRef(false)
  const doneAlertFired = useRef(false)

  const reset = useCallback((p: Phase) => {
    const secs = PHASE_DURATIONS[p] * 60
    setTotalSeconds(secs)
    setRemaining(secs)
    setRunning(false)
    fiveMinAlertFired.current = false
    doneAlertFired.current = false
  }, [])

  useEffect(() => {
    reset(phase)
  }, [phase, reset])

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 0) {
          if (!doneAlertFired.current) {
            doneAlertFired.current = true
            beep(880, 0.6)
            setTimeout(() => beep(880, 0.6), 700)
          }
          return 0
        }
        const next = prev - 1
        if (next === 5 * 60 && !fiveMinAlertFired.current) {
          fiveMinAlertFired.current = true
          beep(660, 0.4)
        }
        return next
      })
    }, 1000)
    return () => clearInterval(id)
  }, [running])

  const progress = totalSeconds > 0 ? (totalSeconds - remaining) / totalSeconds : 0
  const urgent = remaining <= 5 * 60 && remaining > 0
  const done = remaining === 0

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full bg-slate-800 text-white px-3 py-2 text-sm font-mono shadow-lg hover:bg-slate-700 transition-colors"
        title="Open phase timer"
      >
        {running ? formatTime(remaining) : 'Timer'}
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-64 rounded-xl bg-slate-900 text-white shadow-2xl p-4 font-mono">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-slate-400 uppercase tracking-wide">Phase Timer</span>
        <button
          onClick={() => setOpen(false)}
          className="text-slate-400 hover:text-white text-lg leading-none"
        >
          &times;
        </button>
      </div>

      {/* Phase selector */}
      <div className="flex gap-1 mb-3">
        {([1, 2, 3, 4] as Phase[]).map((p) => (
          <button
            key={p}
            onClick={() => setPhase(p)}
            className={`flex-1 text-xs py-1 rounded transition-colors ${
              phase === p
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            P{p} ({PHASE_DURATIONS[p]}m)
          </button>
        ))}
      </div>

      <div className="text-center text-xs text-slate-400 mb-2">{PHASE_LABELS[phase]}</div>

      {/* Countdown */}
      <div
        className={`text-center text-4xl font-bold mb-3 transition-colors ${
          done ? 'text-red-400' : urgent ? 'text-yellow-400' : 'text-white'
        }`}
      >
        {formatTime(remaining)}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-slate-700 rounded-full mb-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            done ? 'bg-red-500' : urgent ? 'bg-yellow-500' : 'bg-indigo-500'
          }`}
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {done && (
        <div className="text-center text-xs text-red-400 mb-2 font-semibold">Time is up!</div>
      )}

      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={() => setRunning((r) => !r)}
          disabled={done}
          className="flex-1 text-sm py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {running ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => reset(phase)}
          className="px-3 text-sm py-1.5 rounded bg-slate-700 hover:bg-slate-600 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
