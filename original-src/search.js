// ----------------------- search.js starts here ------------------------------

function searchWeb(webSearchBaseUrl, searchBaseUrl, discussionCommentsSearchUrl){
    var textField = document.getElementById('web-search-field');
		var form = document.getElementById('searchbeta');
		if (document.getElementById("search-web") && (document.getElementById("search-web").selected || document.getElementById("search-web").checked)) {
			form.action = webSearchBaseUrl;
		}
        else {
           if(form.action == webSearchBaseUrl){
               form.action = searchBaseUrl;
		    }
        }
        if (document.getElementById("search-contributions") && (document.getElementById("search-contributions").selected || document.getElementById("search-contributions").checked)) {
			form.action = discussionCommentsSearchUrl;
		}
		else {
            if(form.action == discussionCommentsSearchUrl){
               form.action = searchBaseUrl;
		    }
		}
     return true;
}

// ------------------------- search.js ends here ------------------------------
