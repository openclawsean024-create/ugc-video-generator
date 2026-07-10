// ─── Types ───────────────────────────────────────────────────────────────

export type Avatar = 'professional' | 'casual' | 'lifestyle' | 'tech'
export type Format = 'portrait' | 'square' | 'landscape' // 9:16, 1:1, 16:9
export type SubtitlePosition = 'top' | 'center' | 'bottom'
export type SubtitleColor = '#ffffff' | '#fde047' | '#86efac' | '#fca5a5'

export const FORMATS: Record<Format, { label: string; w: number; h: number }> = {
  portrait: { label: '9:16 (IG/TT 短影片)', w: 540, h: 960 },
  square: { label: '1:1 (IG 貼文)', w: 720, h: 720 },
  landscape: { label: '16:9 (YouTube)', w: 960, h: 540 },
}

export const AVATARS: Record<Avatar, { label: string; emoji: string; gradient: [string, string]; persona: string; voiceHint: string }> = {
  professional: {
    label: '專業主播',
    emoji: '👔',
    gradient: ['#1e3a8a', '#312e81'],
    persona: 'Suit, formal, authoritative',
    voiceHint: 'zh-TW',
  },
  casual: {
    label: '休閒 Vlog',
    emoji: '🎒',
    gradient: ['#fbbf24', '#f97316'],
    persona: 'Casual wear, friendly vibe',
    voiceHint: 'zh-TW',
  },
  lifestyle: {
    label: '生活風格',
    emoji: '🌿',
    gradient: ['#a7f3d0', '#34d399'],
    persona: 'Warm, approachable glow',
    voiceHint: 'zh-TW',
  },
  tech: {
    label: '科技達人',
    emoji: '💻',
    gradient: ['#22d3ee', '#3b82f6'],
    persona: 'Modern, trendy, cool',
    voiceHint: 'zh-TW',
  },
}

export const SUBTITLE_COLORS: Record<SubtitleColor, string> = {
  '#ffffff': '純白',
  '#fde047': '亮黃',
  '#86efac': '薄荷',
  '#fca5a5': '珊瑚',
}
