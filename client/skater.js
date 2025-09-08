class Skater {
	constructor(name, roster) {
		this.select = document.createElement("select");
		this.select.className = name;
		for (var skater of roster) {
			let opt = document.createElement("option");
			opt.value = skater.number;
			opt.innerHTML = skater.number + " - " + skater.name;
			this.select.appendChild(opt);
		}
		this.select.object = this;

		this.select.onchange = function() {
			this.object.span.innerHTML = this.value;
			this.replaceWith(this.object.span);
		}

		this.span = document.createElement("span");
		this.span.className = name;
		this.span.innerHTML = roster[0].number;
		this.span.object = this;

		this.span.onclick = function() {
			this.replaceWith(this.object.select);
		}

		this.element = this.span;
	}
}

export { Skater };
