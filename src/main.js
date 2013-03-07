define([
	'ajax',
	'dateUtil',
	'DialogBox',
	'10util',
	'tabs',
	'autoplay-settings',
	'caption',
	'componentTracking',
	'getUrl',
	'more',
	'search'
], function(
	AjaxRequest,
	DateUtil,
	DialogBox,
	Util,
	Tabs,
	AutoplaySettings,
	Caption,
	ComponentTracking,
	GetUrl,
	More,
	searchWeb
) {

	console.log('now running main');

	// Some things need to be initialised once there's a DOM. 
    jQ(document).ready(function() {
	    Tabs.initialise();
	    AutoplaySettings.initialise();
	    Caption.initialise();
	    ComponentTracking.initialise();
	    GetUrl.initialise();
	    More.initialise();
	});


	// Explicitly expose things that need to be exposed globally.
    window.guardian = {
    	'r2': {
	        'ajax': {
	            'Request': AjaxRequest
	        },
	        'DateUtil': DateUtil,
	        'DialogBox': DialogBox,
	        'browser': Util.browser
	    }
    }

    // 10Util functions for global exposure. Oh good god.
	window.addEvent = Util.addEvent;
	window.addSafeLoadEvent = Util.addSafeLoadEvent;
	window.writeScript = Util.writeScript;
	window.addClickListenersToMatchingElements = Util.addClickListenersToMatchingElements;
	window.removeClassName = Util.removeClassName;
	window.calculateXForCentredPopup = Util.calculateXForCentredPopup;
	window.openScorePopup = Util.openScorePopup;
	window.popUpNewWindow = Util.popUpNewWindow;
	window.GUopenParent = Util.GUopenParent;
	window.readCookie = Util.readCookie;
	window.createCookie = Util.createCookie;
	window.createCookieForCurrentPath = Util.createCookieForCurrentPath;
	window.isUserLoggedIntoRegPss = Util.isUserLoggedIntoRegPss;
	window.getScrollPosition = Util.getScrollPosition;
	window.getCenterPosition = Util.getCenterPosition;
	window.getScrollAndCenterPosition = Util.getScrollAndCenterPosition;
	window.getAncestorOfType = Util.getAncestorOfType;
	window.arrayIndexOf = Util.arrayIndexOf;
	window.isArray = Util.isArray;
	window.arrayContains = Util.arrayContains;
	window.forEachElementOf = Util.forEachElementOf;
	window.toggleHideOnPopupElements = Util.toggleHideOnPopupElement;

	// Search function needs to be on window
	window.searchWeb = searchWeb;


});