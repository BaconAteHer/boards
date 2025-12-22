import { bind_functions } from './bind.js';

class Scoreboard {
	constructor() {
		this.jam = 0;
		this.period = 1;

		bind_functions(this, Scoreboard);
	}

	get_trip_points(team) {
	}

	set_trip_points(e) {
		console.log(e.target.getAttribute("team"));
		console.log(e.target.getAttribute("val"));
	}

	start_jam(e) {
		this.jam++;
		let jams = document.querySelectorAll(".jam");
		for (let i = 0; i < jams.length; i++) {
			jams[i].innerText = this.jam;
		}
	}
}

let scoreboard = new Scoreboard();

export { Scoreboard };
