import { Game } from "./game.js"
import { bind_functions } from "./boards.js"

export class Score {
	constructor() {
		bind_functions(this, Score);

		this.game = new Game();
		let values = this.game.get("score"); // TODO: team
		if (!values) {
			values = [];
		}

		this.current_jam = 0;
		let io = document.querySelectorAll("tbody input, tbody output");
		while (!io || io.length < values.length) {
			this.next_jam(null);
			io = document.querySelectorAll("tbody input, tbody output");
		}

		for (let i = 0; i < io.length; i++) {
			if (io[i].getAttribute("type") == "checkbox") {
				io[i].checked = values[i];
			} else {
				io[i].value = values[i];
			}
		}

		this.update_period_totals();

		if (this.current_jam == 0) {
			this.next_jam(null);
		}
	}

	obj() {
		let io = document.querySelectorAll("tbody input, tbody output");
		let val = [];
		for (let i = 0; i < io.length; i++) {
			if (io[i].getAttribute("type") == "checkbox") {
				val.push(io[i].checked);
			} else {
				val.push(io[i].value);
			}
		}
		return val;
	}

	save() {
		this.game.set("score", this.obj());
	}

	next_line(sp) {
		const tbody = document.querySelector("tbody");
		const template = document.querySelector("template");
		const clone = document.importNode(template.content, true);
		let td = clone.querySelectorAll("input");
		for (let i = 0; i < td.length; i++) {
			//td[i].onchange = this.update_jam;
			td[i].addEventListener("change", this.update_jam);
		}
		tbody.appendChild(clone);
		this.current = tbody.lastChild;
		
		if (sp) {
			this.current.querySelector(".jam").querySelector("output").value = "SP";
		} else {
			this.current.querySelector(".jam").querySelector("output").value = ++this.current_jam;
		}
		this.current.setAttribute("jam", this.current_jam);
		this.current.querySelector(".jammer").querySelector("input").focus();
	}

	next_jam(e) {
		this.next_line(false);
	}

	star_pass(e) {
		this.next_line(true);
	}

	update_jam(e) {
		let el = e.target;
		while (el && el.tagName != "TR") {
			el = el.parentNode;
		}
		let trips = el.querySelectorAll(".trip input");
		var sum = 0;
		for (let i = 0; i < trips.length; i++) {
			let v = trips[i].value ? parseInt(trips[i].value) : 0;
			sum += v;
		}

		let jam_total = el.querySelector(".jam-total output");
		jam_total.value = sum;

		let jt = document.querySelectorAll(".jam-total output");
		let gt = document.querySelectorAll(".game-total output");
		let total = 0;
		for (let i = 0; i < jt.length; i++) {
			total += parseInt(jt[i].value);
			gt[i].value = total;
		}

		this.update_period_totals();
		this.save();

		/* TODO: trip totals */
		/* TODO: period point totals */
	}

	update_period_totals() {
		const tfoot = document.querySelector("tfoot");
		const checks = [ "lost", "lead", "call", "inj", "ni" ];
		for (var c in checks) {
			let count = tfoot.querySelector("." + checks[c] + " output");
			let inputs = document.querySelectorAll("." + checks[c] + " input");
			let checked = 0;
			for (let i = 0; i < inputs.length; i++) {
				if (inputs[i].checked) {
					checked++;
				}
			}
			if (checked == 0) {
				count.value = "";
			} else {
				count.value = checked;
			}
		}
	}
}

let score = new Score();
