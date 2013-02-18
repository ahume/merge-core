/*
Pull down navigation handler

*/
addEvent(window, "load", GUgetUrl);

function GUgetUrl()  {
	if (!document.getElementById('go-to')) return;
	
	var myUrl=document.getElementById('go-to');
	for(var i=0; i<myUrl.length;i++)  {

		myUrl.onchange=function ()  {
						
			window.location=this.value;
		}
	}
	
	

}
