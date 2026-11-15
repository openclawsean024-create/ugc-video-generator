# UGC 短影片生成器 — 開發與驗證 SOP

## 規格對齊狀態（2026-11-16）

- ✅ `PRD/SPEC.md` v4.0 依 `main`（`370b377`）程式重建；`GOAL.md` 定義 M1。
- ⚠️ 評估建議**暫緩**；Sean 決定前不開發。
- ⚠️ 本機無法執行 node：下表所有指令**未在本機執行**，結果欄只引用 GitHub Actions 紀錄。

## 環境

```bash
npm ci        # 使用 package-lock.json
npm run dev   # http://localhost:3000（未在本機執行）
```

Node 版本未在 repo 固定；CI 用 Node 20。

## 驗證指令（依 `package.json` scripts 查證）

| 類型 | 指令 | 狀態 | 最近證據 |
|---|---|---|---|
| Install | `npm ci` | 可用 | CI 2026-09-28 成功 |
| Lint | `npm run lint`（`eslint`） | 可用 | CI lint ✓，但設 `continue-on-error` |
| Typecheck | — | **尚未配置** | — |
| Unit test | `npm test` | **尚未配置**（無 script、無測試檔） | CI test job 以 `\|\| echo` 吞錯 |
| Build | `npm run build` | 可用 | CI build ✓（`continue-on-error`） |
| E2E | — | **尚未配置** | — |
| Format | — | **尚未配置** | — |

## CI 現況

- lint、build `continue-on-error`；test `|| echo`：失敗不會擋。
- deploy job 走 GitHub Pages；2026-09-28 run `36412545093` 在 `configure-pages` 失敗（repo 未啟用 Pages）。
- 本次文件 PR 不改 CI；M1 AC-001 修正。

## 手動驗證（M1 時）

錄影與麥克風需在 Chrome 實測：按「錄旁白」→ 允許麥克風 → 錄 5 秒 → 匯出 → 用播放器確認有聲、字幕逐句切換、角落有「AI 生成」。

## 故意不做

- ❌ 付費 AI API、帳號、計費、平台自動發布、真人素材、production 部署。
