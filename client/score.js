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
			console.log(checks[c], checked);
			if (checked == 0) {
				count.value = "";
			} else {
				count.value = checked;
			}
		}

		/* TODO: trip totals */
		/* TODO: period point totals */
	}
}

export { Score };

let score = new Score();
