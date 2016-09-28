function toggle(store) {
	store.dispatch('TOGGLE')
}

function setUser({dispatch}, userName) {
	dispatch('SETUSER', userName)
}

function pop({dispatch}, param) {
	dispatch('POP', param)
}

function bgToggle({dispatch}, bg) {
	dispatch('BGTOGGLE', bg)
}

export {
	toggle, setUser, pop, bgToggle
}