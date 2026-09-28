'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Sidebar } from './_components/Sidebar'
import { Topbar } from './_components/Topbar'
import { Stepper } from './_components/Stepper'
import { ProductCard } from './_components/ProductCard'
import { AudienceScriptCard } from './_components/AudienceScriptCard'
import { CreatorCard } from './_components/CreatorCard'
import { PreviewPhone } from './_components/PreviewPhone'
import { InsightTip } from './_components/InsightTip'
import { FooterActions } from './_components/FooterActions'
import { Toast } from './_components/Toast'
import {
  INITIAL_STATE,
  type AudienceChipId,
  type LanguageId,
  type LengthId,
  type RatioId,
  type VariantCount,
} from './_lib/mockData'

const STEP_DEFINITIONS = [
  { label: '商品資訊', state: 'done' as const },
  { label: '受眾與腳本', state: 'done' as const },
  { label: '創作者與影片', state: 'current' as const },
  { label: '預覽與生成', state: 'future' as const },
]

const TOAST_HIDE_MS = 2300

export default function StudioPage() {
  const [productUrl, setProductUrl] = useState<string>(INITIAL_STATE.productUrl)
  const [language, setLanguage] = useState<LanguageId>(INITIAL_STATE.language)
  const [length, setLength] = useState<LengthId>(INITIAL_STATE.length)
  const [audienceChipId, setAudienceChipId] = useState<AudienceChipId>(INITIAL_STATE.audienceChipId)
  const [scriptIdx, setScriptIdx] = useState<number>(INITIAL_STATE.scriptIdx)
  const [creatorIdx, setCreatorIdx] = useState<number>(INITIAL_STATE.creatorIdx)
  const [ratio, setRatio] = useState<RatioId>(INITIAL_STATE.ratio)
  const [variant, setVariant] = useState<VariantCount>(INITIAL_STATE.variant)

  const [toast, setToast] = useState<string | null>(null)
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = useCallback((message: string) => {
    setToast(message)
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    toastTimerRef.current = setTimeout(() => setToast(null), TOAST_HIDE_MS)
  }, [])

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    }
  }, [])

  const handleReset = () => {
    setProductUrl(INITIAL_STATE.productUrl)
    setLanguage(INITIAL_STATE.language)
    setLength(INITIAL_STATE.length)
    setAudienceChipId(INITIAL_STATE.audienceChipId)
    setScriptIdx(INITIAL_STATE.scriptIdx)
    setCreatorIdx(INITIAL_STATE.creatorIdx)
    setRatio(INITIAL_STATE.ratio)
    setVariant(INITIAL_STATE.variant)
    showToast('已重設本次創作流程（原型示意）')
  }

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <div className="md:grid md:grid-cols-[236px_1fr]">
        <Sidebar onToast={showToast} />
        <main className="min-w-0">
          <Topbar onToast={showToast} />

          <div className="px-5 md:px-6 py-5 md:py-6 space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[10px] font-bold tracking-[0.18em] text-muted">
                  CREATIVE WORKSPACE
                </div>
                <h1 className="text-[22px] sm:text-[26px] font-black mt-1 leading-tight">
                  把商品變成會說故事的短片
                </h1>
                <p className="text-[13px] text-muted mt-1 max-w-[480px]">
                  幾個簡單步驟，做出適合社群廣告的 UGC 影片。
                </p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="shrink-0 px-3 py-2 rounded-lg border border-line bg-panel text-[12px] font-semibold text-ink hover:border-purple hover:text-purple transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-1"
              >
                ↻ 重新開始
              </button>
            </div>

            <Stepper steps={STEP_DEFINITIONS} />

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-4">
                <ProductCard
                  productUrl={productUrl}
                  onProductUrlChange={setProductUrl}
                  onToast={showToast}
                />
                <AudienceScriptCard
                  language={language}
                  length={length}
                  audienceChipId={audienceChipId}
                  scriptIdx={scriptIdx}
                  onLanguageChange={setLanguage}
                  onLengthChange={setLength}
                  onAudienceChipChange={setAudienceChipId}
                  onScriptChange={setScriptIdx}
                  onToast={showToast}
                />
              </div>

              <div className="space-y-4 lg:sticky lg:top-4 lg:self-start">
                <CreatorCard
                  creatorIdx={creatorIdx}
                  ratio={ratio}
                  variant={variant}
                  onCreatorChange={setCreatorIdx}
                  onRatioChange={setRatio}
                  onVariantChange={setVariant}
                  onToast={showToast}
                />
                <PreviewPhone creatorIdx={creatorIdx} scriptIdx={scriptIdx} ratio={ratio} />
                <InsightTip />
                <FooterActions variant={variant} onToast={showToast} />
              </div>
            </div>

            <p className="text-[10px] text-muted text-center pt-2 pb-1">
              概念原型 · 商品資料與創作者為示意內容 · 生成流程尚未連接實際 AI 服務
            </p>
          </div>
        </main>
      </div>

      <Toast message={toast} />
    </div>
  )
}