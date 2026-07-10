'use client'

import { forwardRef, useEffect, useRef } from 'react'
import { AVATARS, FORMATS, type Avatar, type Format, type SubtitlePosition } from '@/app/lib/types'

interface Props {
  script: string
  avatar: Avatar
  format: Format
  subtitlePosition: SubtitlePosition
  subtitleSize: number
  subtitleColor: string
  isRecording?: boolean
}

/**
 * Pure-canvas video preview. Painted every 30fps with avatar + script overlay.
 * Also exposes captureStream() for MediaRecorder usage.
 */
export const PreviewCanvas = forwardRef<HTMLCanvasElement, Props>(function PreviewCanvas(
  { script, avatar, format, subtitlePosition, subtitleSize, subtitleColor, isRecording },
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const startTimeRef = useRef<number>(Date.now())

  const dims = FORMATS[format]
  const av = AVATARS[avatar]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height)
      grad.addColorStop(0, av.gradient[0])
      grad.addColorStop(1, av.gradient[1])
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Decorative circles
      ctx.globalAlpha = 0.15
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.arc(canvas.width * 0.85, canvas.height * 0.15, canvas.width * 0.15, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(canvas.width * 0.15, canvas.height * 0.85, canvas.width * 0.18, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 1

      // Avatar circle (center-vertical-ish)
      const cx = canvas.width / 2
      const avatarR = Math.min(canvas.width, canvas.height) * 0.25
      const cy = canvas.height * 0.4

      // Avatar background
      const avGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, avatarR)
      avGrad.addColorStop(0, 'rgba(255,255,255,0.95)')
      avGrad.addColorStop(1, 'rgba(255,255,255,0.75)')
      ctx.fillStyle = avGrad
      ctx.beginPath()
      ctx.arc(cx, cy, avatarR, 0, Math.PI * 2)
      ctx.fill()

      // Avatar emoji
      ctx.fillStyle = '#000'
      ctx.font = `${avatarR * 1.1}px serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(av.emoji, cx, cy)

      // Persona subtitle under avatar
      ctx.fillStyle = 'rgba(255,255,255,0.85)'
      ctx.font = `bold ${Math.max(14, subtitleSize * 0.5)}px sans-serif`
      ctx.fillText(av.label, cx, cy + avatarR + 24)

      // Script text — split into lines that fit
      ctx.fillStyle = subtitleColor
      ctx.font = `bold ${subtitleSize}px sans-serif`
      ctx.textAlign = 'center'
      const lines = wrapText(ctx, script, canvas.width * 0.85)
      const lineHeight = subtitleSize * 1.3
      let baseY: number
      if (subtitlePosition === 'top') baseY = subtitleSize * 2
      else if (subtitlePosition === 'center') baseY = canvas.height / 2 + canvas.height / 4
      else baseY = canvas.height - subtitleSize * 1.5 - lines.length * lineHeight

      // Black backdrop for readability
      ctx.fillStyle = 'rgba(0,0,0,0.55)'
      const paddingY = subtitleSize * 0.5
      const paddingX = subtitleSize * 0.6
      const textWidth = lines.length > 0 ? ctx.measureText(lines[0]).width : canvas.width * 0.7
      const textBlockHeight = lines.length * lineHeight + paddingY * 2
      const textBlockY = baseY - paddingY
      ctx.fillRect((canvas.width - textWidth) / 2 - paddingX, textBlockY, textWidth + paddingX * 2, textBlockHeight)

      // Draw lines
      ctx.fillStyle = subtitleColor
      ctx.textAlign = 'center'
      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], canvas.width / 2, baseY + i * lineHeight)
      }

      // Recording indicator
      if (isRecording) {
        ctx.fillStyle = '#ef4444'
        ctx.beginPath()
        ctx.arc(canvas.width - 28, 28, 8, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#fff'
        ctx.font = 'bold 14px sans-serif'
        ctx.textAlign = 'right'
        ctx.fillText('REC', canvas.width - 40, 32)
      }

      // Branding watermark
      ctx.fillStyle = 'rgba(255,255,255,0.4)'
      ctx.font = '12px sans-serif'
      ctx.textAlign = 'right'
      ctx.fillText('UGC Generator v2.0', canvas.width - 10, canvas.height - 10)

      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
    }
  }, [script, avatar, av, subtitlePosition, subtitleSize, subtitleColor, isRecording])

  // Reset start time when script changes
  useEffect(() => {
    startTimeRef.current = Date.now()
  }, [script])

  return (
    <div className="relative w-full flex justify-center bg-surface-2 rounded-2xl overflow-hidden">
      <canvas
        ref={(node) => {
          canvasRef.current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        width={dims.w}
        height={dims.h}
        className="max-w-full h-auto"
        style={{ aspectRatio: `${dims.w}/${dims.h}` }}
      />
    </div>
  )
})

/**
 * Word-wrap a long script into lines that fit within maxWidth.
 */
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  // For CJK, wrap by char count; for English, wrap by word.
  const lines: string[] = []
  let current = ''

  // CJK chars get individual char breaks; words preserved.
  // Simple heuristic: break every ~30 chars or on \n.
  const paragraphs = text.split(/\n+/).filter(Boolean)
  for (const para of paragraphs) {
    if (para.length <= 20) {
      lines.push(para)
      continue
    }
    // naive break
    const charsPerLine = Math.floor(maxWidth / (subtitlePxEstimate(ctx)))
    let buf = ''
    for (const ch of para) {
      buf += ch
      if (buf.length >= charsPerLine) {
        lines.push(buf)
        buf = ''
      }
    }
    if (buf) lines.push(buf)
  }

  return lines.length > 0 ? lines : ['']
}

function subtitlePxEstimate(ctx: CanvasRenderingContext2D): number {
  return ctx.measureText('中').width
}
