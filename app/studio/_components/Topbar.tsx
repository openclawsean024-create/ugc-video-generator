'use client'

type TopbarProps = {
  onToast: (message: string) => void
}

export function Topbar({ onToast }: TopbarProps) {
  return (
    <header className="h-[68px] md:h-[68px] border-b border-line px-5 md:px-6 flex items-center justify-between bg-panel">
      <div className="text-[13px] text-muted">
        創作空間　/　<b className="text-ink">建立影片</b>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-[11px] font-semibold tracking-wider px-2.5 py-1 rounded-full bg-purple-soft text-purple">
          ✦ 試用方案
        </span>
        <button
          type="button"
          onClick={() => onToast('說明中心：原型示意（demo）')}
          className="hidden md:inline-flex text-[13px] text-muted hover:text-ink px-3 py-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-1"
        >
          說明中心
        </button>
        <div
          aria-label="使用者 avatar"
          className="h-8 w-8 rounded-full bg-[#ffe0cd] grid place-items-center text-[14px]"
        >
          👤
        </div>
      </div>
    </header>
  )
}