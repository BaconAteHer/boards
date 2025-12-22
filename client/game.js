class Game {
	constructor() {
	}

	set(id, data) {
		localStorage.setItem(id, JSON.stringify(data));
	}

	get(id) {
		return JSON.parse(localStorage.getItem(id));
	}
}

export { Game };
