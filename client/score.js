import { Toggle } from "./toggle.js"
import { Skater } from "./skater.js"

class Score {
	constructor() {
		const tbody = document.querySelector("tbody");
		const template = document.querySelector("template");
		const clone = document.importNode(template.content, true);
		//let td = clone.querySelectorAll("td");
		tbody.appendChild(clone);
	}
	
	old_constructor(div, parent, jamNumber) {
		this.parent = parent;

		this.div = document.createElement("div");
		this.div.object = this;

		this.jaminfo = document.createElement("div");
		this.jaminfo.className = "jaminfo";

		this.jam = document.createElement("span");
		this.jam.className = "jam"
		this.jam.innerHTML = jamNumber;
		this.jaminfo.appendChild(this.jam);

		/* temp fake data */
		let roster = [
			{number: "5309", name: "Jenny"},
			{number: "867", name: "Tutone"},
			{number: "9000", name: "Goku" },
		];

		this.jammer = new Skater("jammer", roster);
		this.jaminfo.appendChild(this.jammer.element);

		for (var toggle of ["lost", "lead", "call", "inj", "ni"]) {
			this[toggle] = new Toggle(toggle);
			this.jaminfo.appendChild(this[toggle].element);
		}
		this.div.appendChild(this.jaminfo);

		this.trips = document.createElement("div");
		this.trips.className = "trips";
		for (var i = 2; i <= 10; i++) {
			let trip = document.createElement("span");
			trip.className = "trip";
			trip.type = "number";
			trip.min = 0;
			trip.max = 4;
			trip.onkeypress = this.updateTrip;
			trip.onblur = this.changeTrip;
			trip.contentEditable = "true"; //"plaintext-only";
			trip.innerHTML = "";
			trip.object = this;
			this.trips.appendChild(trip);
		}
		this.div.appendChild(this.trips);

		this.totals = document.createElement("div");
		this.totals.className = "totals";
		for (var field of ["jam-total", "game-total"]) {
			this[field] = document.createElement("span");
			this[field].className = field;
			this[field].innerHTML = "";
			this.totals.appendChild(this[field]);
		}
		this.div.appendChild(this.totals);

		div.appendChild(this.div);
		div.className = "current";

		window.onkeypress = function(ev) {
			let div = document.getElementsByClassName("current")[0];
			console.log(div);
			if (div.object.hotkey(ev.key)) {
				return false;
			}
		}
	}

	hotkey(key) {
		switch (key) {
		case '.':
			this.nextSibling.innerHTML = ".";
			this.nextSibling.focus();
			return true;

		case 't':
			this.object.lost.toggle();
			return true;

		case 'l':
			this.object.lead.toggle();
			return true;

		case 'c':
			this.object.call.toggle();
			return true;

		case 'i':
			this.object.inj.toggle();
			return true;

		case 'n':
			this.object.ni.toggle();
			return true;

		case 's':
			// star pass
			return true;
		}

		return false;
	}

	updateTrip(ev) {
		// if (is "enter") {
		//	new jam
		// }

		if (this.object.hotkey()) {
			return false;
		}

		switch (ev.key) {
			case '.':
				// move to the next cell with a dot in it

		}
		if ("0123456789".indexOf(ev.key) == -1) {
			return false;
		}
	}

	changeTrip() {
		let trips = this.parentNode.getElementsByClassName("trip");
		let jamTotal = 0;
		for (var i = 0; i < trips.length; i++) {
			let points = parseInt(trips[i].innerHTML);
			if (!isNaN(points)) {
				jamTotal += points;
			}
		}
		this.object["jam-total"].innerHTML = jamTotal;

		/* TODO: game total thus far */

		if (parseInt(this.innerHTML) > 4) {
			this.className = "trip invalid";
		} else {
			this.className = "trip";
		}
	}

	nextJam() {
		console.log("next jam");
		this.div.className = "score previous";
		this.object.parent.push(new Score(document.getElementById("sk"), this.object.parent));
	}

	addPlayer(p) {
		this.players.add(p)
	}
}

export { Score };

let score = new Score('', '', '');
