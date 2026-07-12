# Sass & Tailwind CSS 教學講義

一套從零開始的前端樣式工具教材，包含**講義、可執行範例、練習題與解答**。適合教學授課或自學。總課程時數約 **15 小時（8 堂課）**，詳見 [`排課表.md`](排課表.md)。

## 課程內容

```
.
├── 排課表.md                      # 15 小時、8 堂課的完整排課表
├── Figma_DesignSystem_練習題.md/.html  # Figma design system 練習（搭配 Figma token 檔）
├── sass/
│   ├── 講義.md / .html  # Sass/SCSS 完整講義（12 章，md 與網頁版同步）
│   ├── examples/        # 可執行的 .scss 範例，可直接編譯觀察輸出
│   └── practice/        # 練習題 + 解答（.md 與 .html，每題附 AI prompt）
│
└── tailwind/
    ├── 講義.md / .html  # Tailwind CSS 完整講義（11 章，md 與網頁版同步）
    ├── examples/        # 可直接用瀏覽器開啟的 HTML 範例
    └── practice/        # 題目 + 起始檔 + 解答（HTML，每題附 AI prompt）
```

### Figma 教學檔（設計 ↔ 程式碼對照）
- **元件庫 + Design System Tokens**：<https://www.figma.com/design/e87BnLqAVr9tTSyCTNP7TX>
  - Sass 元件庫（Button / Card / Alert / Token 色板）、Tailwind 練習畫面稿（名片 / 登入 / 響應式 / group / 深色價目表）
  - Design System Tokens：Primitives → Semantic 別名（含 Light / Dark 模式）、Scale、文字/陰影樣式
- **搭配練習**：[`figma-design-system-practice.html`](figma-design-system-practice.html)（7 題，每題附可貼給 AI 的 prompt）

> 講義與練習有雙向連結：講義結尾可直接前往練習題，練習/解答頁也能回到講義。
> 每一題練習都附「AI 協助」示範怎麼寫 prompt 請 AI 帶你做（而非直接給答案）。

## 學習路線建議（15 小時 / 8 堂）

| 堂 | 主題 | 時數 |
|----|------|------|
| 1 | Sass 入門：環境、變數、巢狀 | 2.0h |
| 2 | Sass 模組化與重用（Partials / @use / Mixin / @extend）| 2.0h |
| 3 | Sass 函式與運算 | 2.0h |
| 4 | Sass 控制流程與實戰（@each / Map / 設計系統）| 2.0h |
| 5 | Tailwind 概念與安裝 | 1.5h |
| 6 | Tailwind 工具類與佈局（Flex / Grid）| 2.0h |
| 7 | Tailwind RWD / 狀態變體 / 深色模式 | 2.0h |
| 8 | Tailwind 自訂主題與綜合實戰 | 1.5h |

> 每堂課的分段內容與時間配比，見 [`排課表.md`](排課表.md)。

## 環境需求

- **Sass**：Node.js（用 npm 安裝 Dart Sass），或 VS Code 的 *Live Sass Compiler* 擴充套件。
- **Tailwind**：練習用 CDN 即可，不需安裝；正式專案建議用 Node.js + Vite。
- 編輯器建議：**VS Code** + 下列擴充套件
  - Tailwind CSS IntelliSense
  - Live Server（開 HTML 範例）
  - Live Sass Compiler（即時編譯 Sass）

## 快速開始

```bash
# 安裝 Sass（全域）
npm install -g sass

# 編譯單一檔案
sass sass/examples/01-variables.scss output.css

# 監看整個資料夾並即時編譯
sass --watch sass/examples:dist --style=expanded
```

- **Sass 練習**：打開 `sass/practice/exercises.html`（或 `.md`），依題目動手寫，再對照 `sass/practice/answers/`。
- **Tailwind 練習/範例**：直接用瀏覽器（或 Live Server）打開 `tailwind/practice/exercises.html`、`tailwind/examples/*.html` 即可，皆用 Play CDN，不需安裝。
- **看講義**：用瀏覽器打開 `sass/guide.html`、`tailwind/guide.html`（含側邊章節導覽）。

---

> 建議搭配官方文件學習：
> - Sass 官方文件：https://sass-lang.com/documentation/
> - Tailwind 官方文件：https://tailwindcss.com/docs
