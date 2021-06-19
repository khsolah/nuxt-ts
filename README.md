# nuxt-ts

## Before starting work, you have to know

> 1. 以 git cz 取代 git commit
> 2. 不能在 master 上提交 commit
> 3. 在更版之前，記得要執行 npm run release 產 changelog

### install [git-cz](https://juejin.cn/post/6844903606815064077)

```bash
# git-cz
$ npm install -g commitizen cz-conventional-changelog
$ echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

### 提交 commit

```bash
✘ git commit -m '💩 commit'
✓ git cz
```

在完成 git cz 後，打 commit 之前，會先執行 .husky/pre-commit，而這個 pre-commit 會做兩件事：

1. 確認目前的 branch，如果是 master 則直接報錯，取消 commit
2. lint fix 所有提交 commit 的檔案

### npm run release

這個指令會產生一份 changelog，並提交一個 release commit

---

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate

# lint files
$ lint # lint all files
$ lint:style # lint css
$ lint:ts # lint js,ts, and vue

# unit test
$ npm run test

# create release log
$ npm run release
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org), [Typescript Nuxtjs docs](https://typescript.nuxtjs.org/zh-hant/).

**Table of contents**

- [01 - Project Structure](docs/project-structure)
- [02 - Plugins](docs/plugins)
  - [02.1 - Nuxt Modules](docs/nuxt-modules)
  - [02.2 - Vue Plugins](docs/vue-plugins)
  - [02.3 - Custom Plugins](docs/custom-plugins)
- [03 - Middleware](docs/middleware)
- [04 - Vuex](docs/vuex)
  - [04.1 - Root Module](docs/root-module)
  - [04.2 - Namespaced Module](docs/namespaced-module)
- [05 - Testing](docs/testing)
