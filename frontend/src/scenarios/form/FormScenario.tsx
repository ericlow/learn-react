import { useState } from 'react'
import { Link } from 'react-router-dom'

// ---------------------------------------------------------------------------
// SCENARIO 4 — Form Wizard
// Read scenarios/form/README.md for the full interview brief.
// Backend: POST /users/check-email  { email: string } → { available: boolean }
// ---------------------------------------------------------------------------

interface FormData {
  name: string
  email: string
  password: string
}

export default function FormScenario() {
  const [step, setStep] = useState<1 | 2>(1)
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState<Partial<FormData>>({})

  function handleChange(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function validateStep1() {
    const newErrors: Partial<FormData> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleNext() {
    if (validateStep1()) setStep(2)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="text-slate-500 hover:text-slate-300 text-sm">
            &larr; Home
          </Link>
          <h1 className="text-2xl font-bold">Form Wizard</h1>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded font-mono">
            step {step}/2
          </span>
        </div>

        <div className="mb-4 p-3 rounded-lg border border-amber-800 bg-amber-950 text-amber-300 text-sm">
          Read <code className="font-mono">scenarios/form/README.md</code> for the interview brief
          before starting.
        </div>

        {/* --- YOUR CODE BELOW --- */}

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          {/* Step indicator */}
          <div className="flex gap-2 mb-6">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`flex-1 h-1 rounded-full ${s <= step ? 'bg-indigo-600' : 'bg-slate-700'}`}
              />
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wide">
                Step 1 — Your info
              </h2>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder="Jane Smith"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder="jane@example.com"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
              <button
                onClick={handleNext}
                className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium transition-colors"
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wide">
                Step 2 — Set password
              </h2>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder="Minimum 8 characters"
                />
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm transition-colors"
                >
                  Back
                </button>
                <button className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium transition-colors">
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
