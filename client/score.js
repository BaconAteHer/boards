import { Toggle } from "./toggle.js"
import { Skater } from "./skater.js"

import { bind_functions } from "./boards.js"

class Score {
	constructor() {
		this.current_jam = 0;

		this.next_jam(null);
		bind_functions(this, Score);

	}

	next_line(sp) {
		const tbody = document.querySelector("tbody");
		const template = document.querySelector("template");
		const clone = document.importNode(template.content, true);
		let td = clone.querySelectorAll("input");
		for (let i = 0; i < td.length; i++) {
			td[i].onchange = this.update_jam;
		}
		tbody.appendChild(clone);
		this.current = tbody.lastChild;
		
		if (sp) {
			this.current.querySelector(".jam").querySelector("output").value = "SP";
		} else {
			this.current.querySelector(".jam").querySelector("output").value = ++this.current_jam;
		}
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
		console.log(el);
		while (el && el.tagName != "TR") {
			el = el.parentNode;
			console.log("new el", el);
		}
		let trips = el.querySelectorAll(".trip input");
		var sum = 0;
		for (let i = 0; i < trips.length; i++) {
			let v = trips[i].value ? parseInt(trips[i].value) : 0;
			sum += v;
			console.log(sum);
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
	}
}

export { Score };

let score = new Score();
