
google_ad_output = 'js';
google_ad_type = 'text';
google_language = 'en';
google_encoding = 'utf8';
google_safe = 'high';
google_feedback = 'on'; 

function google_ad_request_done(google_ads) {
	var google_attribution = '<a class="ad_attribution" href=\"' + google_info.feedback_url + '">Ads by Google</a>';
	if (google_ads.length == 0) {
		return;
	}
	var s = '';
	var headingLevel = 'h2';
	if (jQ('#google-ads-container').hasClass('promo-component')) {
		headingLevel = 'h3';
	}

	function createAdvertisingDiv() {
		var advertisingDiv = document.getElementById('google-ads-container');
		if (advertisingDiv) {
			advertisingDiv.innerHTML = s;
			advertisingDiv.style.display = 'block';
		}
	}
	
	if (google_ads[0].type == 'text') {
		s += '<div class="hd">';
		s += '<' + headingLevel + '>';
		s += google_attribution;
		s += '</' + headingLevel + '></div>';
		s += '<div class="bd"><ul class="l1d">';
		for(i=0; i < google_ads.length; ++i) {
			s += '<li>';
			s += '<p class="t6"><a target="_TOP" href="' + google_ads[i].url + '">' + google_ads[i].line1 + '</a></p>';
			s += '<p>' + google_ads[i].line2 + ' ' + google_ads[i].line3 + '</p>';
			s += '<p><a target="_TOP" href="' + google_ads[i].url + '">' + google_ads[i].visible_url + '</a></p>';
			s += '</li>';
		}
		s += '</ul></div>';
	}

	if (loadEventList.hasFired) {
		createAdvertisingDiv();
	} else {
		addEvent(document, 'load', createAdvertisingDiv);
	}
	
	return;
}
