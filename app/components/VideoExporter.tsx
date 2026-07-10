'use client'

import { useState } from 'react'
import { Video, Download, Square, Loader2 } from 'lucide-react'
import { WebmRecorder, speak, estimatedExportDuration } from '@/app/lib/videoRecorder'

interface Props {
  script: string
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  onError?: (msg: string) => void
}

export function VideoExportButton({ script, canvasRef, onError }: Props) {
  const [state, setState] = useState<'idle' | 'tts' | 'recording' | 'encoding' | 'done'>('idle')
  const [progress, setProgress] = useState(0)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

  const isValid = script.trim().length > 0

  const startRecording = async () => {
    if (!canvasRef.current || !isValid) return
    setState('tts')
    setProgress(0)
    setDownloadUrl(null)

    try {
      // Speak TTS (background audio)
      const { destination } = await speak(script)

      // Connect canvas + audio via MediaRecorder
      const recorder = new WebmRecorder(canvasRef.current, destination.stream)

      // Start recording after a brief warmup
      setTimeout(() => {
        recorder.start()
        setState('recording')

        const totalSec = estimatedExportDuration(script)
        let elapsed = 0
        const tick = setInterval(() => {
          elapsed += 0.1
          setProgress(Math.min(100, (elapsed / totalSec) * 100))
          if (elapsed >= totalSec) {
            clearInterval(tick)
          }
        }, 100)

        // Stop after estimated duration
        setTimeout(async () => {
          setState('encoding')
          clearInterval(tick)
          const blob = await recorder.stop()
          const url = URL.createObjectURL(blob)
          setDownloadUrl(url)
          setState('done')
          setProgress(100)
        }, totalSec * 1000)
      }, 500)
    } catch (err) {
      const msg = err instanceof Error ? err.message : '錄影失敗'
      onError?.(msg)
      setState('idle')
    }
  }

  const stop = () => {
    setState('idle')
    setProgress(0)
  }

  return (
    <div className="space-y-3">
      {state === 'idle' && (
        <button
          onClick={startRecording}
          disabled={!isValid}
          className="w-full bg-accent hover:bg-accent-hover text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition"
        >
          <Video size={16} /> 開始錄製影片
        </button>
      )}

      {(state === 'tts' || state === 'recording') && (
        <>
          <div className="w-full bg-surface-2 rounded-xl p-3 flex items-center gap-3 border border-red-500/20">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-recording" />
            <div className="flex-1">
              <div className="text-sm font-semibold mb-1">
                {state === 'tts' ? '準備中…' : `錄製中… ${Math.round(progress)}%`}
              </div>
              <div className="w-full bg-bg/50 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-red-500 h-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <button
              onClick={stop}
              className="px-3 py-1.5 bg-surface-3 rounded-lg text-xs flex items-center gap-1"
            >
              <Square size={12} /> 停止
            </button>
          </div>
          <p className="text-xs opacity-60">
            正在朗讀腳本並錄製畫面，請勿切換分頁。
          </p>
        </>
      )}

      {state === 'encoding' && (
        <div className="w-full bg-surface-2 rounded-xl p-4 flex items-center gap-3">
          <Loader2 size={20} className="animate-spin text-accent" />
          <span className="text-sm">編碼中…</span>
        </div>
      )}

      {state === 'done' && downloadUrl && (
        <a
          href={downloadUrl}
          download={`ugc-${Date.now()}.webm`}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition"
        >
          <Download size={16} /> 下載 .webm 影片
        </a>
      )}
    </div>
  )
}
