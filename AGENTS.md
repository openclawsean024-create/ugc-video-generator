<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# UGC 影片生成器 v2.0

純前端、零 API Key 的短影片生成器。

- TTS 用瀏覽器內建 Web Speech API（`window.speechSynthesis`）
- Export 用 `MediaRecorder` 抓 `<canvas>` stream → `.webm`
- 4 種 Avatar 用 SVG gradient 預設

規格書：見 Notion subpage + /tmp/ugc-video-generator-prd-v2.md
