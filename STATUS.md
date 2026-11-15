# Status — ugc-video-generator（UGC 短影片生成器）

- 主 repo：`openclawsean024-create/ugc-video-generator`（`main` @ `370b377`）
- 規格：`PRD/SPEC.md` v4.0；目標：`GOAL.md`（M1，僅在繼續時適用）
- 狀態：🟠 **文件重建完成；評估建議暫緩，待 Sean 決定**（2026-11-16）
- §0：完成度 25；獲利潛力 低（以目前純前端方案）

## 目前狀態摘要

- `/`：腳本 + emoji 頭像 + 比例 + 字幕樣式 + TTS 預覽 + canvas 錄影；**匯出無聲**、字幕不分句、長度以字數估算。
- `/studio`：完整 UI 原型，全 mock，首頁無連結。
- 無測試；CI 不擋失敗；GitHub Pages deploy 失敗。

## FR 對照（全部在 ugc-video-generator）

| FR | 需求 | 優先 | 狀態 |
|---|---|---|---|
| FR-001 | 腳本 + TTS 預覽 | P0 | 已實作 |
| FR-002 | 頭像選擇 | P0 | 部分 |
| FR-003 | 比例選擇 | P0 | 已實作 |
| FR-004 | 字幕樣式 | P0 | 部分 |
| FR-005 | 匯出含聲音 | P0 | 未實作 |
| FR-006 | 長度與語音同步 | P0 | 未實作 |
| FR-007 | 格式相容 | P0 | 未實作 |
| FR-008 | AI 生成標示 | P0 | 未實作 |
| FR-009 | 自錄／上傳旁白 | P1 | 未實作 |
| FR-010 | 商品 URL 分析 | P1 | 未實作（原型） |
| FR-011 | 數位人選擇 | P1 | 未實作（原型） |
| FR-012 | 多版本變體 | P2 | 未實作（原型） |
| FR-013 | 帳號與計費 | P2 | 未實作 |
| FR-014 | 一鍵發布 | P2 | 未實作 |

## Deterministic checks

本次未在本機執行（環境無 node）。最近 CI：2026-09-28 run `36412545093` — lint／test／build ✓（皆不擋失敗），deploy ✗。

## 本次變更

- 改寫 `PRD/SPEC.md`、`AGENTS.md`（保留 Next.js agent rules 區塊）；新增 `GOAL.md`、`SOP.md`、`STATUS.md`；未動程式、設定、測試、README、根目錄 `SPEC.md`。

## 待決事項

1. 是否暫緩，或只做 M1 字幕短影片工具。
2. M2 是否評估付費 TTS／數位人 API 與預算上限。
3. 根目錄舊 `SPEC.md` 與 `/studio` 原型去留。
