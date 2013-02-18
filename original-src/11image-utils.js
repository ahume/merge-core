// -------------------- 11image-utils.js starts here ----------------------------

var applyImageMaskImmediate;
var applyFullScreenImageMask;
var removeFullScreenImageMask;
var ensureElementHasLayoutInIE6;

(function() {
    var root = commonStaticRoot + 'styles/images/';
    
    function getMaskDef(maskName, width, height) {
        var lowerCaseMaskName = maskName.toLowerCase();
        
        function defaultMaskDef(url) {
        	return {url : url, width : width, height : height};
        }
               
		if (width >= 140 && height >= 84) {
			if(guardian.r2.browser.isIE6) {
				return {url : root + lowerCaseMaskName + '_140ie6.png', width : 140, height : 84};
			}
			else {
				return {url : root + lowerCaseMaskName + '_140.png', width : 140, height : 84};
			}
		}
        return null;
    }
    
    function createIE6BackgroundDiv(maskDef) {
        var newImageDiv = document.createElement("div");
        newImageDiv.style.width = maskDef.width + "px";
        newImageDiv.style.height = maskDef.height + "px";
        newImageDiv.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + maskDef.url + "',sizingMethod='scale')";
        newImageDiv.style.position = "absolute";
        newImageDiv.style.left = String( - maskDef.leftOffset);
        newImageDiv.style.top = String( - maskDef.topOffset);
        newImageDiv.style.zIndex = "100";
    
    	return newImageDiv;
    }
    
    var applyMaskInIE = function (parentNode, maskDef) {
    	maskDef.leftOffset = maskDef.topOffset = 0;
        var newImageDiv = createIE6BackgroundDiv(maskDef);
        newImageDiv.className = 'mask';
        parentNode.style.position = 'relative';
        parentNode.style.display = 'block';
        ensureElementHasLayoutInIE6(parentNode);
        parentNode.appendChild(newImageDiv);
        if (document.getElementById('content')) {
        	// Force IE6 and IE7 to redraw.
        	document.getElementById('content').style.display = 'none';
        	document.getElementById('content').style.display = 'block';
        }
        
        return newImageDiv;
    };
    
    var applyMask = function (originalElement, parentNode, maskDef) {
        parentNode.style.display = 'block';
        parentNode.style.position = 'relative';
		
        var newImage = originalElement.cloneNode(false);
		newImage.style.width = maskDef.width + 'px';
        newImage.style.height = maskDef.height + 'px';
        newImage.setAttribute('src', maskDef.url);
        newImage.className = 'mask';
        newImage.setAttribute('alt', '');
		parentNode.appendChild(newImage);
        
        return newImage;
    };

	getNumberPropertyValue = function (originalElement, propertyName) {
        var propVal = Number(originalElement.getAttribute(propertyName));
        if (propVal === 0) {
        	if (document.defaultView && document.defaultView.getComputedStyle) {
	        	propVal = document.defaultView.getComputedStyle(originalElement,'').getPropertyValue(propertyName);        	
        	} else if (originalElement.currentStyle){
	        	propVal = originalElement.currentStyle[propertyName];
	        }
	        
	 		if (propVal !== null) {
				propVal = parseInt(propVal.replace('px', ''), 10);
			}
        }
		if (!isNaN(propVal) && propVal !== null) {
			return propVal;
		}
		else {
			return 0;
		}
 	}

    applyImageMaskImmediate = function (originalElement, maskName) {
        var parentNode = originalElement.parentNode;
        var width = getNumberPropertyValue(originalElement, 'width');
        var height = getNumberPropertyValue(originalElement, 'height');
        var maskDef = getMaskDef(maskName, width, height);
        if (maskDef) {
            if (guardian.r2.browser.isIE6 || guardian.r2.browser.isIE7) {
                return applyMaskInIE(parentNode, maskDef);
            } else {
                return applyMask(originalElement, parentNode, maskDef);
            }
        }
    };
    
    var applyFullScreenMaskInIE6 = function (parentNode, maskDef) {
        var newImageDiv = createIE6BackgroundDiv(maskDef);
        ensureElementHasLayoutInIE6(parentNode);
		parentNode.insertBefore(newImageDiv, parentNode.firstChild);
		
        return newImageDiv;
    };
    
    applyFullScreenImageMask = function (elementThatContainsThingToNOTHide) {
    	if (guardian.r2.browser.isIE6) {
			document.body.parentNode.style.overflow = 'hidden';

    		var element = document.getElementById(elementThatContainsThingToNOTHide);
			
			var leftOffset = element.offsetParent.offsetLeft;

    		var body = document.body;
    		return applyFullScreenMaskInIE6(
    			element,
    			{
    				url : root + 'white-bg.png',
    				width : document.documentElement.clientWidth,
    				height : body.clientHeight,
    				leftOffset : leftOffset,
    				topOffset : 0
    			});
    	}
    };
    
    removeFullScreenImageMask = function () {
		document.body.parentNode.style.overflow = '';
    };
    
    ensureElementHasLayoutInIE6 = function (element) {
        if (!element.currentStyle.hasLayout) {
	        element.style.zoom = '1';
	    }    	
    }
    
})();

// -------------------- 11image-utils.js ends here ----------------------------
