// Studio workbench mock data — all values are illustrative only.
// No real AI generation, real products, or real creators are involved.

export type CreatorId = 'xiaoqing' | 'mia' | 'anna' | 'claire' | 'yating' | 'nora'

export type Creator = {
  id: CreatorId
  name: string
  emoji: string
  accent: string // tailwind classes for portrait background
}

export const CREATORS: readonly Creator[] = [
  { id: 'xiaoqing', name: '小晴 · 親切自然', emoji: '👩🏻', accent: 'from-amber-100 to-pink-200' },
  { id: 'mia', name: 'Mia · 活力分享', emoji: '👩🏽', accent: 'from-yellow-100 to-amber-200' },
  { id: 'anna', name: '安娜 · 質感生活', emoji: '👩🏼', accent: 'from-stone-100 to-rose-200' },
  { id: 'claire', name: 'Claire · 專業可信', emoji: '👩🏻‍🦰', accent: 'from-rose-100 to-orange-200' },
  { id: 'yating', name: '雅婷 · 溫柔療癒', emoji: '👩🏾', accent: 'from-teal-100 to-emerald-200' },
  { id: 'nora', name: 'Nora · 輕鬆活潑', emoji: '👩🏻‍🦱', accent: 'from-sky-100 to-indigo-200' },
] as const

export type ScriptId = 'relax' | 'sharing' | 'features'

export type ScriptOption = {
  id: ScriptId
  title: string
  sampleCaption: string
  vibe: string
}

export const SCRIPTS: readonly ScriptOption[] = [
  {
    id: 'relax',
    title: '睡前困擾 → 放鬆儀式',
    sampleCaption: '「明明累到不行，腦袋卻還在轉？」',
    vibe: '共感開場',
  },
  {
    id: 'sharing',
    title: '真實體驗分享',
    sampleCaption: '「朋友問我最近怎麼比較有精神…」',
    vibe: '個人見證',
  },
  {
    id: 'features',
    title: '產品特色拆解',
    sampleCaption: '「三種植萃成分，讓睡前十分鐘變成期待。」',
    vibe: '產品導向',
  },
] as const

export type AudienceChipId = 'office' | 'shallowSleep' | 'natural' | 'self'

export type AudienceChip = {
  id: AudienceChipId
  label: string
  selfDefined: boolean
}

export const AUDIENCE_CHIPS: readonly AudienceChip[] = [
  { id: 'office', label: '上班族女性', selfDefined: false },
  { id: 'shallowSleep', label: '淺眠族', selfDefined: false },
  { id: 'natural', label: '重視天然成分', selfDefined: false },
  { id: 'self', label: '自訂受眾 ＋', selfDefined: true },
] as const

export type RatioId = '9:16' | '1:1' | '16:9'

export type RatioOption = {
  id: RatioId
  label: string
  tailwindShape: string // tailwind v4 utility for aspect-ratio
  inlineRatio: string // fallback for inline use
}

export const RATIOS: readonly RatioOption[] = [
  { id: '9:16', label: '9:16 直式', tailwindShape: 'aspect-[9/16]', inlineRatio: '9 / 16' },
  { id: '1:1', label: '1:1 方形', tailwindShape: 'aspect-square', inlineRatio: '1 / 1' },
  { id: '16:9', label: '16:9 橫式', tailwindShape: 'aspect-video', inlineRatio: '16 / 9' },
] as const

export type VariantCount = 1 | 3 | 5

export type VariantOption = {
  id: VariantCount
  label: string
  points: number
}

export const VARIANTS: readonly VariantOption[] = [
  { id: 1, label: '1 支', points: 80 },
  { id: 3, label: '3 支', points: 200 },
  { id: 5, label: '5 支', points: 320 },
] as const

export type LanguageId = 'zh' | 'en' | 'ja'

export type LanguageOption = {
  id: LanguageId
  label: string
}

export const LANGUAGE_OPTIONS: readonly LanguageOption[] = [
  { id: 'zh', label: '繁體中文（台灣）' },
  { id: 'en', label: 'English' },
  { id: 'ja', label: '日本語' },
] as const

export type LengthId = '15' | '20' | '30'

export type LengthOption = {
  id: LengthId
  label: string
}

export const LENGTH_OPTIONS: readonly LengthOption[] = [
  { id: '15', label: '約 15 秒' },
  { id: '20', label: '約 20 秒' },
  { id: '30', label: '約 30 秒' },
] as const

export const INITIAL_PRODUCT_URL = 'https://mellowday.tw/products/睡眠噴霧'

// Studio workbench initial state — used on first paint and after "重新開始".
export const INITIAL_STATE = {
  productUrl: INITIAL_PRODUCT_URL,
  language: 'zh' as LanguageId,
  length: '20' as LengthId,
  audienceChipId: 'office' as AudienceChipId,
  scriptIdx: 0,
  creatorIdx: 0,
  ratio: '9:16' as RatioId,
  variant: 1 as VariantCount,
} as const