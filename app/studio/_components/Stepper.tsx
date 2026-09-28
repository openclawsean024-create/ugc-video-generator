'use client'

type Step = {
  label: string
  state: 'done' | 'current' | 'future'
}

type StepperProps = {
  steps: readonly Step[]
}

export function Stepper({ steps }: StepperProps) {
  return (
    <div
      role="list"
      aria-label="創作步驟"
      className="flex items-stretch gap-2 overflow-x-auto py-3 px-3 border border-line rounded-xl bg-panel"
    >
      {steps.map((step, idx) => {
        const isLast = idx === steps.length - 1
        const num =
          step.state === 'done' ? '✓' : step.state === 'current' ? String(idx + 1) : String(idx + 1)
        const tone =
          step.state === 'done'
            ? 'bg-purple-soft text-purple'
            : step.state === 'current'
              ? 'bg-purple text-white'
              : 'bg-line text-muted'
        return (
          <div key={step.label} role="listitem" className="flex items-stretch flex-1 min-w-fit">
            <div
              className={`flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold px-2 py-1 rounded-md whitespace-nowrap ${tone}`}
            >
              <span className="inline-grid place-items-center w-5 h-5 rounded-full bg-white/40 text-[11px] font-bold">
                {num}
              </span>
              {step.label}
            </div>
            {!isLast && (
              <div
                aria-hidden="true"
                className="flex-1 mx-1 self-center min-w-[10px] h-px bg-line"
              />
            )}
          </div>
        )
      })}
    </div>
  )
}