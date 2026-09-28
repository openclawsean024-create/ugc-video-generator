'use client'

import {
  CREATORS,
  RATIOS,
  VARIANTS,
  type CreatorId,
  type RatioId,
  type VariantCount,
} from '../_lib/mockData'

type CreatorCardProps = {
  creatorIdx: number
  ratio: RatioId
  variant: VariantCount
  onCreatorChange: (nextIdx: number) => void
  onRatioChange: (next: RatioId) => void
  onVariantChange: (next: VariantCount) => void
  onToast: (message: string) => void
}

const RATIO_ICON: Record<RatioId, string> = {
  '9:16': '▯',
  '1:1': '▭',
  '16:9': '▱',
}

export function CreatorCard({
  creatorIdx,
  ratio,
  variant,
  onCreatorChange,
  onRatioChange,
  onVariantChange,
  onToast,
}: CreatorCardProps) {
  return (
    <section className="bg-panel border border-line rounded-2xl p-[18px] sm:p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-bold">③ 選擇影片創作者</h2>
        <button
          type="button"
          onClick={() => onToast('查看全部創作者：原型示意（demo）')}
          className="text-[11px] text-purple font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-1 rounded"
        >
          查看全部 →
        </button>
      </div>

      <div
        role="radiogroup"
        aria-label="虛擬創作者"
        className="grid grid-cols-3 gap-2"
      >
        {CREATORS.map((creator, idx) => {
          const selected = idx === creatorIdx
          return (
            <button
              key={creator.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => {
                if (idx === creatorIdx) return
                onCreatorChange(idx)
                onToast(`已切換影片創作者：${creator.name}（示意）`)
              }}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-1 ${
                selected ? 'border-purple bg-purple-soft' : 'border-line bg-canvas hover:border-purple/50'
              }`}
            >
              <div
                aria-hidden="true"
                className={`relative h-[78px] w-full rounded-lg bg-gradient-to-br ${creator.accent} grid place-items-center text-[34px]`}
              >
                <span>{creator.emoji}</span>
                {selected && (
                  <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-purple text-white text-[10px] grid place-items-center">
                    ✓
                  </span>
                )}
              </div>
              <span className="text-[10px] text-ink font-semibold text-center leading-tight">
                {creator.name}
              </span>
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between text-[11px]">
        <span className="text-purple font-semibold">✦ 已為舒眠商品推薦</span>
        <button
          type="button"
          onClick={() => onToast('建立專屬創作者：原型示意（demo）')}
          className="text-purple font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-1 rounded"
        >
          建立專屬創作者 ＋
        </button>
      </div>

      <div className="h-px bg-line" />

      <div className="space-y-2">
        <div className="text-[11px] text-muted font-semibold">影片比例</div>
        <div role="radiogroup" aria-label="影片比例" className="grid grid-cols-3 gap-2">
          {RATIOS.map((r) => {
            const active = r.id === ratio
            return (
              <button
                key={r.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => {
                  if (r.id === ratio) return
                  onRatioChange(r.id)
                  onToast(`已切換影片比例：${r.label}（示意）`)
                }}
                className={`px-2 py-2 rounded-lg border text-[12px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-1 ${
                  active
                    ? 'bg-purple text-white border-purple'
                    : 'bg-canvas text-muted border-line hover:border-purple/60'
                }`}
              >
                <b className="inline-block mr-1.5">{RATIO_ICON[r.id]}</b>
                {r.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-[11px] text-muted font-semibold">產生不同版本</div>
        <div role="radiogroup" aria-label="變體支數" className="grid grid-cols-3 gap-2">
          {VARIANTS.map((v) => {
            const active = v.id === variant
            return (
              <button
                key={v.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => {
                  if (v.id === variant) return
                  onVariantChange(v.id)
                  onToast(`已切換變體：${v.label}（示意）`)
                }}
                className={`px-2 py-2 rounded-lg border text-[12px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-1 ${
                  active
                    ? 'bg-purple text-white border-purple'
                    : 'bg-canvas text-muted border-line hover:border-purple/60'
                }`}
              >
                {v.label}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}