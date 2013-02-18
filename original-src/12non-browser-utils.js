// ------------------------ 12non-browser-utils.js starts here -----------------------------

// FUNCTION for namespacing 
function ensurePackage(packageName, packageBlock){
    var package_parts = packageName.split(".");
    var package_so_far = this;
    for (var i = 0; i < package_parts.length; i += 1) {
        var package_part = package_parts[i];
        if (!package_so_far[package_part]) {
            package_so_far[package_part] = {};
        }
        package_so_far = package_so_far[package_part];
    }
    if (packageBlock) {
        packageBlock(package_so_far);
    }
    return package_so_far;
}

// FUNCTIONS to trim white space around strings
function trim(str) {
	return ltrim(rtrim(str));
}

function ltrim(str) {
	return str.replace(/^\s+/, '');
}

function leftTrim(str){
    return str.replace(new RegExp(/^\s*/g), "");
}

function rtrim(str) {
	return str.replace(/\s+$/, '');
}

// FUNCTION strips a parameter from a url
function stripParamFromUrl(param, urlToStrip) {
	var paramterValueExpression = "=[\\w\\-]*";
	var url = urlToStrip.replace(new RegExp("\\?" + param + paramterValueExpression + "$"), ""); // first and only param
	url = url.replace(new RegExp("\\?" + param + paramterValueExpression +  "&"), "?"); // first of many params
	url = url.replace(new RegExp("&" + param + paramterValueExpression), ""); // not first param
	return url;	
}

// FUNCTION checks if the parameter is a number
function isNumber(value) {
	return typeof value === 'number';
}

// FUNCTION delegates from an object to another, used in pluck, check js there 
function delegateErrorHandler(to, from) {
	to.errorHandler = from.errorHandler;
}

// FUNCTION checks if url is valid
function isValidUrl(url) {
	var regexp = /(http:\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i;
	return regexp.test(url);
}

// FUNCTION adds a parameter to a url
function appendParameter(url, parameter) {
	if (url.indexOf('?') !== -1) {
		return url + '&' + parameter;
	} else {
		return url + '?' + parameter;
	}
}

// FUNCTION utility to determine if an object is an array, similar to isArray in 10util which checks any type 
function isArray(object) {
	return object != null && typeof object == "object" && 'splice' in object && 'join' in object;
}

// ------------------------ 12non-browser-utils.js ends here -----------------------------
