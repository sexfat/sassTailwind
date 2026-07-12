# [SPEC] Figma 教學整合與 Design System Tokens

- **日期**：2026-07-12
- **負責人**：bryant_huang
- **狀態**：done
- **變更紀錄**：[docs/changelog/figma-design-system.md](../changelog/figma-design-system.md)

---

## 背景

Sass / Tailwind 教材原本只有程式碼講義與練習，缺少視覺化的「設計 vs 程式碼」對照，也沒有可供學員實際操作的 design token / design system 練習環境。因此在 Figma 建立一份對照教材與 token 系統。

## 功能說明

- **Sass 元件庫**：Button、Card、Alert 三組 variant set，加上 Token 色板頁，顏色/間距/圓角綁定 Figma 變數，並標註對應的 SCSS 變數名。
- **Tailwind 練習畫面稿**：重建 5 題解答（名片、登入、響應式、group、深色價目表）為設計稿。
- **Design System Tokens**：
  - Primitives 原始色階（blue/indigo/green/red/amber/gray × 50–900 + black/white）。
  - Semantic 語義色（bg/text/border/brand/status），以別名指向 primitives，含 Light / Dark 兩模式。
  - Scale（間距、圓角）、Text styles 型別階、Effect styles 陰影階。
- **DS 範例解答**：Button / Badge / Input / Card 元件，以及組合出的「設定頁」Light/Dark 對照，全部綁 Semantic 變數。
- **練習題整合**：各練習加入 Figma 參考樣式的 node-id 深連結（HTML 與 Markdown 同步）。

## 實作範圍

- Figma 檔案：`e87BnLqAVr9tTSyCTNP7TX`（透過 Figma MCP 建立）。
- 專案文件：DS 練習題（HTML/MD）、README「Figma 教學檔」區塊、各練習題的 Figma 參考連結。

## 不在範圍內

- Sass 練習 2/3/4/5 未建立獨立的 Figma 參考畫面。
- 尚未把 Tailwind 練習畫面抽象成 Figma 元件/變數。

## 驗收條件

- [x] Figma 建立 Sass 元件庫（Button/Card/Alert）與 Token 色板
- [x] 建立 Primitives → Semantic 別名的 token 架構，含 Light/Dark 模式
- [x] 建立 Text styles 與 Effect styles
- [x] Tailwind 5 題練習畫面稿完成
- [x] DS 練習題（含 AI prompt）與範例解答（Button/Badge/Input/Card/設定頁）完成
- [x] 各練習題加入可定位的 Figma 參考連結
