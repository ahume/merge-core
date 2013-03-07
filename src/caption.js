define(function() {

	function initialise() {
		if(jQ('li.pixie')) {
			var pixies = jQ('li.pixie');
			
			jQ(pixies).mouseenter(function() {
				jQ(this).find('div.trail-text').stop(true, true).slideDown('fast');
			});
			
			jQ(pixies).mouseleave(function() {
				jQ(this).find('div.trail-text').stop(true, true).slideUp('fast');
			});
		}
	}

	return {
		initialise: initialise
	}

});