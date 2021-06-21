import WeakTypedVue, { VueConstructor } from 'vue'
import { Store } from '~/store'

abstract class StrongTypedVue extends WeakTypedVue {
  public $store!: Store
}

const Vue = WeakTypedVue as VueConstructor<StrongTypedVue>

export default Vue
