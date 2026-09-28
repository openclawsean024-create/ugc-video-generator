'use client'

type ProductCardProps = {
  productUrl: string
  onProductUrlChange: (next: string) => void
  onToast: (message: string) => void
}

export function ProductCard({ productUrl, onProductUrlChange, onToast }: ProductCardProps) {
  const handleAnalyze = () => {
    onToast('商品資訊已重新分析（示意）')
  }

  return (
    <section className="bg-panel border border-line rounded-2xl p-[18px] sm:p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-bold">① 商品資訊</h2>
        <span className="text-[11px] text-muted">已自動整理</span>
      </div>

      <label htmlFor="productUrl" className="block text-[11px] text-muted font-semibold">
        商品頁面網址
      </label>
      <div className="flex gap-2">
        <input
          id="productUrl"
          type="url"
          value={productUrl}
          onChange={(e) => onProductUrlChange(e.target.value)}
          placeholder="輸入商品頁網址"
          className="flex-1 min-w-0 px-3 py-2 border border-line rounded-lg text-ink bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-1"
        />
        <button
          type="button"
          onClick={handleAnalyze}
          className="px-3 py-2 rounded-lg bg-purple-soft text-purple text-[12px] font-semibold hover:bg-purple hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-1"
        >
          重新分析
        </button>
      </div>
      <p className="text-[11px] text-muted">輸入商品網址，快速帶入商品資料與賣點</p>

      <div className="h-px bg-line" />

      <div className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className="h-14 w-14 rounded-xl bg-purple-soft grid place-items-center text-[26px]"
        >
          🌿
        </div>
        <div className="text-[12px] leading-[1.55]">
          <b className="block text-ink text-[13px]">晚安植萃舒眠噴霧</b>
          <span className="text-muted">薰衣草 × 洋甘菊｜睡前放鬆儀式</span>
          <br />
          <span className="inline-block mt-1 text-[10px] font-bold px-2 py-[2px] rounded-full bg-purple-soft text-purple">
            ✓ 已擷取商品資訊
          </span>
        </div>
      </div>
    </section>
  )
}