export function get_attr(el, attr) {
	while (el && el.hasAttribute && !el.hasAttribute(attr)) {
		el = el.parentElement;
	}
	return el.getAttribute(attr);
}


export function bind_functions(obj, className) {
	let methods = Object.getOwnPropertyNames(className.prototype);
	for (let i = 0; i < methods.length; i++) {
		if (methods[i] == "constructor") {
			continue;
		}

		obj[methods[i]] = obj[methods[i]].bind(obj);
		let inputs = document.querySelectorAll("[fn=" + methods[i] + "]");
		for (let j = 0; j < inputs.length; j++) {
			inputs[j].addEventListener('click', obj[methods[i]]);
		}
	}
}
