'use client'

import { VARIANTS, type VariantCount } from '../_lib/mockData'

type FooterActionsProps = {
  variant: VariantCount
  onToast: (message: string) => void
}

export function FooterActions({ variant, onToast }: FooterActionsProps) {
  const points = VARIANTS.find((v) => v.id === variant)?.points ?? 80

  return (
    <>
      <section className="bg-panel border border-line rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-muted">預計使用點數</span>
          <b className="text-[15px] text-ink">{points} 點</b>
        </div>
        <button
          type="button"
          onClick={() => onToast('影片草稿已加入生成佇列（原型示意）')}
          className="w-full px-3 py-2.5 rounded-xl bg-purple text-white text-[13px] font-bold hover:opacity-90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2"
        >
          ✦ 生成影片草稿
        </button>
        <p className="text-[10px] text-muted text-center">
          生成前可再次預覽與修改，不會立即扣點
        </p>
      </section>

      <div className="flex items-center justify-between px-1 pt-1">
        <button
          type="button"
          onClick={() => onToast('已儲存為草稿（原型示意）')}
          className="text-[12px] text-muted hover:text-ink px-3 py-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-1"
        >
          ▣ 儲存為草稿
        </button>
        <span className="text-[10px] text-[#a1a4ad]">草稿已自動儲存</span>
      </div>
    </>
  )
}