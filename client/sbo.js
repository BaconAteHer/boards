import { bind_functions, get_attr } from './boards.js';

class Scoreboard {
	constructor() {
		this.jam = 0;
		this.period = 1;

		bind_functions(this, Scoreboard);
	}

	get_trip_points(team) {
	}

	set_trip_points(e) {
		console.log("Team", get_attr(e.target, "team"));
		console.log(e.target.getAttribute("value"));
	}

	start_jam(e) {
		this.jam++;
		let jams = document.querySelectorAll(".jam");
		for (let i = 0; i < jams.length; i++) {
			jams[i].innerText = this.jam;
		}
	}

	end(e) {
	}

	timeout(e) {
	}

	undo(e) {
	}

	toggle(e) {
		console.log(e.target);
		if (e.target.hasAttribute("pressed")) {
			e.target.removeAttribute("pressed");
		} else {
			e.target.setAttribute("pressed", true);
		}
	}
}

let scoreboard = new Scoreboard();

export { Scoreboard };
