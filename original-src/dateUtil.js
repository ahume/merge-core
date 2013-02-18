/* ---- DateUtil.js ---- */
ensurePackage("guardian.r2.DateUtil");

guardian.r2.DateUtil.myParseDate = function (dateString) {
	return new Date(Date.parse(dateString.replace(/(\d\d?:\d\d?:\d\d?)(:\d?\d?\d?)?/, "$1")));
};

guardian.r2.DateUtil.formatDate = function (commentDateString, currentDateString) {
	var commentDate = guardian.r2.DateUtil.myParseDate(commentDateString);
	var currentDate = guardian.r2.DateUtil.myParseDate(currentDateString);
	
	var relativeTimeDifference = guardian.r2.DateUtil.relativeTimeDifference(commentDate.toUTCString(), currentDate.toUTCString());
	if (relativeTimeDifference !== "") {
		if (relativeTimeDifference.indexOf("hour") > 0) {
			relativeTimeDifference = "about " +relativeTimeDifference;
		}
		relativeTimeDifference =  " (" +relativeTimeDifference + ")";
	}
	
	return commentDate.formatDate('d M y, g:ia') + relativeTimeDifference;
};

guardian.r2.DateUtil.formatDateFromISO = function (dateTimeString, currentDateString) {
	var dateTimeSplit = dateTimeString.split("T");
	var formattedDate = dateTimeSplit[0].replace(/-/g, "/");
	var dateTime = new Date(formattedDate + " " + dateTimeSplit[1]);

	var now = new Date(currentDateString);
	var relativeTimeDifference = guardian.r2.DateUtil.relativeTimeDifference(dateTime.toUTCString(), now.toUTCString());
	if (relativeTimeDifference !== "") {
		return relativeTimeDifference;
	} else {
		return dateTime.formatDate('d M y, g:ia');
	}
};

//dateString and currentDateString should be UTC formatted
guardian.r2.DateUtil.relativeTimeDifference = function (dateString, currentDateString) {
	var date = guardian.r2.DateUtil.myParseDate(dateString);
	var currentDate = guardian.r2.DateUtil.myParseDate(currentDateString);
	
	var relativeTimeDifference = "";
	var difference = currentDate.getTime() - date.getTime();

	if (difference < 60 * 60 * 1000) {
		var minutesAgo = Math.round(difference / (1000 * 60));
		if (minutesAgo > 1) {
			relativeTimeDifference = minutesAgo + " minutes ago";
		} else {
			relativeTimeDifference = "1 minute ago";
		}
	}
	else if (Math.round(difference / (1000 * 60 * 60)) < 24) {
		var hoursAgo = Math.round(difference / (1000 * 60 * 60));
		if (hoursAgo > 1) {
			relativeTimeDifference = hoursAgo + " hours ago";
		}
		else {
			relativeTimeDifference = hoursAgo + " hour ago";
		}
	}
	return relativeTimeDifference;
};

guardian.r2.DateUtil.formatToISO = function (dateString) {
	var pad = function (number) {
        return (number > 9) ? number : '0' + number;
	};

	var date = new Date(dateString);
	return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
};
