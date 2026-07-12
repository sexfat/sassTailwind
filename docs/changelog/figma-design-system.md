# [LOG] Figma 教學整合與 Design System Tokens

對應規格：[docs/spec/figma-design-system.md](../spec/figma-design-system.md)

---

## 2026-07-12 — 建立 Figma 元件庫、DS Tokens、練習畫面與練習題連結

**修改檔案：**
- `figma-design-system-practice.html` / `Figma_DesignSystem_練習題.md` — 新增 Design System 練習題（7 題，每題附 AI prompt）
- `sass/practice/exercises.html`、`sass/practice/練習題.md` — 練習 1/6/7 加入 Figma 參考連結
- `tailwind/practice/exercises.html`、`tailwind/practice/練習題.md` — 練習 1–5 加入 Figma 參考連結
- `README.md` — 新增「Figma 教學檔」區塊
- Figma 檔案 `e87BnLqAVr9tTSyCTNP7TX`（外部，透過 MCP 建立）

**實作說明：**
- 依「先 tokens → 再元件、逐一建立、每步截圖驗證」流程建置。
- Tokens 採 Primitives → Semantic 別名架構，Semantic 加 Light/Dark 兩模式，切模式整組連動。
- 元件與範例解答全部綁 Semantic 變數、間距/圓角綁 Scale、文字套 text style、陰影套 effect style。
- 練習題以 node-id 深連結指向對應 Figma 畫面，方便學員點擊定位。

**已知問題 / 備註：**
- 建置過程遇到 `resize()` 會把 auto-layout 高度鎖成 FIXED 導致內容被裁切，需於 resize 後改回 hug；已記錄於練習題提醒。
- 首次截圖偶有 CJK 字型 render 時差（中文暫不顯示），重新截圖即正常。
