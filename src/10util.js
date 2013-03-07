define(['dom'], function(dom) {

	// Add a JS classname hook that can be used to style elements before the page starts rendering
	// This happens before domReady()
	(function() {
	    var docElement = document.documentElement;
	    if (typeof(docElement.className) === 'string') {
	        docElement.className += ' js-on';
	    } else {
	        docElement.className = 'js-on';
	    }
	})();


	// Set some flags to detect browser.
	var browser = {
		isWebKit: navigator.userAgent.indexOf('AppleWebKit/') > -1
	}
	var is_ie = jQ.browser.msie;
	if (is_ie) {
	    var ie_version = parseInt(jQ.browser.version);
	    browser['isIE' + ie_version] = true;
	}


	// EVENT LISTENER PART 1 FUNCTION adds an eventListener to a single element for browsers which support it
	// parameters:
	//				obj = the element you are adding the event to
	//				eventType = standard DOM events
	//				fn = function to run when the event occurs
	// returns: boolean
	function addEvent(obj, eventType, fn){

		if (typeof obj === "string") {
			obj = document.getElementById(obj);
		}

	    /* Written by Scott Andrew: nice one, Scott */
	    if (eventType === "load") {
	        //hack me
	        loadEventList.addLoadEvent(fn);
	        return true;
	    }
		if (!obj) {
			return null;
		}

	    if (obj.addEventListener) {
	        obj.addEventListener(eventType, fn, false);
	        return true;
	    }
	    else
	        if (obj.attachEvent) {
	            var r = obj.attachEvent("on" + eventType, fn);
	            return r;
	        }
	        else {
	            return false;
	        }
	}

	// EVENT LISTENER PART 2 ARRAY of functions to run when document has loaded
	// adds a function to the end of the array for loading on document load
	// if page is already loaded when function is added, function runs immediately
	// called by: addEvent
	var loadEventList = [];
	loadEventList.addLoadEvent = function(fn){
		if(loadEventList.hasFired) {
			fn();
		} else {
			loadEventList[loadEventList.length] = fn;
		}
	};

	// EVENT LISTENER PART 3 METHOD runs all events in array on document load
	// sets a boolean so new functions know to run immediately
	loadEventList.hasFired = false;
	loadEventList.fireLoadEvents = function() {
	    for (var i = 0; i < loadEventList.length; i++) {
	        loadEventList[i]();
	    }
	    loadEventList.hasFired = true;
	};

	// EVENT LISTENER PART 4 CONDITIONAL COMMENT does onload for each browser, first safari, then firefox and finally the IEs
	// It runs the array loadEventList, populated from addEvent
	// From http://dean.edwards.name/weblog/2006/06/again/

	if (browser.isWebKit) { // Safari
	    var _timer = setInterval(function(){
	        if (/loaded|complete/.test(document.readyState)) {
	            clearInterval(_timer);
	            loadEventList.fireLoadEvents(); // call the onload handler
	        }
	    }, 100);
	} else if (document.addEventListener) {
	    document.addEventListener("DOMContentLoaded", loadEventList.fireLoadEvents, false);
	} else {
	    if(is_ie) {
	        document.write("<script id='__ie_onload' defer='defer' src='//:'><\/script>");
	        var script = document.getElementById("__ie_onload");
	        script.onreadystatechange = function() {
	            if (this.readyState == "complete") {
	                loadEventList.fireLoadEvents(); // call the onload handler
	            }
	        };
	    }
	}

	// EVENT LISTENER PART 5 FUNCTION does the same as addEvent, but does some browser sniffing first and
	// ensures the page is loaded before invoking the functuions if we're in a microsoft browser
	// parameters:
	//				fn = your function. this will ALWAYS run on document load
	// returns: boolean
	var safeLoadEventList = []; // this array gets populated with functions to run if the browser is microsoft
	function addSafeLoadEvent(fn) {
		if (!(browser.isIE6 || browser.isIE7)) {
			addEvent(document, 'load', fn);
			return true;
		} else {
			// This is IE6 or 7 and therefore can't have document.body.appendChilds or innerHTMLs until the whole page has loaded.
			// See http://support.microsoft.com/kb/927917 for more information
			safeLoadEventList.push(fn);
			return true;
		}
	}

	// like loadEventList
	safeLoadEventList.hasFired = false;
	safeLoadEventList.fireLoadEvents = function() {
	    for (var i = 0; i < safeLoadEventList.length; i++) {
	        safeLoadEventList[i]();
	    }
	    safeLoadEventList.hasFired = true;
	};

	// EVENT LISTENER PART 6 COND COMMENT loading the array from safeLoadEventList and doing the special IE load
	if ((browser.isIE6 || browser.isIE7)) {
		window.attachEvent("onload", safeLoadEventList.fireLoadEvents);
	}

	// FUNCTION dynamically adding scripts, to the head or directly inline
	function writeScript(src, asynchronous, callback){
		if(asynchronous){
			jQ.ajaxSetup({ cache: true });
			jQ.getScript(src, callback);
		} else {
			document.write('<script type="text/javascript" src="' + src + '"></scr' + 'ipt>');
			document.close();
		};
	};

	// FUNCTION CLASS PART 1 adds a click event to several elements, filtered by a CSS selector, used in signInListeners and ServerSidePluck comments popup and comment view
	// parameters:
	//				inElement = parent element to filter from
	//				cssRule = CSS selector e.g 'li.pixie a.class-name'. Only supports class & tag Names
	//				clickListenerCallback = your function
	function addClickListenersToMatchingElements(inElement, cssRule, clickListenerCallback) {

		var elementsToAddListenersTo = dom.element.getElementsByCssSelector(cssRule, inElement);

		for (var i = 0; i < elementsToAddListenersTo.length; i++) {
			addEvent(elementsToAddListenersTo[i], 'click', clickListenerCallback);
		}

	};

	// FUNCTION CLASS PART 2 utility to set up a search for a string
	function classNameRegex(cl) {
		return new RegExp("( |^)" + cl + "( |$)")
	}

	// FUNCTION CLASS PART 3 utility to search for and replace a class
	function removeClassName(el, className) {
		 el.className = el.className.replace(classNameRegex(className), " ").replace(/(^\s*|\s*$)/g, '');
	}

	// POPUP PART 2 FUNCTION to center the popup
	// returns the pixels between the left margin of the poup and the browser screen
	function calculateXForCentredPopup(popupWidth) {
	    var leftPos = 0;
	    if (screen.availWidth > popupWidth) {
	        leftPos = Math.round((screen.availWidth - popupWidth) / 2);
	    }

	    return leftPos;
	}

	// POPUP PART 3 FUNCTION opens fixed width and height popup, used in sport popups
	function openScorePopup(url){

	    if(guardian.r2.browser.isIE6 || guardian.r2.browser.isIE7) {
	        var height= 405;
	        var width = 767;
	    } else {
	        var height= 400;
	        var width = 747;
	    }

	    var leftPos = 0;
	    window.open(url, '_blank', 'resizable=yes,scrollbars=yes,location=no,toolbar=no,status=no,top=0,screenY=0,left=' + leftPos + ',screenX=' + leftPos + ',height=' + height + ',width=' + width);
	    return false;
	}

	// POPUP PART 4 FUNCTION to open a new popup set preferred width/height
	function popUpNewWindow(url,width,height) {
		newwindow=window.open(url,'sponsor','height=' + height + ',width=' + width + ',scrollbars=yes,location=yes,toolbar=yes,status=yes,resizable=yes');
		if (window.focus) {newwindow.focus()}
		return false;
	}

	// POPUP PART 5 FUNCTION to open the links in popups back in the main window, this is a cool function
	function GUopenParent(target) {
		if (window.opener) {
			window.opener.location=target;
		} else {
			location=target;
		}
	}

	// COOKIE PART 1 FUNCTION utility to read a cookie
	// parameters: name = name of the cookie
	// returns: the value of the cookie or null
	function readCookie(name) {
	    var nameEQ = name + "=";
	    var cookieArray = document.cookie.split(';');

	    for (var i = 0; i < cookieArray.length; i++) {
	        var cookie = cookieArray[i];

	        while (cookie.charAt(0) == ' ') {
				cookie = cookie.substring(1, cookie.length);
			}

	        if (cookie.indexOf(nameEQ) === 0) {
				return cookie.substring(nameEQ.length, cookie.length);
			}
	    }

	    return null;
	}

	// COOKIE PART 2 FUNCTION utility to create a cookie
	// parameters: name = the cookie name, value = the cookie value, days = days to keep the cookie
	function createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}

	// COOKIE PART 2a FUNCTION utility to create a cookie for the current path
	// parameters: name = the cookie name, value = the cookie value, days = days to keep the cookie
	function createCookieForCurrentPath(name,value,days) {
	    if (days) {
	        var date = new Date();
	        date.setTime(date.getTime()+(days*24*60*60*1000));
	        var expires = "; expires="+date.toGMTString();
	    }
	    else var expires = "";
	    document.cookie = name+"="+value+expires;
	}

	// COOKIE PART 3 FUNCTION checks if the cookie is set for logged user
	//return: boolean
	function isUserLoggedIntoRegPss() {
		return readCookie("GU_ME") != null;
	}

	// POSITIONING PART 1 FUNCTION to get the viewport xy coordinates, used in signInListeners
	// returns: object with the xy coordinates
	function getScrollPosition(){
	    var scrollX, scrollY;
	    if (self.pageYOffset) {
	        scrollX = self.pageXOffset;
	        scrollY = self.pageYOffset;
	    }
	    else
	        if (document.documentElement && document.documentElement.scrollTop) {
	            scrollX = document.documentElement.scrollLeft;
	            scrollY = document.documentElement.scrollTop;
	        }
	        else
	            if (document.body) {
	                scrollX = document.body.scrollLeft;
	                scrollY = document.body.scrollTop;
	            }
	    return {
	        x: scrollX,
	        y: scrollY
	    };
	}

	// POSITIONING PART 2 FUNCTION to get the center xy coordinates
	// returns: object with the xy coordinates
	function getCenterPosition(){
	    var centerX, centerY;
	    if (self.innerHeight) {
	        centerX = self.innerWidth;
	        centerY = self.innerHeight;
	    }
	    else
	        if (document.documentElement && document.documentElement.clientHeight) {
	            centerX = document.documentElement.clientWidth;
	            centerY = document.documentElement.clientHeight;
	        }
	        else
	            if (document.body) {
	                centerX = document.body.clientWidth;
	                centerY = document.body.clientHeight;
	            }
	    return {
	        x: centerX,
	        y: centerY
	    };
	}

	// POSITIONING PART 3 FUNCTION to get the center and viewport xy coordinates
	// returns: new objects with all the xy coordinates
	function getScrollAndCenterPosition(){
	    var scroll = getScrollPosition();
	    var center = getCenterPosition();
	    return {
	        scrollX: scroll.x,
	        scrollY: scroll.y,
	        centerX: center.x,
	        centerY: center.y
	    };
	}

	// FUNCTION FIND PARENT utility to go up the DOM until it finds a tag of the type specified
	// returns: the ancestor as a DOM element
	function getAncestorOfType(object, tagType) {
		if(!object.tagName) {
			return null;
		} else {
			return (object.tagName.toLowerCase() === tagType) ? object : getAncestorOfType(object.parentNode, tagType);
		}
	}

	// ARRAY PART 1 FUNCTION utility to look for the position of a value in an array
	// returns: the position of the value or false
	function arrayIndexOf(array, value) {
		for (var i = 0; i < array.length; i++) {
			if (array[i] === value) {
				return i;
			}
		}
		return -1;
	}

	// ARRAY PART 2 FUNCTION utility to determine if something is an array
	// returns: boolean
	function isArray(value){

		return value &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			typeof value.splice === 'function' &&
			!(value.propertyIsEnumerable('length'));

	}

	// ARRAY PART 3 FUNCTION utility to determine if an array contains a value
	function arrayContains(theArray, theValue) {
		for (var i = 0; i < theArray.length; i++) {
			if (theArray[i] === theValue) {
				return true;
			}
		}
		return false;
	}

	// ARRAY PART 4 FUNCTION utility to perform a function for each element in an array
	// and pass to that function the array element as an argument and the iterator
	function forEachElementOf(list, doThis){
	    var listLength = list.length;
	    for (var i = 0; i < listLength; i++) {
	        doThis(list[i], i);
	    }
	}

	function toggleHideOnPopupElements(visibility) {
		var elementsToBeHidden = jQ('.hide-on-popup');
		elementsToBeHidden.css({'visibility' : visibility});
	}

	return {
		browser: browser,
		addEvent: addEvent,
		addSafeLoadEvent: addSafeLoadEvent,
		writeScript: writeScript,
		addClickListenersToMatchingElements: addClickListenersToMatchingElements,
		removeClassName: removeClassName,
		calculateXForCentredPopup: calculateXForCentredPopup,
		openScorePopup: openScorePopup,
		popUpNewWindow: popUpNewWindow,
		GUopenParent: GUopenParent,
		readCookie: readCookie,
		createCookie: createCookie,
		createCookieForCurrentPath: createCookieForCurrentPath,
		isUserLoggedIntoRegPss: isUserLoggedIntoRegPss,
		getScrollPosition: getScrollPosition,
		getCenterPosition: getCenterPosition,
		getScrollAndCenterPosition: getScrollAndCenterPosition,
		getAncestorOfType: getAncestorOfType,
		arrayIndexOf: arrayIndexOf,
		isArray: isArray,
		arrayContains: arrayContains,
		forEachElementOf: forEachElementOf,
		toggleHideOnPopupElements: toggleHideOnPopupElements
	}

});