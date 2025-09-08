class Toggle {
	constructor(name) {
		this.element = document.createElement("span");
		this.element.checked = false;
		this.element.name = name;
		this.element.innerHTML = "";
		this.element.className = "toggle " + name;
		this.element.object = this;
		this.element.onclick = function() { this.object.toggle(); }
		this.element.toggle = function() { this.object.toggle(); }
	}

	toggle() {
		if (this.element.checked) {
			this.element.checked = false;
			this.element.innerHTML = "";
		} else {
			this.element.checked = true;
			this.element.innerHTML = "X";
		}
	}
}

export { Toggle }
