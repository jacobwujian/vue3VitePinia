import {
	createStore
} from 'vuex'
import getters from './getters'

const context = import.meta.globEager('./modules/*.js')
//获取moudules文件下所有js文件；
const moduleStores = {}
for (const moduleStore in context) {
  const fileName = moduleStore.slice(10, -3)
  moduleStores[fileName] = context[moduleStore].default
}
export const store = createStore({
		modules: moduleStores,
		getters
	})
export default function(app) {
	app.use(store)
	app.config.globalProperties.$store = store
}
