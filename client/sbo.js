class Scoreboard {
	constructor() {
		//if (!localStorage.getItem("currentGame")) {
			this.current = {};
			this.current.jam = 0;
			//localStorage.setItem("currentGame", this.current);
		//} else {
			//this.current = localStorage.getItem("currentGame");
		//}

		this.start_jam = this.start_jam.bind(this);
		document.querySelector('#start-jam').addEventListener('click', this.start_jam);

		this.set_trip_points = this.set_trip_points.bind(this);
		let trip_points = document.querySelectorAll(".trip-points");
		for (let i = 0; i < trip_points.length; i++) {
			trip_points[i].addEventListener('click', this.set_trip_points);
		}
	}

	get_trip_points(team) {
	}

	set_trip_points(e) {
		console.log(e.target.getAttribute("team"));
	}

	start_jam(e) {
		this.current.jam++;
		let jams = document.querySelectorAll(".jam");
		for (let i = 0; i < jams.length; i++) {
			jams[i].innerText = this.current.jam;
		}
	}
}

let scoreboard = new Scoreboard();

export { Scoreboard };
