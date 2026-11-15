<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md — UGC 短影片生成器（ugc-video-generator）

> ⚠️ 本產品評估建議**暫緩**（見 `PRD/SPEC.md` §0）。Sean 決定前不得開發新功能。

## 1. 權威文件與範圍

- 規格：[`PRD/SPEC.md`](./PRD/SPEC.md) v4.0；目標：[`GOAL.md`](./GOAL.md)（M1，僅在繼續時適用）。
- 驗證：[`SOP.md`](./SOP.md)；狀態：[`STATUS.md`](./STATUS.md)。
- 根目錄 `SPEC.md`（v2.2.1）與 README 中的 Notion 規格皆為舊版，衝突時以 `PRD/SPEC.md` v4.0 為準。

## 2. 專案結構

```
app/page.tsx                    # 主工具：腳本、頭像、比例、字幕、TTS 預覽、錄影
app/components/PreviewCanvas.tsx# canvas 繪製頭像與字幕
app/components/VideoExporter.tsx# 錄影流程（TTS 未接入錄影）
app/lib/videoRecorder.ts        # WebmRecorder、speak()、時長估算
app/lib/types.ts                # Avatar、Format、字幕型別
app/studio/                     # 工作台 UI 原型（全 mock，首頁無連結）
SPEC.md                         # 舊版 v2.2.1 規格
```

## 3. 技術棧

Next.js 16.3.6（App Router）、React 19.2、TypeScript 5、Tailwind CSS 4、lucide-react、ESLint 9（`eslint-config-next` 16.2.4）。純前端，無後端、無測試框架。

## 4. 開發規則

1. **不打付費 API**：M1 不得加入任何 TTS、數位人、LLM 金鑰或呼叫；新增外部服務需 Sean 同意並寫入 SPEC。
2. **不得提交憑證**：任何 API key、`.env*` 不得進 repo。
3. **不使用真人與真實品牌**：頭像、創作者、商品一律虛構；不得放真人照片或聲音。
4. **廣告內容安全**：範本不得有第一人稱虛構使用經驗或療效宣稱；匯出預設帶「AI 生成」標示。
5. **測試不可為了通過而刪改斷言**；不得 `.skip`／`.only`。
6. **Git**：從 `main` 開分支、PR 合併；不 push `main`、不 force push、不改 repo 設定、不部署 production。
7. **Commit 格式**：`<type>(scope): <說明或 AC 編號>`。

## 5. 驗證

見 [`SOP.md`](./SOP.md)。標「尚未配置」的指令不得宣稱已通過。
