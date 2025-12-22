import { bind_functions, get_attr } from "./boards.js";
import { Game } from "./game.js";

class Scoreboard {
	constructor() {
		this.game = new Game();
		this.jam = 0;
		this.period = 1;

		bind_functions(this, Scoreboard);
	}

	get_trip_points(team) {
	}

	set_trip_points(e) {
		console.log("Team", get_attr(e.target, "team"));
		console.log(e.target.getAttribute("value"));
		let f = document.querySelector('iframe[team="' + get_attr(e.target, "team") + '"]');
		let trips = f.querySelectorAll("input");
		console.log(trips);
		trips[trips.length - 1].value = e.target.getAttribute("value");
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
		const t = e.target;
		const val = t.getAttribute("value");
		if (t.hasAttribute("pressed")) {
			t.removeAttribute("pressed");
			if (val == "show-tabs") {
				document.querySelector("#tabs").style.display = "none";
			}
		} else {
			t.setAttribute("pressed", true);
			if (val == "show-tabs") {
				document.querySelector("#tabs").style.display = "block";
			}
		}
	}
}

let scoreboard = new Scoreboard();

export { Scoreboard };
