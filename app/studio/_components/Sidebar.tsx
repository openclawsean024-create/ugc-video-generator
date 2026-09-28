'use client'

type SidebarProps = {
  onToast: (message: string) => void
}

const NAV_ITEMS = [
  { id: 'create', label: '建立影片', icon: '✦', active: true },
  { id: 'works', label: '我的作品', icon: '▤', active: false },
  { id: 'creators', label: '創作者庫', icon: '◉', active: false },
  { id: 'brand', label: '品牌素材', icon: '▧', active: false },
] as const

export function Sidebar({ onToast }: SidebarProps) {
  const handleNav = (label: string) => {
    onToast(`${label}：未實作頁面（demo）`)
  }

  return (
    <aside className="hidden md:flex bg-panel border-r border-line flex-col w-[236px] shrink-0 py-[22px] px-[15px]">
      <div className="flex items-center gap-[10px] font-bold text-[16px] px-2 pb-7">
        <div className="h-[30px] w-[30px] rounded-[10px] bg-gradient-to-br from-[#8e6cff] to-[#5a38e5] grid place-items-center text-white text-[16px]">
          ✦
        </div>
        UGC Studio
      </div>

      <div className="mx-1.5 mb-6 p-3 border border-line rounded-xl text-[#555b67] text-[12px]">
        <b className="block text-[#20222a] mb-1 text-[13px]">Sean 的工作區</b>
        個人方案　⌄
      </div>

      <div className="text-[#9a9da6] text-[10px] tracking-[0.12em] font-bold px-2.5 pb-2">
        創作空間
      </div>

      <nav className="grid gap-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleNav(item.label)}
            aria-current={item.active ? 'page' : undefined}
            className={`text-left py-[10px] px-2.5 text-[13px] rounded-[9px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-1 ${
              item.active
                ? 'bg-purple-soft text-purple font-semibold'
                : 'bg-transparent text-[#666b76] hover:bg-line/40'
            }`}
          >
            <span className="inline-block w-[23px]">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-3">
        <div className="border border-line p-[13px] rounded-xl mx-1">
          <strong className="text-[12px] block">本月生成點數</strong>
          <p className="text-[11px] text-muted my-1.5">720 / 2,000 點數</p>
          <div
            className="h-[5px] bg-[#efeff2] rounded-lg overflow-hidden"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={2000}
            aria-valuenow={720}
            aria-label="本月點數使用率"
          >
            <div className="block w-[36%] h-full bg-purple rounded-lg" />
          </div>
        </div>

        <div className="flex items-center gap-2 px-1 pt-3 text-[12px] font-semibold">
          <div
            aria-hidden="true"
            className="h-[29px] w-[29px] rounded-full bg-[#ffe0cd] grid place-items-center text-[14px]"
          >
            👤
          </div>
          <span>Sean Li</span>
          <span className="ml-auto text-[#aaa]" aria-hidden="true">⋯</span>
        </div>
      </div>
    </aside>
  )
}