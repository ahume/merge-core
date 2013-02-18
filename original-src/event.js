// --------------------------------- event.js -------------------------------------------

ensurePackage('guardian.r2');

guardian.r2.event = {

	stop : function (event) {
		event = event || window.event; //IE.
		if (event.preventDefault) {
			event.preventDefault();
		} else { //IE
			event.returnValue = false;
		}
		if (event.stopPropagation) {
			event.stopPropagation();
		} else { //IE. Again.
			event.cancelBubble = true;
		}
	},
	
	getElement : function (event) {
		if ( !event.target ) {
			event.target = event.srcElement || document;
		}
		// check if target is a textnode (safari)
		if ( event.target.nodeType == 3 ) {
			event.target = event.target.parentNode;
		}
		return event.target;
	}
	
}
