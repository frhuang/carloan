import Vue 					from 'vue'
import VueResource	from 'vue-resource'
import VueValidator	from 'vue-validator'
import VueRouter		from 'vue-router'
import Vuex					from 'vuex'

import routes from './routes'
// import MyCanvas     from './views/components/MyCanvas.vue'
import AppVue from './App.vue';

const App = Vue.extend(AppVue);

Vue.use(VueResource)
Vue.use(VueValidator)
Vue.use(VueRouter)
Vue.use(Vuex)

let router = new VueRouter()

// let App = Vue.extend({
// 	data(){
// 		return {}
// 	},
// 	components: {
// 		MyCanvas
// 	},
// 	http: {
// 		root: '/'
// 	}
// })

routes(router)

router.start(App, '#app')



