# Vue Plugins

## Vue-Gtag

install

```bash=
npm install vue-gtag
```

plugin

```typescript
import Vue from 'vue'
import VueGtag from 'vue-gtag'

Vue.use(VueGtag, {
  config: {
    id: 'Vue-Gtag id'
  }
})
```

add plugin to `plugins` in `nuxt.config.ts`

```typescript
export default {
  plugins: [
    { src: '~/plugins/vue-gtag.ts', mode: 'client' }
  ]
}
```
