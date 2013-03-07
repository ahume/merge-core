define(function() {

	function initialise() {
		jQ('a.shower').click(function(){
			if(jQ('body.clippings').length){
				theParent = '.show-more';
			} else {
				theParent = 'ul';
			};
			
			if( jQ(this).hasClass('football-leagues') ) {
				list = jQ(this).attr('href');
				jQ(this).toggleClass('open');
				jQ('ul'+list).toggle();
			} else {
				jQ(this).toggleClass('open').parents(theParent).filter(':first').next().toggle();
			}
			return false;
			
		});
	}

	return {
		initialise: initialise
	}

});
