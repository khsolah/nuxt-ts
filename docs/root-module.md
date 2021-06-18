# Vuex (Root Module)

## State

Create a State interface and implement a state instance.
And state instance must to be a function return an object

```typescript
// ~/store/state.ts
export interface State {
  [K: string]: any
}

const state = (): State => ({
  age: 23,
  name: 'khsolah'
})

export default state
```

## Getters

Create a Getters interface, key of getters and implement a getters instance.

```typescript
// ~/store/getters.ts
import { GetterTree } from 'vuex/types/index'
import { State } from './state'

// getters 的 method name
export enum GetterTypes {
  AGE = 'AGE',
  NAME = 'NAME'
}

// getters interface
// 定義 getters 接收參數及的回傳值的型別
export interface Getters<S = State> {
  [GetterTypes.AGE]: (state: S) => State['age']
  [GetterTypes.NAME]: (state: S) => State['name']
}

// getters instance
const getters: GetterTree<State, State> & Getters = {
  [GetterTypes.AGE]: state => state.age,
  [GetterTypes.NAME]: state => state.name
}

export default getters
```

access this getters in components:

```typescript
import Vue from 'vue'
import { GetterTypes } from '~/store/getters'

export default Vue.extend({
  mounted() {
    console.log('age: ', this.$store.getters[GetterTypes.AGE])
    console.log('name: ', this.$store.getters[GetterTypes.NAME])
    // will print
    // age: 23
    // name: khsolah
  }
})
```

## Mutations

Create a Mutations interface, key of mutations and implement a mutations instance.

```typescript
// ~/store/mutations.ts
import { MutationTree } from 'vuex/types/index'
import { State } from './state'

export enum MutationTypes {
  SET_AGE = 'SET_AGE',
  SET_NAME = 'SET_NAME'
}

export interface Mutations<S = State> {
  [MutationTypes.SET_AGE]: (state: S, payload: { age: number }) => number
  [MutationTypes.SET_NAME]: (state: S, payload: { name: string }) => string
}

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_AGE]: (state, payload) => {
    state.age = payload.age
    return payload.age
  },
  [MutationTypes.SET_NAME]: (state, { name }) => {
    state.name = name
    return name
  }
}

export default mutations
```

access this mutations in components:

```typescript
import Vue from 'vue'
import { GetterTypes } from '~/store/getters'
import { MutationTypes } from '~/store/mutations'

export default Vue.extend({
  mounted() {
    this.$store.commit(MutationTypes.SET_AGE, { age: 40 })
    this.$store.commit(MutationTypes.SET_NAME, { name: 'White' })
    console.log('age: ', this.$store.getters[GetterTypes.AGE])
    console.log('name: ', this.$store.getters[GetterTypes.NAME])
    // will print
    // age: 40
    // name: White
  }
})
```

## Actions

Create a Actions interface, key of actions and implement an actions instance.
Additionally, define a type to augment actions context.

```typescript
// ~/store/actions.ts
import { ActionContext, CommitOptions, ActionTree } from 'vuex/types/index'
import { $axios } from '~/utilities/$axios'
import { MutationTypes, Mutations } from './mutations'
import { State } from './state'

interface AugumentedActionContext
  extends Omit<ActionContext<State, State>, 'commit'> {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
}

export enum ActionTypes {
  GET_USER = 'GET_USER'
}

export interface Actions {
  [ActionTypes.GET_USER]: (
    context: AugumentedActionContext,
    payload: { id: string; password: string }
  ) => Promise<void>
}

const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.GET_USER]: ({ commit }, { id, password }) => {
    return $axios({
      baseURL: 'http://localhost:4000',
      url: '/login',
      method: 'POST',
      data: { id, password }
    }).then(response => {
      commit(MutationTypes.SET_AGE, { age: response.data.age })
      commit(MutationTypes.SET_NAME, { name: response.data.name })
      return
    })
  }
}

export default actions
```

access this actions in components

```typescript
import Vue from 'vue'
import { GetterTypes } from '~/store/getters'
import { ActionTypes } from '~/store/actions'

export default Vue.extend({
  async mounted() {
    await this.$store.dispatch(ActionTypes.GET_USER, { id: 'empty id', password: 'password' })
    console.log('age: ', this.$store.getters[GetterTypes.AGE])
    console.log('name: ', this.$store.getters[GetterTypes.NAME])
  }
})
```

---

但問題在於 `this.$store` 的型別是 `Store<any>`，對於 getters, commit 及 dispatch 方法的參數型別完全不關心，像是

- getters 只能接收 getters 的 key，但 `$store.getters` 接受的是任意的 string
- commit/dispatch 第一個參數因該要是 mutatoins/actions 的 key，但 `this.$store.ccommit` / `this.$store.dispatch` 卻可以接收任意的 string
- `this.$store.ccommit` / `this.$store.dispatch` 第二個參數 payload 居然能接收 any 型別

所以必須要針對 `this.$store` 定義一個新的型別 - RootStore，避免 any

```typescript
// ~/store/index.ts
import { Store, CommitOptions, DispatchOptions } from 'vuex/types/index'
import { State } from './state'
import { Getters } from './getters'
import { Mutations } from './mutations'
import { Actions } from './actions'

export interface RootState extends State {}
export interface RootGetters extends Getters {}
export interface RootMutations extends Mutations {}
export interface RootActions extends Actions {}

export interface RootStore
  extends Omit<Store<RootState>, 'getters' | 'commit' | 'dispatch'> {
  getters: {
    [K in keyof RootGetters]: ReturnType<RootGetters[K]>
  }
  commit<
    K extends keyof RootMutations,
    P extends Parameters<RootMutations[K]>[1]
  >(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<RootMutations[K]>
  dispatch<
    K extends keyof RootActions,
    P extends Parameters<RootActions[K]>[1]
  >(
    key: K,
    payload: P,
    options?: DispatchOptions
  ): ReturnType<RootActions[K]>
}
```

而新增`RootState`, `RootGetters`, `RootMutations` 及 `RootActions` 的作用是，整合所有的 vuex module，並提供 RootStore 完整的資訊 (所有的 getters, mutations, actions 的 key 跟 回傳的型別)，建立一個比較嚴謹的 Vuex \$store

如果額外新增一個 vuex module 時，必須對`RootState`, `RootGetters`, `RootMutations` 及 `RootActions` extends，像這樣

```typescript
import { AnotherState } from './Another/state'
import { AnotherGetters } from './Another/getters'
import { AnotherMutations } from './Another/mutations'
import { AnotherActions } from './Another/actions'

export interface RootState extends State, AnotherState {}
export interface RootGetters extends Getters, AnotherGetters {}
export interface RootMutations extends Mutations, AnotherMutations {}
export interface RootActions extends Actions, AnotherActions {}
```

最後，在 components 使用 \$store 時，對 `this.$store` 積極型別註記就可以了

```typescript
import Vue from 'vue'
import { GetterTypes } from '~/store/getters'
import { ActionTypes } from '~/store/actions'
import { RootStore } from '~/store'
import { MutationTypes } from '~/store/mutations'

export default Vue.extend({
  async mounted() {
    ;(this.$store as RootStore).commit(MutationTypes.SET_NAME, {
      name: 'root store'
    })
    console.log((this.$store as RootStore).getters[GetterTypes.NAME])
    ;(this.$store as RootStore).dispatch(ActionTypes.GET_USER, {
      id: '',
      password: ''
    })
    console.log((this.$store as RootStore).getters[GetterTypes.NAME])
  }
})
```
