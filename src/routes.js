import Home from './views/Home.vue'

export default function(router) {
	router.map({
		'/': {
			component: Home
		}
	})
}