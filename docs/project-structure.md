# Project Structure

## .husky

只有使用到 pre-commit 這個 hooks，會在 commit 前

1. 確認目前不在 master branch，如果在的話會報錯不給 commit
2. 執行 lint fix

## .nuxt

nuxt build 出來的檔案

## @types

存放共用 type、interface、class

## assets

存放未經編譯過的檔案，如 .less、.scss、.js

## components

同 vue 的 components

## coverage

jest 的測試報告

## layouts

可以在 pages 裡的 components 使用 `layout` 來指定頁面要使用哪一種 layout，預設為 `default`，只有在 pages 裡的 components 有效

```typescript=
// ~/pages/somepage.vue
export default Vue.extend({
  layout: 'default'
})
```

## pages

page components，只有在這裡的 components 有 asyncData hook 及 fetch hook，且要注意在這兩個 hooks 裡沒有 this。而 nuxt 會自動產生一份 router.js，依照檔名來配置路徑

## [middleware](https://nuxtjs.org/docs/2.x/directory-structure/middleware)

會在頁面 render 前執行

## plugins

如果使用的套件們有 nuxt module，就必須自己包一個 `plugin`，並在 `nuxt.config.ts` 的 `plugins` 中註冊，如 [vue-gtag](https://matteo-gabriele.gitbook.io/vue-gtag/)

```bash
# install vue-gtag
$ npm i vue-gtag
```

```typescript
// ~/plugins/vue-gtag.ts
import Vue from 'vue'
import VueGtag from 'vue-gtag'

Vue.use(VueGtag, {
  config: {
    id: process.env.GOOGLE_ANALYTICS_ID
  }
})
```

```typescript
// nuxt.config.ts
export default {
  // ...
  plugins: [
    { src: '~/plugins/vue-gtag.ts', mode: 'client' }
  ]
}
```

## static

靜態檔案

## store

Vuex，在這裡面的檔案會自動產生一份 namespaced module 的 vuex，可以直接在 components 中通過 this.$store 存取

## test

Jest Unit Test

## utilities

## windi.config.ts

可在這裡修改 windicss 的配置
