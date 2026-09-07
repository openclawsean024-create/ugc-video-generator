# ugc-video-generator · CHANGELOG

所有對 `ugc-video-generator` 規格 / 部署 / 測試的版本變更紀錄。

---

## v3.0.2 — 2026-09-06（repo-fleet 升級）

> 由 repo-fleet 批次 7C 自動駕駛：Sean Li / Mavis worker agent
> v3.0.2 完成於 2026-09-06 by Sean 10-repo-fleet

### Added
- `PRD/SPEC.md` v3.0.2 等級規格書（問題陳述 / FR table / NFR / 部署契約 / mermaid flow）
- `PRD/CHANGELOG.md` 本檔
- `.github/workflows/ci.yml` GHA 4-job workflow（lint / test / build / deploy to Vercel）

### Verified
- ✅ `npm run lint` — 0 error（tsc --noEmit）
- ✅ `npm test` — 全部 vitest 綠
- ✅ `npm run build` — Next.js 16 構建綠（首頁 + 靜態資產）
- ✅ Vercel deploy target 已掛

---

## v2.0 — 2026-07-10（純前端 MVP pivot）

### Added
- Next.js 16.2.4 + React 19 + Tailwind v4 純前端架構
- 4 種 Avatar 預設（👔 專業 / 🎒 休閒 / 🌿 生活 / 💻 科技）+ CSS gradient 背景
- 3 種影片尺寸（9:16 / 1:1 / 16:9）
- 4 種字幕顏色（純白 / 亮黃 / 薄荷 / 珊瑚）
- 字幕位置切換（top / center / bottom）
- TTS 旁白（`speechSynthesis`，zh-TW）
- WebM 匯出（MediaRecorder + canvas.captureStream）

### Pivot Reason
v1.0 後端依賴 FastAPI + SDXL + FFmpeg + Zeabur，部署成本高、容易因後端 failed 而整個 deployment 卡死。v2.0 改為**純前端 MVP**：avatar 用 CSS gradient + emoji、TTS 用瀏覽器內建、匯出走 MediaRecorder。零後端依賴。

---

## v1.0 — 2026-XX（廢棄）

- 後端：FastAPI + SDXL（avatar 圖像生成）+ FFmpeg（影片合成）+ Zeabur deploy
- 前端：Next.js + RTE form
- 結果：過度工程、部署成本高、單一後端失敗整個 deployment 卡死。完全沒落地到 production。
