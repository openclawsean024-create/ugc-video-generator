# UGC 影片生成器 v2.0

純前端、零 API Key 的短影片 AI 主播生成器。

## 為什麼 v2.0？
v1.0 後端依賴 FastAPI + SDXL + FFmpeg + Zeabur，部署成本高、容易因後端 failed 而整個 deployment 卡死。v2.0 改為**純前端 MVP**：

- TTS → 瀏覽器內建 `window.speechSynthesis`
- Avatar → CSS gradient + emoji（4 種預設：👔 專業 / 🎒 休閒 / 🌿 生活 / 💻 科技）
- Export → `MediaRecorder` 抓 `<canvas>` stream → `.webm` 下載

## 技術棧
- Next.js 16.2.4 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- 純前端，無 backend

## 開發
```bash
npm install
npm run dev
```

## 部署
Push to `main` branch 會自動觸發 Vercel Hobby deploy。
`vercel.json` 已設定 `framework: nextjs`。

## 完整規格書
Notion：[UGC 影片生成器 — 規格書 v2.0](https://app.notion.com/p/UGC-v2-0-2026-07-10-399449ca65d88184a79aeb0878d0b119)

## License
Private — OpenClaw Project
