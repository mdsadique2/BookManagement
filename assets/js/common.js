class Common {
	constructor () {

	}

	createElement  (elmType, classList, innerText) {
		var elm = document.createElement(elmType);
		elm.setAttribute('class', classList);
		if (innerText !== undefined) {
			elm.innerText =  innerText
		}
		return elm;
	}

}



