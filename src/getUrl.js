define(function() {

	function initialise()  {
		var myUrl = document.getElementById('go-to');
		if (!myUrl) {
			return;
		}

		for(var i=0; i<myUrl.length;i++)  {
			myUrl.onchange=function ()  {					
				window.location=this.value;
			}
		}
	}

	return {
		initialise: initialise
	}

});
