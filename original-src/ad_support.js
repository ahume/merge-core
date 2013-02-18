// ---------------------- ad_support.js starts here ---------------------------
// Time out is in minutes
var hoursToCount = 0; // Set this to make the cookie _not_ be session based (that is, an expire field is set)
var timeOut = 720;
var maxAdCount = 100;
var showAdsOnNthVideo = 2;

function buildIntrusiveAd(adHost, geoBandwidth, randString, commercialFolder, keywords, pageUrl, site, system, blockVideoAds, tile, partnerid) {
	var theseCookies = document.cookie;
	var pos = theseCookies.indexOf('GUDHTMLAds=');
	if 	(pos == -1) {
		var seconds = 180;
		var expireTime = new Date();
		var currenttimeinmills = expireTime.getTime();
		expireTime.setTime(currenttimeinmills + seconds * 1000 );
		document.cookie = 'GUDHTMLAds=Dummy; expires=' + expireTime.toGMTString() + ' ; path=/ ; domain=guardian.co.uk';

        var	intrusad =
            '<' + 'script type="text/javascript" src="' + adHost +
            '/js.ng/spacedesc=01&amp;comfolder=' + commercialFolder +
            '&amp;keywords=' + keywords +
            '&amp;bandwidth=' + geoBandwidth +
            '&amp;rand=' + randString +
			'&amp;site=' + site +
            '&amp;url=' + pageUrl +
			'&amp;system=' + system +
			'&amp;blockVideoAds=' + blockVideoAds +
			'&amp;partnerid=' + partnerid;
		if ( typeof tile !== 'undefined' ) {
			intrusad += '&amp;tile=' + tile;
		}
		intrusad += '"></' + 'script>';

		document.write(intrusad);
		document.close();
	}
}


function insertAsyncAd(selector, jsCode) {
    // This is a wrapper around writeCapture, so we can easily replace/upgrade in the future
    jQ(selector).writeCapture().replaceWith(jsCode);
}


//------------------------ TO DELETE ONCE WE HAVE UPGRADED TO BRIGHTCOVE PLAYER V3
//------------------------ AND DO NOT USE THE FLASH WRAPPER

function isVideoAdDisplayed() {
	return true;
}

// ----------------------- ad_support.js ends here ----------------------------
