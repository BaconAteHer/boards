import { Score } from "./score.js"
import { Team } from "./team.js"

class Game {
	constructor(home, visitor) {
		this.home = home;
		this.visitor = visitor;
		this.venue = null;
		this.city = null;
		this.state = null;
		this.gameNumber = null;
		this.event = null;
		this.host = null;
		this.date = null;
		this.time = null;

		this.homeScore = [];
		this.homeScore.push(new Score(document.querySelector("#sk"), this.homeScore, 1));
	}

	roster(label, team) {
		function teamInfo(label, field) {
			let row = document.createElement("tr");

			let key = document.createElement("td");
			key.innerHTML = label;
			row.appendChild(key);

			let value = document.createElement("td");
			value.id = team.id;
			value.innerHTML = team[field];
			row.appendChild(value);

			return row;
		}

		function skaterRow(rowNumber, skaterNumber, skaterName) {
			let row = document.createElement("tr");

			let numPlayers = document.createElement("td");
			numPlayers.innerHTML = rowNumber;
			row.appendChild(numPlayers);

			let number = document.createElement("td");
			number.innerHTML = skaterNumber;
			row.appendChild(number);

			let name = document.createElement("td");
			name.innerHTML = skaterName;
			row.appendChild(name);

			return row;
		}

		let table = document.createElement("table");
		table.id = "IGRF." + label;
		
		let headRow = document.createElement("tr");
		let head = document.createElement("th");
		head.innerHTML = label + " TEAM";
		headRow.appendChild(head);
		table.appendChild(headRow);

		table.appendChild(teamInfo("LEAGUE", team.league));
		table.appendChild(teamInfo("TEAM", team.team));
		table.appendChild(teamInfo("COLOR", team.color));

		table.appendChild(skaterRow("# of players", "Skater #", "Skater Name"));
		for (var i = 0; i < 20; i++) {
			if (team.skaters && i < team.skaters.length) {
				table.appendChild(skaterRow(i + 1, team.skaters[i].number, team.skaters[i].name));
			} else {
				table.appendChild(skaterRow(i + 1, "", ""));
			}
		}

		return table;
	}

	displayIGRF(div) {
		let table = document.createElement("table");
		table.id = "IGRF";
		div.appendChild(table);
		div.appendChild(this.roster("HOME", this.home ? this.home : new Team("", "")));
		div.appendChild(this.roster("VISITING", this.visitor ? this.visitor : new Team("", "")));
	}
}

export { Game };
