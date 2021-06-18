# Vuex (Namespaced Module)

## Namespaced Type

基本上 Namespaced Module 和 Root Module 定義 vuex 的方法差不多，只差在需要多定義一個 type - Namespaced 在 `~/store/index.ts` 裡

```typescript=
export type Namespaced<T, N extends string> {
  [P in keyof T & string as `${N}/${P}`]: T[P]
}
```

## State

同 Root Module 的 State

## Getters

與 Root Module 的 Getters 差在需要多定義一個 NamespacedGetterTypes，目的是給 components 裡的 `this.$store` 使用，因為 Nuxt 的 Vuex 預設是使用 Namespaced Module，會使用 folder 名稱當作前綴。假設目前 vuex 資料夾如下：

```text
store
  AnotherModule
    actions.ts
    getters.ts
    mutations.ts
    state.ts
  actions.ts
  getters.ts
  index.ts
  mutations.ts
  state.ts
```

則 AnotherModule 資料夾下的 state, getters, mutations 和 actions 名稱都會被加上 `AnotherModule/` 前綴，以 AnotherModule/getters.ts 為例

```typescript
export enum GetterType {
  GET_SOME_DATA = 'GET_SOME_DATA'
}
```

在 components 中欲使用 AnotherModule/getters 時，會需要加上前綴

```typescript
import Vue from 'vue'
import RootStore from '~/store'

export default Vue.extend({
  mounted () {
    console.log((this.$store as RootStore).getters['AnotherModule/GET_SOME_DATA'])
  }
})
```

一般在 js 的做法是這樣，但因為我們在 Root Module 中定義了 RootStore 這個型別來限制 `this.$store`，上面的方法一定會被噴錯，所以必須改寫一下：

```typescript
import { GetterTree } from 'vuex/types/index'
import { Namespaced, RootState } from '~/store'
import { AnotherModuleState } from './state'

export enum GetterTypes {
  GET_SOME_DATA = 'GET_SOME_DATA'
}

export interface Getters<S = AnotherModuleState> {
  [GetterTypes.GET_SOME_DATA]: (state: S) => string
}

export enum AnotherModuleGetterTypes {
  GET_SOME_DATA = 'AnotherModule/GET_SOME_DATA'
}

export interface AnotherModuleGetters
  extends Namespaced<Getters, 'AnotherModule'> {}

const getters: GetterTree<AnotherModuleState, RootState> & Getters = {
  [GetterTypes.GET_SOME_DATA]: state => 'GOT SOME DATA'
}

export default getters
```

基本上上面範例與 Root Module 的 getters 一樣，只多了

- enum AnotherModuleGetterTypes: 其實就是原本的 GetterTypes (getters 的 method name) 加上 folder 前綴 (AnotherModule/)
- interface AnotherModuleGetters: 也是加上 folder 前綴而已

在同一 folder 中使用的話，要用 `GetterTypes` 和 `Getters`，因為在同一個 Module 底下，並不會有所謂的 Module 前綴，但如果跨 folder 了，或是在 components 中的 `this.$store` 的話就必須要用 `AnotherModuleGetterTypes` 和 `AnotherModuleGetters`

最後記得在 `~/store/index.ts` 的 RootGetters extends

```typescript
import { Getters } from './getters'
import { AnotherModuleGetters } from './AnotherModule/getters'

export RootGetters extends Getters, AnotherModuleGetters {}
```

## Mutations

和 上面提到的 Getters 一樣，增加 `AnotherModuleMutationTypes` 和 `AnotherModuleMutations`

```typescript
import { MutationTree } from 'vuex/types/index'
import { Namespaced } from '..'
import { AnotherModuleState } from './state'

export enum MutationTypes {
  SET_SOME_DATA = 'SET_SOME_DATA'
}

export interface Mutations<S = AnotherModuleState> {
  [MutationTypes.SET_SOME_DATA]: (state: S, payload: { data: string }) => void
}

export enum AnotherModuleMutationTypes {
  SET_SOME_DATA = 'AnotherModule/SET_SOME_DATA'
}

export interface AnotherModuleMutations
  extends Namespaced<Mutations, 'AnotherModule'> {}

const mutations: MutationTree<AnotherModuleState> & Mutations = {
  [MutationTypes.SET_SOME_DATA]: (state, { data }) => {
    state.test = data
  }
}

export default mutations
```

extends RootMutations

```typescript
import { Mutations } from './mutations'
import { AnotherModuleMutations } from './AnotherModule/mutations'

export interface RootMutations extends Mutations, AnotherModuleMutations {}
```

## Actions

一樣的概念

```typescript
import { ActionContext, ActionTree, CommitOptions } from 'vuex/types/index'
import { Namespaced, RootState } from '~/store'
import { $axios } from '~/utilities/$axios'
import { Mutations } from './mutations'
import { AnotherModuleState } from './state'

interface AugumentedActionContext
  extends Omit<ActionContext<AnotherModuleState, RootState>, 'commit'> {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
}

export enum ActionTypes {
  FETCH_SOME_DATA = 'FETCH_SOME_DATA'
}

export interface Actions {
  [ActionTypes.FETCH_SOME_DATA]: (
    context: AugumentedActionContext,
    payload: { info: string }
  ) => Promise<string>
}

export enum AnotherModuleActionTypes {
  FETCH_SOME_DATA = 'AnotherModule/FETCH_SOME_DATA'
}

export interface AnotherModuleActions
  extends Namespaced<Actions, 'AnotherModule'> {}

const actions: ActionTree<AnotherModuleState, RootState> & Actions = {
  [ActionTypes.FETCH_SOME_DATA]: (context, payload) => {
    return $axios({
      baseURL: 'http://api',
      url: '/fetch_some_data',
      method: 'POST',
      data: payload
    })
      .then(response => 'got response')
      .catch(error => 'got error')
  }
}

export default actions
```

extends RootActions

```typescript
import { Actions } from './actions'
import { AnotherModuleActions } from './AnotherModule/actions'

export interface RootActions extends Actions, AnotherModuleActions {}
```

## Access `AnotherModule` in components

```typescript
import Vue from 'vue'
import { RootStore } from '~/store'
import { AnotherModuleActionTypes } from '~/store/AnotherModule/actions'
import { AnotherModuleGetterTypes } from '~/store/AnotherModule/getters'
import { GetterTypes } from '~/store/getters'
import { MutationTypes } from '~/store/mutations'

export default Vue.extend({
  async mounted() {
    console.log(
      (this.$store as RootStore).getters[AnotherModuleGetterTypes.GET_SOME_DATA]
    )
    ;(this.$store as RootStore).commit(MutationTypes.SET_AGE, { age: 23 })
    ;(this.$store as RootStore).commit(MutationTypes.SET_NAME, {
      name: 'khsolah'
    })
    const response = await (this.$store as RootStore).dispatch(
      AnotherModuleActionTypes.FETCH_SOME_DATA,
      { info: 'some info' }
    )
    console.log('dispatch AnotherModule: ', response)
    console.log((this.$store as RootStore).getters[GetterTypes.AGE])
    console.log((this.$store as RootStore).getters[GetterTypes.NAME])
  }
})
```
