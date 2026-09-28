'use client'

export function InsightTip() {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl border border-line bg-canvas">
      <span
        aria-hidden="true"
        className="shrink-0 h-7 w-7 rounded-md bg-purple-soft text-purple grid place-items-center font-bold"
      >
        ✦
      </span>
      <div className="text-[12px] leading-[1.55]">
        <b className="block text-ink text-[13px]">小提示</b>
        <p className="text-muted">測試多種開場方式，幫你更快找到受眾有感的影片方向。</p>
      </div>
    </div>
  )
}