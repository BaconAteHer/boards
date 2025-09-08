class Team {
	constructor(league, team) {
		this.league = league;
		this.team = team;
		this.players = [];
	}

	addPlayer(p) {
		this.players.add(p)
	}
}

export { Team };
