'use client'

import { CREATORS, RATIOS, SCRIPTS, type RatioId } from '../_lib/mockData'

type PreviewPhoneProps = {
  creatorIdx: number
  scriptIdx: number
  ratio: RatioId
}

export function PreviewPhone({ creatorIdx, scriptIdx, ratio }: PreviewPhoneProps) {
  const creator = CREATORS[creatorIdx]
  const script = SCRIPTS[scriptIdx]
  const ratioOption = RATIOS.find((r) => r.id === ratio) ?? RATIOS[0]

  return (
    <section className="bg-panel border border-line rounded-2xl p-[18px] sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <b className="text-[13px]">影片即時預覽</b>
        <span className="text-[11px] text-muted">預覽 · {ratioOption.label}</span>
      </div>

      <div className="grid place-items-center py-3">
        <div
          className={`relative w-full max-w-[260px] ${ratioOption.tailwindShape} bg-dark rounded-2xl overflow-hidden grid place-items-center`}
          style={{ minHeight: ratio === '9:16' ? '340px' : ratio === '1:1' ? '260px' : '200px' }}
          role="img"
          aria-label={`預覽手機畫面，比例 ${ratioOption.label}`}
        >
          <div className="text-[78px] leading-none">{creator?.emoji ?? '👤'}</div>

          <div
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center"
          >
            <span className="h-10 w-10 rounded-full bg-white/85 grid place-items-center text-[14px] text-purple">
              ▶
            </span>
          </div>

          <div className="absolute left-2 right-2 bottom-2 text-[11px] text-white/95 bg-black/45 rounded-md px-2 py-1.5 leading-snug">
            {script?.sampleCaption ?? ''}
          </div>
        </div>
      </div>

      <p className="text-[10px] text-muted text-center mt-1">
        預覽示意 · 生成後可逐幕編輯
      </p>
    </section>
  )
}