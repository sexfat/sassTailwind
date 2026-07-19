# 如何拆 Sass 架構（`@import` 版）

> 這是架構單元的 **`@import` 版本**，對應參考範例 [sexfat/sassProject](https://github.com/sexfat/sassProject/tree/master/sass) 的實際寫法。
> 另有一份 **`@use` / `@forward` 版本**在主講義第 13 節，兩者結構相同、差別只在引入語法。`@import` 是舊寫法、官方已宣布逐步淘汰，但因為現存專案與教材大量使用，這裡完整保留一份對照。新專案建議用 `@use` 版。

前面學的是語法，這一節談的是**檔案怎麼擺**。一個 `style.scss` 寫到兩千行，就算語法全用對了一樣難維護。

## 核心原則：一個檔案只負責一件事

拆檔的判斷標準不是「行數多寡」，而是**改動的理由**。改主色會動到哪個檔案？改按鈕圓角會動到哪個檔案？如果答案是同一個，就該拆開。反過來說，如果一個東西永遠會一起改，硬拆成三個檔案只是增加跳檔案的成本。

## 一個實用的目錄結構

```
sass/
├── _var.scss              # 全域變數：色票、字級、斷點
├── base/                  # 全站基礎樣式
│   ├── _setting.scss      # reset、box-sizing、全域預設
│   ├── _color.scss        # 顏色定義
│   └── _font.scss         # 字體與字級
├── mixin/
│   └── _mixin.scss        # 共用 mixin：RWD 斷點、置中、圓角
├── component/             # 可重複使用的元件（不綁位置）
│   ├── _btn.scss
│   ├── _card.scss
│   └── _title.scss
├── layout/                # 版面區塊（綁位置，每頁都有）
│   ├── _header.scss
│   ├── _nav.scss
│   ├── _footer.scss
│   └── _banner.scss
├── page/                  # 單一頁面專屬樣式
│   ├── _index.scss
│   └── _product.scss
├── plugin/                # 第三方套件的樣式覆寫
│   └── _swiper.scss
└── style.scss             # 唯一入口，只做組裝
```

這是業界常見的 **7-1 pattern** 的簡化版。不用一開始就把七個資料夾全建好，**從 `base` / `component` / `layout` 三個開始就夠了**，專案長大再拆。

## 各層的分界線

最容易搞混的是 `component`、`layout`、`page` 這三層，判斷方式：

| 資料夾 | 判斷問題 | 例子 |
| --- | --- | --- |
| `component` | 這東西**搬到別頁還能用**嗎？ | 按鈕、卡片、標籤、表單欄位 |
| `layout` | 這是**版面骨架**、每頁都出現嗎？ | header、nav、footer、sidebar |
| `page` | 這是**某一頁獨有**、別頁不會用嗎？ | 首頁的 hero 動畫、產品頁的比較表 |

一個判斷技巧：**component 不該決定自己的位置**。按鈕元件負責長什麼樣（顏色、圓角、padding），但「靠右對齊、距離上方 20px」該由用它的 layout 或 page 決定。元件一旦寫死 `margin-left: 40px`，換個地方用就爆掉了。

## 入口檔只做組裝

`style.scss` 是唯一會被編譯成 CSS 的檔案，它裡面**不該有任何樣式**，只負責決定載入順序：

```scss
// style.scss —— 唯一入口，不寫樣式
// 1. 抽象層：變數與 mixin（不產生 CSS）
@import 'var';
@import 'mixin/mixin';

// 2. 基礎層
@import 'base/setting';
@import 'base/color';
@import 'base/font';

// 3. 元件層
@import 'component/btn';
@import 'component/card';
@import 'component/title';

// 4. 版面層
@import 'layout/header';
@import 'layout/nav';
@import 'layout/footer';

// 5. 頁面層
@import 'page/index';
@import 'page/product';

// 6. 第三方覆寫（放最後，權重才蓋得過）
@import 'plugin/swiper';
```

**順序是有意義的**：由通用到專屬，由低權重到高權重。base 先出、plugin 覆寫最後出，這樣後面的規則才蓋得過前面的，不需要靠 `!important` 硬幹。

編譯只要指向入口檔：

```bash
sass sass/style.scss css/style.css --watch
```

其他檔案都是 partial（底線開頭），不會單獨編譯出 CSS。

## `@import` 的全域作用域：方便但危險

`@import` 和 `@use` 最大的差別在這裡：**`@import` 沒有命名空間，所有變數和 mixin 都被攤平到同一個全域空間**。

好處是「方便」——只要某個 partial 在入口檔裡**比較早被 `@import`**，後面的 partial 就能直接用它的變數，不用前綴、也不用再各自 import 一次：

```scss
// _var.scss
$primary: #3b82f6;

// component/_btn.scss
.btn {
  background: $primary;   // 直接用，不用寫 var.$primary
}
```

只要 `style.scss` 裡 `@import 'var'` 排在 `@import 'component/btn'` 前面，這就能編譯過。這也是為什麼參考 repo 的 `_btn.scss`、`_mixin.scss` 裡面直接寫 `$m`、`$primary` 都不用前綴。

代價是**全域污染**：

- **同名變數會靜默互相覆蓋。** `$font-size` 在 `_font.scss` 定義一次、又在 `_btn.scss` 定義一次，後載入的直接蓋掉前面的，**不會有任何錯誤或警告**，你只會發現樣式莫名其妙跑掉。
- **看不出來源。** 讀到 `$primary` 不知道它定義在哪個檔案，只能全專案搜尋。
- **順序變成隱形地雷。** 某個 partial 能不能用某個變數，取決於它在入口檔的 `@import` 順序，排錯就是 Undefined variable。

這正是 Sass 官方要用 `@use` 取代 `@import` 的原因（詳見主講義第 5 節）。`@use` 版本用命名空間把這些問題全部擋掉。

## 常見錯誤

**1. 抽象層寫出 CSS。** `_var.scss`、`_mixin.scss` 應該只有變數與 mixin 定義，**不該有任何選擇器**。參考 repo 裡的 `_mixin.scss` 混了 `.box`、`.card` 這些實際樣式，那是教學示範方便，實務上要拆出去——否則它每次被 `@import` 都會輸出一堆不相干的 CSS。

**2. 變數命名沒有前綴或命名規則。** 因為 `@import` 是全域的，最好自己約定命名規範（例如色彩一律 `$color-xxx`、間距一律 `$space-xxx`），降低撞名機率。這是用 `@import` 就得自己扛的紀律，換成 `@use` 則由命名空間自動處理。

**3. 資料夾建太多。** 三個檔案的專案不需要七層目錄。結構是為了解決問題而存在，沒有問題就不要先造結構。

**4. page 層肥大。** 如果 `_index.scss` 長到三百行，代表裡面有東西該被抽成 component。頁面層理想上只放「這頁獨有的排列與微調」。

## `@import` vs `@use` 快速對照

| | `@import`（舊） | `@use` / `@forward`（新） |
| --- | --- | --- |
| 作用域 | 全域，攤平 | 有命名空間隔離 |
| 引用變數 | 直接 `$primary` | `var.$primary` |
| 同名變數 | 靜默覆蓋，難除錯 | 撞名直接報錯，擋在編譯期 |
| 重複載入 | 會重複輸出 CSS | 只載入一次 |
| 官方狀態 | 逐步淘汰中 | 現行標準 |
| 對應範例 | 本篇 / 參考 repo | 主講義第 13 節 |
