# Figma Design System 練習題

> 用我們已經建好的 **Sass Design System Tokens** 來練習「從 token 組出元件、再組出頁面」。
> Figma 檔案：<https://www.figma.com/design/e87BnLqAVr9tTSyCTNP7TX>（分頁 **Design System · Tokens**）

---

## 前置：你手上有什麼

| 類型 | 名稱 | 用途 |
|---|---|---|
| 變數 · Primitives | `blue/50…900`、`gray/50…900`… | 原始色階（**不要直接用在元件上**，只給 semantic 別名）|
| 變數 · Semantic | `color/bg/*`、`color/text/*`、`color/border/*`、`color/brand/*`、`color/status/*` | **元件一律綁這一層**（`$primary`、`$text`、`$border`…）|
| 變數 · Scale | `space/xs…4xl`、`radius/none…full` | 間距、圓角 |
| 文字樣式 | `text/display`、`text/h1~h3`、`text/body`、`text/label`、`text/caption` | 套字級 |
| 效果樣式 | `shadow/sm~xl` | 陰影 |
| 模式 | Semantic 有 **Light / Dark** 兩模式 | 切模式整組換色 |

### 三條黃金規則（每題都要遵守）
1. **只綁 Semantic，不綁 Primitives**：背景用 `color/bg/*`、文字用 `color/text/*`、邊框用 `color/border/*`。這樣切 Light/Dark 才會連動。
2. **間距/圓角綁 Scale 變數**，不要手打數字（padding、gap、radius 都綁 `space/*`、`radius/*`）。
3. **文字套 text style、陰影套 shadow style**，不要每次重設 fontSize / effects。

---

## 基礎題

### 練習 1：Button 變體集
建一個 `Button` component set：
- 變體軸：`Style = Primary / Secondary / Ghost`，`State = Default / Hover`
- Primary：背景 `color/brand/primary`、hover 換 `color/brand/hover`、文字 `color/text/inverse`
- Secondary：背景 `color/bg/surface`、邊框 `color/border/default`、文字 `color/text/primary`
- Ghost：透明底、文字 `color/brand/primary`
- padding 綁 `space/sm`（上下）、`space/lg`（左右）；圓角綁 `radius/md`；文字套 `text/label`

> **AI 協助**
> ```
> 用 Figma MCP（use_figma）在檔案 e87BnLqAVr9tTSyCTNP7TX 幫我建一個 Button component set。
> 變體：Style=Primary/Secondary/Ghost × State=Default/Hover。
> 一律綁 Semantic 變數：Primary 背景 color/brand/primary、hover color/brand/hover、文字 color/text/inverse；
> Secondary 背景 color/bg/surface、邊框 color/border/default、文字 color/text/primary；Ghost 透明底、文字 color/brand/primary。
> padding 綁 space/sm 與 space/lg、圓角綁 radius/md、文字套 text/label。先說明步驟再做。
> ```

### 練習 2：Badge 標籤
建 `Badge`，變體 `Type = Neutral / Success / Warning / Danger / Info`：
- 背景用對應 `color/status/*`（Neutral 用 `color/bg/muted`）、文字用 `color/text/inverse`
- padding `space/xs` / `space/sm`、圓角 `radius/full`、文字 `text/caption`

> ✓ 範例解答已建在 Figma 分頁「練習2 解答 · Badge」。

> **AI 協助**
> ```
> 幫我在同一個 Figma 檔建 Badge component set，變體 Type=Neutral/Success/Warning/Danger/Info。
> 背景綁 color/status/*（Neutral 用 color/bg/muted），文字 color/text/inverse，
> padding 綁 space/xs、space/sm，圓角 radius/full，文字套 text/caption。
> ```

---

## 進階題

### 練習 3：Input 輸入框（含狀態）
建 `Input`，變體 `State = Default / Focus / Error`：
- 背景 `color/bg/surface`、文字 `color/text/primary`、placeholder `color/text/secondary`
- Default 邊框 `color/border/default`；Focus 邊框 `color/brand/primary`（加 2px）；Error 邊框 `color/status/danger`
- padding `space/md`、圓角 `radius/md`

### 練習 4：Card 卡片
建 `Card`：背景 `color/bg/surface`、邊框 `color/border/default`、圓角 `radius/lg`、陰影 `shadow/md`（hover 變體用 `shadow/lg`）。
內含：標題 `text/h3`（`color/text/primary`）、內文 `text/body`（`color/text/secondary`）、一顆 Primary Button（用練習 1 的元件）。

> ✓ 範例解答已建在 Figma 分頁「練習4 解答 · Card」（內嵌練習 1 的 Button 實例）。

> **AI 協助**
> ```
> 幫我建 Card 元件（Default/Hover 兩態）：背景 color/bg/surface、邊框 color/border/default、
> 圓角 radius/lg、陰影套 shadow/md（hover 用 shadow/lg）。內含 text/h3 標題、text/body 內文，
> 並嵌入我先前建的 Button 元件實例。全部綁 Semantic 變數與 style。
> ```

### 練習 5：Alert 提示
建 `Alert`，變體 `Type = Success / Warning / Danger / Info`：淺色底（提示：可暫用 `color/status/*` 直接當底，或進階挑戰自建 `color/status/*-subtle` 語義色）、文字 `color/text/primary`、左邊 4px 邊框用 `color/status/*`、圓角 `radius/md`、padding `space/md`。

---

## 挑戰題

### 練習 6：組一個「設定頁」並支援深色模式
用上面做好的元件，組一個實際頁面：
- 版面背景綁 `color/bg/base`
- 一張 Card 裡放：標題（`text/h2`）、兩個 Input、一個 Badge、底部 Primary + Secondary 兩顆 Button
- **在頁面 frame 上用 `setExplicitVariableModeForCollection(Semantic, Dark)`**，複製一份切成 Dark，做出 Light / Dark 對照
- 確認：切到 Dark 時，**沒有任何顏色寫死**（全部跟著變）

> **AI 協助**
> ```
> 幫我用已建好的 Button/Input/Badge/Card 元件，在 Figma 組一個「設定頁」：
> 頁面背景綁 color/bg/base，卡片內含 text/h2 標題、兩個 Input、一個 Badge、Primary+Secondary 按鈕。
> 然後複製一份，用 setExplicitVariableModeForCollection 把它切成 Semantic 的 Dark 模式，做 Light/Dark 對照。
> 最後幫我檢查有沒有哪個節點的顏色是寫死、沒綁變數的。
> ```

### 練習 7：擴充 token（自建語義色）
目前 status 色只有實色。請新增一組 **subtle（淺色底）語義色**：
- 在 Semantic collection 加 `color/status/success-subtle` → Light 別名 `green/100`、Dark 別名 `green/900`
- 其餘 warning/danger/info 比照
- 再回頭把練習 5 的 Alert 底色改綁這組新變數

---

## ✓ 驗收 Checklist
- [ ] 元件沒有任何寫死的顏色（都綁 Semantic 變數）
- [ ] padding / gap / 圓角都綁 Scale 變數，沒有手打數字
- [ ] 文字都套 text style、陰影都套 shadow style
- [ ] 變體命名用 `Property=Value, Property=Value` 格式
- [ ] 切 Semantic 的 Light ↔ Dark，整個頁面顏色正確連動
- [ ] 新增／改一個 primitive 或 semantic，元件自動跟著變

---

> 卡住時的通用 prompt：`「我在用 Figma MCP 練習建 design system，檔案 e87BnLqAVr9tTSyCTNP7TX。請先幫我盤點現有的變數與 style，再一步一步帶我建 <元件名>，全部綁 Semantic 變數，先說明再動手。」`
