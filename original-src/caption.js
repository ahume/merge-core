// ------------------------ caption.js starts here ----------------------------
jQ(document).ready(function() {
	 if(jQ('li.pixie')) {
		var pixies = jQ('li.pixie');
		
		jQ(pixies).mouseenter(function() {
			jQ(this).find('div.trail-text').stop(true, true).slideDown('fast');
		});
		
		jQ(pixies).mouseleave(function() {
			jQ(this).find('div.trail-text').stop(true, true).slideUp('fast');
		});
	}
});
// ------------------------- caption.js ends here -----------------------------
