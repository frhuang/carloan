import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Console from './views/Console.vue'

export default function(router) {
	router.map({
		'/': {
			component: Home
		},
		'/login': {
			component: Login
		},
		'/console': {
			component: Console
		}
	})
}