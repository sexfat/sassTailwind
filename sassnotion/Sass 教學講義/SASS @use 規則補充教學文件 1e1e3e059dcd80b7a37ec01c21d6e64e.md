# SASS @use 規則補充教學文件

## 目錄

1. [簡介](https://claude.ai/chat/33607cd1-8d21-4af3-8f01-e9ea0738c95d#%E7%B0%A1%E4%BB%8B)
2. [@use 基本語法](https://claude.ai/chat/33607cd1-8d21-4af3-8f01-e9ea0738c95d#use-%E5%9F%BA%E6%9C%AC%E8%AA%9E%E6%B3%95)
3. [命名空間](https://claude.ai/chat/33607cd1-8d21-4af3-8f01-e9ea0738c95d#%E5%91%BD%E5%90%8D%E7%A9%BA%E9%96%93)
4. [私有成員](https://claude.ai/chat/33607cd1-8d21-4af3-8f01-e9ea0738c95d#%E7%A7%81%E6%9C%89%E6%88%90%E5%93%A1)
5. [配置模組](https://claude.ai/chat/33607cd1-8d21-4af3-8f01-e9ea0738c95d#%E9%85%8D%E7%BD%AE%E6%A8%A1%E7%B5%84)
6. [@use vs @import](https://claude.ai/chat/33607cd1-8d21-4af3-8f01-e9ea0738c95d#use-vs-import)
7. [模組系統最佳實踐](https://claude.ai/chat/33607cd1-8d21-4af3-8f01-e9ea0738c95d#%E6%A8%A1%E7%B5%84%E7%B3%BB%E7%B5%B1%E6%9C%80%E4%BD%B3%E5%AF%A6%E8%B8%90)
8. [實際案例分析](https://claude.ai/chat/33607cd1-8d21-4af3-8f01-e9ea0738c95d#%E5%AF%A6%E9%9A%9B%E6%A1%88%E4%BE%8B%E5%88%86%E6%9E%90)
9. [常見問題與解答](https://claude.ai/chat/33607cd1-8d21-4af3-8f01-e9ea0738c95d#%E5%B8%B8%E8%A6%8B%E5%95%8F%E9%A1%8C%E8%88%87%E8%A7%A3%E7%AD%94)

## 簡介

在SASS（Syntactically Awesome Style Sheets）中，`@use` 規則是用來加載和使用其他SASS文件（模組）的現代方法。它是在Dart Sass 1.23.0版本（2019年10月）中引入的，作為替代舊有 `@import` 規則的新選擇。

`@use` 規則具有以下關鍵優勢：

- **明確的命名空間**：避免全局變數和混合器（mixins）的命名衝突
- **僅加載一次**：即使在多個文件中引用同一個模組，它也只會被包含一次
- **私有成員**：可以使用下劃線（`_`）前綴來定義不被外部訪問的成員
- **可配置**：模組可以接受外部配置參數

## @use 基本語法

### 基本用法

```scss
@use 'filename';

```

這會加載位於當前文件夾中的 `filename.scss` 文件，或是 `filename/_index.scss`。

### 引用路徑

`@use` 支援多種路徑引用方式：

1. **相對路徑**：

```scss
@use 'components/button';    // 從當前文件夾的子文件夾載入
@use '../variables';         // 從上層文件夾載入

```

1. **從載入路徑載入**：

```scss
@use 'sass:math';            // 載入內建模組
@use 'package/style';        // 從 node_modules 載入

```

### 使用模組成員

當使用 `@use` 載入模組後，該模組的所有公共成員（變數、mixins、函數）都可以透過命名空間訪問：

```scss
@use 'colors';

.alert {
  background-color: colors.$warning;
  padding: colors.$spacing;
  @include colors.rounded;
}

```

## 命名空間

### 預設命名空間

`@use` 規則默認以文件名作為命名空間：

```scss
// _colors.scss
$primary: #3498db;
$secondary: #2ecc71;

// main.scss
@use 'colors';
.button {
  background-color: colors.$primary;
}

```

### 自定義命名空間

您可以使用 `as` 關鍵字為模組指定自定義命名空間：

```scss
@use 'colors' as c;

.button {
  background-color: c.$primary;
}

```

### 無命名空間

您可以使用 `as *` 將模組成員直接導入到當前作用域，不需要命名空間前綴：

```scss
@use 'colors' as *;

.button {
  background-color: $primary;
}

```

> 注意：雖然 as * 使用方便，但在大型項目中可能引起命名衝突，應謹慎使用。
> 

## 私有成員

### 定義私有成員

在模組中，以下劃線（`_`）開頭的成員被視為私有，不能被外部模組訪問：

```scss
// _utils.scss
$_internal-spacing: 8px;     // 私有變數
$public-spacing: 16px;       // 公共變數

@mixin _internal-mixin {     // 私有mixin
  // ...
}

@mixin public-mixin {        // 公共mixin
  // ...
}

```

在其他文件中使用此模組時，只能訪問公共成員：

```scss
@use 'utils';

.element {
  padding: utils.$public-spacing;   // 有效
  // padding: utils.$_internal-spacing;  // 錯誤！不能訪問私有變數
  @include utils.public-mixin;      // 有效
  // @include utils._internal-mixin;     // 錯誤！不能訪問私有mixin
}

```

## 配置模組

### 模組配置

`@use` 可以為模組提供配置選項，用於覆蓋模組中的預設變數：

```scss
// _theme.scss
$primary-color: blue !default;
$font-size: 16px !default;

.themed {
  color: $primary-color;
  font-size: $font-size;
}

```

然後在使用時可以提供新的值：

```scss
@use 'theme' with (
  $primary-color: #ff6347,
  $font-size: 18px
);

```

`!default` 標記表示只有在變數未被其他地方定義時才使用此預設值。

### 配置多個模組

```scss
// 配置多個不同的模組
@use 'theme' with ($primary-color: red);
@use 'layout' with ($spacing: 20px);

```

## @use vs @import

### @import 的問題

傳統的 `@import` 存在以下問題：

- 所有變數和混合器都在全局作用域中
- 多次導入同一個文件會重複包含其內容
- 難以追蹤變數的來源
- 沒有原生支持私有成員

### @use 的優勢

`@use` 解決了這些問題：

- 使用命名空間隔離變數和函數
- 每個文件只被包含一次
- 明確標示每個變數和函數的來源
- 支持私有成員
- 允許模組配置

### 轉換指南

從 `@import` 轉換到 `@use` 的基本步驟：

1. 識別所有的 `@import` 語句
2. 將它們替換為相應的 `@use` 語句
3. 更新代碼中的變數和混合器引用，添加相應的命名空間
4. 考慮使用 `@forward` 在index文件中合併和重新導出多個模組

```scss
// 舊方式
@import 'variables';
@import 'mixins';

// 新方式
@use 'variables';
@use 'mixins';

```

## 模組系統最佳實踐

### 目錄結構

一個良好的SASS模組化目錄結構例子：

```
styles/
├── abstracts/
│   ├── _variables.scss
│   ├── _functions.scss
│   ├── _mixins.scss
│   └── _index.scss
├── base/
│   ├── _reset.scss
│   ├── _typography.scss
│   └── _index.scss
├── components/
│   ├── _buttons.scss
│   ├── _cards.scss
│   └── _index.scss
├── layout/
│   ├── _header.scss
│   ├── _footer.scss
│   └── _index.scss
└── main.scss

```

### 使用 @forward

在每個文件夾的 `_index.scss` 中使用 `@forward` 重新導出多個文件：

```scss
// abstracts/_index.scss
@forward 'variables';
@forward 'functions';
@forward 'mixins';

```

然後在主文件中一次性引入：

```scss
// main.scss
@use 'abstracts';
@use 'base';
@use 'components';
@use 'layout';

// 使用
.element {
  color: abstracts.$primary-color;
  @include abstracts.responsive(tablet) {
    // ...
  }
}

```

### 統一命名約定

為了保持一致性，請建立明確的命名約定：

- 所有部分文件以下劃線開頭（如 `_variables.scss`）
- 使用小寫字母和連字符命名文件（如：`_color-palette.scss`）
- 私有成員以下劃線開頭（如：`$_internal-value`）
- 相關模組放在同一目錄下

## 實際案例分析

### 案例1：主題系統

**abstracts/_colors.scss**:

```scss
$primary: #3498db !default;
$secondary: #2ecc71 !default;
$accent: #e74c3c !default;

@function lighten-custom($color, $amount) {
  @return mix(white, $color, $amount);
}

```

**abstracts/_spacing.scss**:

```scss
$base-spacing: 8px !default;

$spacings: (
  'xs': $base-spacing / 2,
  'sm': $base-spacing,
  'md': $base-spacing * 2,
  'lg': $base-spacing * 3,
  'xl': $base-spacing * 4
) !default;

@function space($size) {
  @return map-get($spacings, $size);
}

```

**abstracts/_index.scss**:

```scss
@forward 'colors';
@forward 'spacing';

```

**themes/_light.scss**:

```scss
@use '../abstracts' with (
  $primary: #0074d9,
  $secondary: #01ff70,
  $accent: #ff4136,
  $base-spacing: 10px
);

```

**main.scss**:

```scss
@use 'themes/light' as theme;

.button {
  background-color: theme.$primary;
  padding: theme.space('md');
  margin-bottom: theme.space('lg');
  color: theme.lighten-custom(theme.$accent, 20%);
}

```

### 案例2：元件庫

**components/_button.scss**:

```scss
@use '../abstracts/colors';
@use '../abstracts/spacing';

$_border-radius: 4px;
$button-height: 40px !default;

@mixin base-button {
  display: inline-block;
  height: $button-height;
  padding: 0 spacing.space('md');
  border-radius: $_border-radius;
  font-weight: bold;
  cursor: pointer;
}

.btn-primary {
  @include base-button;
  background-color: colors.$primary;
  color: white;
}

.btn-secondary {
  @include base-button;
  background-color: colors.$secondary;
  color: white;
}

```

**components/_index.scss**:

```scss
@forward 'button';
@forward 'card';
@forward 'form';

```

**main.scss**:

```scss
@use 'components' with (
  $button-height: 48px
);

// 元件已自動包含
// 可以在此添加其他樣式

```

## 常見問題與解答

### Q: 如何同時使用多個模組中的同名變數？

A: 透過使用不同的命名空間：

```scss
@use 'theme1' as t1;
@use 'theme2' as t2;

.element {
  color: t1.$primary;
  background-color: t2.$primary;
}

```

### Q: 如何在模組中載入另一個模組而不暴露其內容？

A: 在模組中使用 `@use` 而不是 `@forward`：

```scss
// _module.scss
@use 'helpers';  // 只在此模組內使用，不向外暴露
$variable: helpers.$some-value;

```

### Q: 如何解決載入模組時的路徑問題？

A: 可以配置SASS的加載路徑，或使用相對路徑：

```scss
// 在命令行中
sass --load-path=node_modules

// 或在webpack配置中
{
  loader: 'sass-loader',
  options: {
    sassOptions: {
      includePaths: ['node_modules']
    }
  }
}

```

### Q: 如何組織大型專案的模組？

A: 使用7-1模式或類似的架構，結合 `@use` 和 `@forward` 來建立清晰的模組化結構。確保每個模組都有單一職責，並在index文件中集中管理導出。

### Q: 可以在一個文件中多次使用同一模組嗎？

A: 可以多次 `@use` 同一模組，但它只會被包含一次。如果使用不同的配置，則應使用不同的命名空間：

```scss
@use 'theme' as default-theme;
@use 'theme' with ($primary-color: red) as red-theme;

```

## 總結

SASS的 `@use` 規則為樣式表提供了強大的模組化能力，解決了傳統 `@import` 的許多問題。透過恰當使用命名空間、私有成員和模組配置，可以建立更加可維護、可擴展的SASS專案結構。

在新項目中應優先使用 `@use` 而非 `@import`，並考慮逐步將現有項目遷移到這一更現代的模組系統。

---

© 2025 SASS教學手冊 | 此文件僅供學習參考