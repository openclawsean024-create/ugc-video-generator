'use client'

import {
  AUDIENCE_CHIPS,
  LANGUAGE_OPTIONS,
  LENGTH_OPTIONS,
  SCRIPTS,
  type AudienceChipId,
  type LanguageId,
  type LengthId,
  type ScriptId,
} from '../_lib/mockData'

type AudienceScriptCardProps = {
  language: LanguageId
  length: LengthId
  audienceChipId: AudienceChipId
  scriptIdx: number
  onLanguageChange: (next: LanguageId) => void
  onLengthChange: (next: LengthId) => void
  onAudienceChipChange: (next: AudienceChipId) => void
  onScriptChange: (nextIdx: number) => void
  onToast: (message: string) => void
}

export function AudienceScriptCard({
  language,
  length,
  audienceChipId,
  scriptIdx,
  onLanguageChange,
  onLengthChange,
  onAudienceChipChange,
  onScriptChange,
  onToast,
}: AudienceScriptCardProps) {
  const handleChip = (chipId: AudienceChipId, selfDefined: boolean) => {
    if (selfDefined) {
      onToast('自訂受眾：原型示意（demo）')
      return
    }
    onAudienceChipChange(chipId)
    onToast(`已切換主要受眾：${AUDIENCE_CHIPS.find((c) => c.id === chipId)?.label ?? ''}（示意）`)
  }

  const handleScript = (idx: number) => {
    if (idx === scriptIdx) return
    onScriptChange(idx)
    onToast('已切換腳本方向，預覽已更新（示意）')
  }

  return (
    <section className="bg-panel border border-line rounded-2xl p-[18px] sm:p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-bold">② 受眾與創意方向</h2>
        <span className="text-[11px] text-muted">依商品推薦</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="language" className="block text-[11px] text-muted font-semibold mb-1">
            影片語言
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
            className="w-full px-3 py-2 border border-line rounded-lg text-ink bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-1"
          >
            {LANGUAGE_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="length" className="block text-[11px] text-muted font-semibold mb-1">
            影片長度
          </label>
          <select
            id="length"
            value={length}
            onChange={(e) => onLengthChange(e.target.value as LengthId)}
            className="w-full px-3 py-2 border border-line rounded-lg text-ink bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-1"
          >
            {LENGTH_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-[11px] text-muted font-semibold">主要受眾</div>
        <div className="flex flex-wrap gap-2">
          {AUDIENCE_CHIPS.map((chip) => {
            const selected = chip.id === audienceChipId && !chip.selfDefined
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => handleChip(chip.id, chip.selfDefined)}
                aria-pressed={selected}
                className={`px-3 py-1.5 rounded-full text-[12px] font-semibold border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-1 ${
                  selected
                    ? 'bg-purple text-white border-purple'
                    : 'bg-canvas text-muted border-line hover:border-purple hover:text-purple'
                }`}
              >
                {chip.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-[11px] text-muted font-semibold">
          選擇腳本方向 <span className="text-[#999] font-normal">· 每個方向都可再編輯</span>
        </div>
        <div className="space-y-2">
          {SCRIPTS.map((script, idx) => {
            const active = idx === scriptIdx
            return (
              <button
                key={script.id}
                type="button"
                onClick={() => handleScript(idx)}
                aria-pressed={active}
                className={`w-full text-left flex items-start gap-3 p-3 rounded-xl border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-1 ${
                  active
                    ? 'border-purple bg-purple-soft'
                    : 'border-line bg-canvas hover:border-purple/60'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`mt-[3px] inline-block h-4 w-4 rounded-full border-2 shrink-0 ${
                    active ? 'border-purple bg-purple' : 'border-[#cfd1d8] bg-white'
                  }`}
                />
                <div className="text-[12px] leading-[1.55]">
                  <b className="block text-ink text-[13px]">{script.title}</b>
                  <p className="text-muted">{script.sampleCaption}</p>
                  <em className="not-italic text-[10px] text-purple font-bold mt-1 inline-block">
                    {script.vibe}
                  </em>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}