class Scoreboard {
	constructor() {
		console.log("constructing the scoreboard");

		if (!localStorage.getItem("currentGame")) {
			this.current = {};
			this.current.jam = 0;
			localStorage.setItem("currentGame", this.current);
		} else {
			this.current = localStorage.getItem("currentGame");
		}

		console.log(this);
	}

	get_trip_points(team) {
	}

	set_trip_points(team, pts) {
	}

	start_jam() {
		console.log(this);
		this.current.jam++;
		console.log("Starting jam " + this.current.jam);
		let jams = document.querySelector(".jam");
		for (j in jams) {
			j.innerContent = this.current.jam;
		}
	}
}

let scoreboard = new Scoreboard();

export { Scoreboard };

export function start_jam() {
	debugger;
	scoreboard.start_jam();
}
