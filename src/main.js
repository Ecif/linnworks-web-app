import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// -- Automatic Global Registration of BaseComponents
const requireComponent = require.context(
  // webpack feature
  './components', // the relative path of the directory to search
  false, // subdirectories will not be searched
  /Base[A-Z]\w+\.(vue|js)$/ // regular expression that searches for components starting with "Base" and ending in .vue or .js
)
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1')) // removes what's before and after the filename itself
  )

  Vue.component(componentName, componentConfig.default || componentConfig)
})
// --

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
