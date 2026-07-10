// ─── Video export helpers ────────────────────────────────────────────────

import type { Format } from './types'
import { FORMATS } from './types'

/**
 * Combine a canvas's MediaStream + an AudioStream (from TTS or mic) into a single recorded webm.
 */
export class WebmRecorder {
  private recorder: MediaRecorder | null = null
  private chunks: Blob[] = []

  constructor(canvas: HTMLCanvasElement, audioStream?: MediaStream) {
    const videoStream = canvas.captureStream(30)
    const combined = new MediaStream([
      ...videoStream.getVideoTracks(),
      ...(audioStream?.getAudioTracks() ?? []),
    ])
    this.recorder = new MediaRecorder(combined, {
      mimeType: 'video/webm;codecs=vp9,opus',
    })
    this.recorder.ondataavailable = (e) => {
      if (e.data.size > 0) this.chunks.push(e.data)
    }
  }

  start() {
    this.recorder?.start(100)
  }

  stop(): Promise<Blob> {
    return new Promise((resolve) => {
      if (!this.recorder) {
        resolve(new Blob())
        return
      }
      this.recorder.onstop = () => {
        resolve(new Blob(this.chunks, { type: 'video/webm' }))
      }
      this.recorder.stop()
    })
  }
}

/**
 * Speak a script using the browser's TTS engine. Returns the audio context.
 */
export async function speak(script: string, voiceName?: string): Promise<{ audioCtx: AudioContext; destination: MediaStreamAudioDestinationNode }> {
  return new Promise((resolve) => {
    const audioCtx = new AudioContext()
    const destination = audioCtx.createMediaStreamDestination()

    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(script)
      utter.lang = 'zh-TW'
      utter.rate = 1.0
      utter.pitch = 1.0

      if (voiceName) {
        const voices = window.speechSynthesis.getVoices()
        const match = voices.find((v) => v.name === voiceName)
        if (match) utter.voice = match
      }

      // Connect utterance output to audio destination via media stream (limited browser support)
      // Most browsers don't directly expose SpeechSynthesis to Web Audio, so we'll just play it
      window.speechSynthesis.speak(utter)
    }

    resolve({ audioCtx, destination })
  })
}

export function estimatedExportDuration(script: string): number {
  // Rough: 0.3s per Chinese char + 1s padding
  return Math.max(5, Math.ceil(script.length * 0.3) + 1)
}

export function getFormatDims(format: Format) {
  return FORMATS[format]
}
