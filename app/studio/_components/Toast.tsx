'use client'

type ToastProps = {
  message: string | null
}

export function Toast({ message }: ToastProps) {
  const visible = message !== null && message.length > 0
  return (
    <div
      role="status"
      aria-live="polite"
      aria-hidden={!visible}
      className={`fixed left-1/2 -translate-x-1/2 bottom-6 z-50 px-4 py-2 rounded-full text-[12px] font-semibold shadow-lg transition-all duration-200 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      } bg-dark text-white`}
    >
      {visible ? message : ''}
    </div>
  )
}