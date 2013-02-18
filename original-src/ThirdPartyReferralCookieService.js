/* ---- ThirdPartyReferralCookieService.js ---- */
ensurePackage("guardian.r2");
guardian.r2.ThirdPartyReferralCookieService = function () {

	function createCookie(name, value, domain) {
		document.cookie = name + "=" + value + "; domain=" + domain + "; path=/";
	}
	
	function extractDomainFromHost(host) {
		var domainElements = host.split('.');
		if (domainElements.length <=1) {
			return domainElements[0];
		}
		var domain = '';
		
		for (var i = 1; i < domainElements.length; i++) {
			domain += '.' + domainElements[i];
		}
		
		return domain;
	}

	this.setThirdPartyReferralCookie = function() {
		var queryString = window.location.search;
		
		if (queryString) {
			var paramsArray = queryString.substring(1).split('&');
			for (var index=0; index < paramsArray.length; index++) {
				var paramNameAndValue = paramsArray[index].split('=');
				
				if (paramNameAndValue[0] === 'CMP') {
					var domain = extractDomainFromHost(window.location.hostname);
					createCookie('CMP', paramNameAndValue[1], domain);
				}
			}
		}
	}
};
// ----------------------- ThirdPartyReferralCookieService.js ends here ------------------------------
