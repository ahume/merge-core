// -------------------- post-load-images.js starts here ----------------------------

var postLoadImage = function postLoadImageFactory() {
    var imagesToLoad = {};
    
    function postLoadImage(elementId, url) {
        imagesToLoad[elementId] = url;
        document.getElementById(elementId).src = url;

    }
    
	
    function loadImages() {
        for (var elementId in imagesToLoad) {
            if (imagesToLoad.hasOwnProperty(elementId)) {
                document.getElementById(elementId).src = imagesToLoad[elementId];
            }
        }
    }
    addEvent(window, "load", loadImages); 
    
    return postLoadImage;
}();

/*
	Marc — The code below is duplicted because then it works in ie. Don't know why
	If you can make it work how it is coded in -r42021 when there is flash on the page
	then please share and fix it.

*/

var applyImageMask = function applyImageMaskFactory() {
    var imagesToMask = {};
    
    function applyImageMask(elementId, maskName) {
        imagesToMask[elementId] = maskName;
        if (imagesToMask.hasOwnProperty(elementId)) {
			var originalElement = document.getElementById(elementId);
			var parentNode = originalElement.parentNode;
			var parentNodeName = parentNode.nodeName;
			if (parentNodeName.match(/^a$|^div/i) && parentNode.lastChild.className !== 'mask') {
				var maskName = imagesToMask[elementId];
				applyImageMaskImmediate(originalElement, maskName);
			}
        }
    }
    
    function applyImageMasks() {
        for (var elementId in imagesToMask) {
            if (imagesToMask.hasOwnProperty(elementId)) {
	            var originalElement = document.getElementById(elementId);
	            var parentNode = originalElement.parentNode;
	            var parentNodeName = parentNode.nodeName;
	            if (parentNodeName.match(/^a$|^div/i) && parentNode.lastChild.className !== 'mask') {
	                var maskName = imagesToMask[elementId];
	                applyImageMaskImmediate(originalElement, maskName);
	            }
	        }
        }
    }
    addEvent(window, "load", applyImageMasks); 
    
    return applyImageMask;
}();

// -------------------- post-load-images.js ends here ----------------------------
