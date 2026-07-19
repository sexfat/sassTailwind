# 修復與調整紀錄

---

## 2026-07-12

### 1. 移除所有講義與文件的裝飾性 emoji
**問題：** 講義、練習題、README 等文件含大量裝飾性 emoji（如難度標記、標題前綴、AI 提示圖示），不符使用者對文件「乾淨、專業」的偏好。
**原因：** 早期產出教材時以 emoji 作視覺標記，使用者要求全域移除。
**修正：** 以腳本批次移除裝飾性 emoji；表格中作「是/否」用途的 `✅❌` 改為排版符號 `✓ ✗`；程式碼示例內 `content: '🏠'` 改為 `'home'`；保留純排版符號 `→ ← ↔ ✓ ☐`（屬教學內容）。並同步移除 Figma 分頁名稱的 emoji 前綴。已寫入全域記憶，日後文件不再加入 emoji。
**影響範圍：**
- `README.md`、`index.html`、`sass/guide.html`、`tailwind/guide.html` — 移除標題與提示區塊 emoji
- `sass/practice/exercises.html`、`tailwind/practice/exercises.html`、各 `練習題.md` — 移除難度標記與 AI 圖示
- `figma-design-system-practice.html` / `Figma_DesignSystem_練習題.md` — 移除 emoji
- `tailwind/practice/answers/05-pricing.html`、`tailwind/examples/04-darkmode-theme.html` — 移除深色切換鈕 emoji

### 2. 教材檔案改英文命名並整理路徑
**問題：** 講義/練習/解答原為中文檔名與資料夾，跨平台與版控引用較不便。
**原因：** 統一改為英文路徑以利維護。
**修正：** `講義.html → guide.html`、`練習題.html → exercises.html`、`解答/ → answers/`、`起始/ → starter/`，並抽出共用資源 `assets/`（程式碼複製）。新增 `.gitignore` 忽略 `.playwright-cli/` 快取與 `.DS_Store`。
**影響範圍：**
- `sass/`、`tailwind/` 下講義與練習相關檔案（git 以 rename 追蹤，保留歷史）
- `.gitignore`、`assets/code-copy.css`、`assets/code-copy.js`

---

## 2026-07-19

### 1. 解決本地與遠端 git 分岔
**問題：** 本地與 `origin/master` 分岔，各有 1 個對方沒有的 commit（本地 `601cabf add`；遠端 `02633ae docs: 新增 @import 傳統架構單元並強調 @use 命名空間規則`），且兩個 commit 都改到 `sass/guide.html` 與 `sass/講義.md`，無法直接 push。
**原因：** 遠端該 commit 是同一份「@import 傳統架構」教材工作的另一版本（把獨立的「架構-import版」檔案改成 `sass/examples/07-import-architecture/` 資料夾並整合進 guide.html），與本地版本並存造成分岔。
**修正：** 依使用者決定以本地為準，用 `git push --force-with-lease origin master` 覆蓋遠端，遠端 master 改指向本地 `601cabf`。遠端原 `02633ae` 已不在 master 上，仍可從 reflog / GitHub 找回。
**影響範圍：**
- 遠端 `origin/master` — 由 `02633ae` 強制覆寫為 `601cabf`（本地內容未變動）
