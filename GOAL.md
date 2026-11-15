# Goal — UGC 短影片生成器 M1

> ⚠️ **建議暫緩，需 Sean 決定後才開發。** 理由見 `PRD/SPEC.md` §0：目前沒有 AI 主播能力、匯出影片無聲，真正的 AI 主播需付費外部 API，且 UGC 見證式廣告有法規風險。以下 M1 僅在 Sean 決定繼續時適用。

## Objective

在純前端、不呼叫任何付費 API、不使用真人肖像或真實品牌的前提下，把 `/` 做成「誠實可用的字幕短影片工具」：品質閘門擋得住失敗、匯出影片有聲（使用者自己的旁白）、字幕分句且與時間軸對齊、匯出格式依瀏覽器支援自動選擇、影片帶 AI 生成標示；`/studio` 明確隔離為原型。

規格依據：`PRD/SPEC.md` v4.0（§4 FR、§7 風險、§8 M1）。

## Acceptance criteria

每條 AC 的「驗證」指令必須 exit 0。

- **AC-001：品質閘門擋得住失敗**
  - 新增 `typecheck`（`tsc --noEmit`）、`test`（Vitest）、`e2e`（Playwright，Chromium，啟用 fake media device）script。
  - CI 移除 `continue-on-error` 與 `|| echo`；新增 typecheck、e2e job；移除或改正 GitHub Pages deploy（Next 不產生 `dist/`）。
  - `eslint-config-next` 與 `next` 版本對齊。
  - 驗證：`npm run lint && npm run typecheck && npm test && npm run build && npm run e2e` 全部 exit 0；`grep -nE "continue-on-error|\|\| echo" .github/workflows/ci.yml` 無結果；PR 上 GitHub Actions 全綠。

- **AC-002：匯出影片含聲音**（FR-005、FR-009）
  - 新增「錄旁白」（`getUserMedia` 麥克風）與「上傳音檔」兩種音訊來源，接進錄影 stream；瀏覽器 TTS 僅作預覽，UI 明示「TTS 不會進入影片」。
  - 錄影長度等於音訊長度（非字數估算）；錄完立即停止麥克風 track。
  - 驗證：`npm test -- tests/recorder.test.ts`（以 mock `MediaStream` 斷言合成 stream 含 1 條 video 與 1 條 audio track、停止後 track 皆為 ended）；`npm run e2e -- tests/e2e/export-audio.spec.ts`（fake 麥克風錄 3 秒 → 下載檔案大小 > 0 且頁面回報 audio track 數為 1）。

- **AC-003：分句字幕與時間軸**（FR-004、FR-006）
  - 腳本依標點與長度切句；每句依音訊長度按字數比例分配時間；canvas 依目前時間只顯示當前句。
  - 驗證：`npm test -- tests/subtitle-timeline.test.ts`（中文標點切句、空白句過濾、總時長等於音訊長度、每句 ≤ 18 字自動換行）。

- **AC-004：匯出格式相容**（FR-007）
  - 依 `MediaRecorder.isTypeSupported` 依序選擇 mp4 → webm(vp9) → webm(vp8)；都不支援時顯示明確錯誤，不再固定 vp9。
  - 下載檔名副檔名與實際格式一致。
  - 驗證：`npm test -- tests/mime-select.test.ts`（mock `isTypeSupported` 覆蓋三種支援組合與全不支援）。

- **AC-005：AI 生成標示與原型隔離**（FR-008、SPEC §7）
  - 匯出影片預設在角落燒入「AI 生成」標示（可關閉，但關閉時顯示提醒）；內建範本不得含第一人稱虛構使用經驗或療效字眼。
  - `/studio` 頁首顯示「原型示意，不會生成影片」，並設 `noindex`；mock 資料只用虛構名稱。
  - 驗證：`npm test -- tests/ai-label.test.ts tests/template-safety.test.ts`（後者掃描範本字串，含「我用了」「改善失眠」等禁用詞即失敗）；`npm run e2e -- tests/e2e/studio-prototype.spec.ts`。

## Out of scope

- 任何付費 TTS、數位人、口型同步或 LLM API（含試用金鑰）。
- 帳號、點數、金流、計費。
- 一鍵發布到 IG／TikTok／YouTube。
- 真人肖像、聲音克隆、真實品牌或商品資料。
- production 部署與 Vercel 設定變更。

## Exit gate

- Sean 先決定「繼續」才可開始 M1。
- AC-001～AC-005 驗證指令全部 exit 0，記錄於 `STATUS.md`；實作 PR 的 GitHub Actions 全綠。
- 進入 M2（付費 API 評估）前，需 Sean 確認預算上限與法務對 UGC 見證式廣告的意見。
