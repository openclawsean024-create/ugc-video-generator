'use client'

import { useEffect, useRef, useState } from 'react'
import { AVATARS, FORMATS, type Avatar, type Format, type SubtitleColor, type SubtitlePosition } from '@/app/lib/types'
import { PreviewCanvas } from '@/app/components/PreviewCanvas'
import { VideoExportButton } from '@/app/components/VideoExporter'
import { Sparkles, FileText, Mic, MicOff, Volume2, Settings2 } from 'lucide-react'

const SAMPLE = `哈囉大家好！今天要跟大家分享我們店裡的招牌甜點——黑糖珍珠鮮奶。
這個甜點使用台灣本地小農的黑糖，每天現煮珍珠，搭配 100% 鮮奶，
喝起來香醇又不會死甜。歡迎到我們的 IG 私訊訂購，全台都可以宅配到府喔！`

export default function HomePage() {
  const [script, setScript] = useState('')
  const [avatar, setAvatar] = useState<Avatar>('casual')
  const [format, setFormat] = useState<Format>('portrait')
  const [subtitlePosition, setSubtitlePosition] = useState<SubtitlePosition>('bottom')
  const [subtitleSize, setSubtitleSize] = useState(32)
  const [subtitleColor, setSubtitleColor] = useState<SubtitleColor>('#ffffff')
  const [voice, setVoice] = useState<string>('')
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const [error, setError] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isRecording, setIsRecording] = useState(false)

  // Load TTS voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    const load = () => {
      const v = window.speechSynthesis.getVoices()
      setAvailableVoices(v)
      if (v.length > 0 && !voice) setVoice(v[0].name)
    }
    load()
    window.speechSynthesis.onvoiceschanged = load
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.onvoiceschanged = null
    }
  }, [voice])

  const charCount = script.length
  const estDuration = Math.ceil((script.length * 0.3) + 1)

  const handleLoadSample = () => {
    setScript(SAMPLE)
  }

  const previewTTS = () => {
    if (!script.trim()) return
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utter = new SpeechSynthesisUtterance(script)
      utter.lang = 'zh-TW'
      if (voice) {
        const found = availableVoices.find((v) => v.name === voice)
        if (found) utter.voice = found
      }
      window.speechSynthesis.speak(utter)
    }
  }

  const stopPreview = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/5">
        <div className="max-w-6xl mx-auto px-5 py-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-black">UGC 影片生成器</h1>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">
              AI Avatar Video · Pure Frontend · v2.0
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-6 grid lg:grid-cols-[1.4fr_1fr] gap-6 animate-fade-in">
        {/* Preview Panel */}
        <section className="space-y-3">
          <div className="text-xs font-black uppercase tracking-wider opacity-50">Preview</div>
          <PreviewCanvas
            script={script || '（輸入腳本後，這裡會顯示 AI 主播 + 字幕）'}
            avatar={avatar}
            format={format}
            subtitlePosition={subtitlePosition}
            subtitleSize={subtitleSize}
            subtitleColor={subtitleColor}
            isRecording={isRecording}
            ref={canvasRef}
          />
          <p className="text-xs opacity-50 text-center">
            點「開始錄製」後，瀏覽器會用 TTS 朗讀腳本 + 用 MediaRecorder 抓這塊畫面
          </p>
        </section>

        {/* Controls Panel */}
        <section className="space-y-4">
          {/* 1. Script */}
          <div className="bg-surface rounded-2xl p-4 border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider opacity-60">
              <FileText size={14} /> 腳本
            </div>
            <textarea
              rows={5}
              placeholder="輸入你要 AI 主播說的內容…(支援中英文)"
              value={script}
              onChange={(e) => setScript(e.target.value)}
              className="w-full px-3 py-2 bg-surface-2 rounded-lg border border-white/5 text-sm"
            />
            <div className="flex items-center justify-between text-xs">
              <div className="opacity-50">{charCount} 字 · 約 {estDuration} 秒</div>
              <div className="flex gap-2">
                <button
                  onClick={handleLoadSample}
                  className="px-3 py-1 bg-surface-2 rounded text-info hover:bg-surface-2/70"
                >
                  📋 載入範例
                </button>
                <button
                  onClick={() => setScript('')}
                  className="px-3 py-1 bg-surface-2 rounded opacity-70 hover:opacity-100"
                >
                  ✕ 清除
                </button>
              </div>
            </div>
          </div>

          {/* 2. TTS */}
          <div className="bg-surface rounded-2xl p-4 border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider opacity-60">
              <Volume2 size={14} /> TTS 語音
            </div>
            <select
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
              className="w-full px-3 py-2 bg-surface-2 rounded-lg border border-white/5 text-sm"
            >
              {availableVoices.length === 0 && <option>（系統無可用 TTS 語音）</option>}
              {availableVoices.map((v) => (
                <option key={v.name} value={v.name}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <button
                onClick={previewTTS}
                disabled={!script.trim()}
                className="flex-1 bg-info/20 text-info py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:bg-info/30 transition"
              >
                <Mic size={14} /> ▶ 試聽朗讀
              </button>
              <button
                onClick={stopPreview}
                className="px-3 bg-surface-2 rounded-lg text-sm hover:bg-surface-2/70"
              >
                <MicOff size={14} />
              </button>
            </div>
            <p className="text-[10px] opacity-50">
              語音品質依瀏覽器內建 TTS 而異（Chrome / Edge / Safari 內建音色各不相同）
            </p>
          </div>

          {/* 3. Avatar */}
          <div className="bg-surface rounded-2xl p-4 border border-white/5 space-y-3">
            <div className="text-xs font-black uppercase tracking-wider opacity-60">AI 主播</div>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(AVATARS) as Avatar[]).map((a) => {
                const Av = AVATARS[a]
                return (
                  <button
                    key={a}
                    onClick={() => setAvatar(a)}
                    className={`px-3 py-2.5 rounded-xl flex items-center gap-2 transition text-sm ${
                      avatar === a ? 'bg-accent text-white' : 'bg-surface-2 hover:bg-surface-2/70'
                    }`}
                  >
                    <span className="text-xl">{Av.emoji}</span>
                    <span className="font-semibold">{Av.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 4. Format + Subtitles */}
          <div className="bg-surface rounded-2xl p-4 border border-white/5 space-y-4">
            <div className="text-xs font-black uppercase tracking-wider opacity-60 flex items-center gap-2">
              <Settings2 size={14} /> 格式 / 字幕
            </div>

            <div>
              <div className="text-[11px] font-bold opacity-50 mb-2">平台格式</div>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(FORMATS) as Format[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className={`px-2 py-2 rounded-lg text-xs font-bold transition ${
                      format === f
                        ? 'bg-accent text-white'
                        : 'bg-surface-2 hover:bg-surface-2/70'
                    }`}
                  >
                    {FORMATS[f].label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold opacity-50 mb-2">字幕位置</div>
              <div className="grid grid-cols-3 gap-2">
                {(['top', 'center', 'bottom'] as SubtitlePosition[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setSubtitlePosition(p)}
                    className={`px-2 py-2 rounded-lg text-xs transition ${
                      subtitlePosition === p
                        ? 'bg-info text-white'
                        : 'bg-surface-2 hover:bg-surface-2/70'
                    }`}
                  >
                    {p === 'top' ? '頂部' : p === 'center' ? '中間' : '底部'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-bold opacity-50 mb-2">
                字型大小: {subtitleSize}px
              </div>
              <input
                type="range"
                min={16}
                max={72}
                value={subtitleSize}
                onChange={(e) => setSubtitleSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <div className="text-[11px] font-bold opacity-50 mb-2">字幕顏色</div>
              <div className="flex gap-2">
                {(Object.keys({ '#ffffff': 1, '#fde047': 2, '#86efac': 3, '#fca5a5': 4 }) as SubtitleColor[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setSubtitleColor(c)}
                    className={`w-9 h-9 rounded-lg border-2 transition ${
                      subtitleColor === c ? 'border-accent scale-110' : 'border-transparent'
                    }`}
                    style={{ background: c }}
                    aria-label={`顏色 ${c}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 5. Export */}
          <div className="bg-surface rounded-2xl p-4 border border-white/5 space-y-3">
            <div className="text-xs font-black uppercase tracking-wider opacity-60">輸出</div>
            <VideoExportButton
              script={script}
              canvasRef={canvasRef as React.RefObject<HTMLCanvasElement>}
              onError={setError}
            />
            <p className="text-[10px] opacity-50">
              輸出格式：WebM (VP9 + Opus)。如需 MP4，請用 VLC / HandBrake 轉檔。
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-xs text-red-300">
              {error}
            </div>
          )}
        </section>
      </main>

      <footer className="max-w-6xl mx-auto px-5 py-8 text-xs opacity-50 text-center border-t border-white/5 mt-12">
        UGC 影片生成器 v2.0 — 純前端、零 API Key ｜
        TTS 由瀏覽器 Web Speech API 提供
      </footer>
    </div>
  )
}
