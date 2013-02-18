/* ---- DialogBox.js ---- */
ensurePackage("guardian.r2");

guardian.r2.DialogBox = function () {

	var appliedImageMask = false;
	var instance = this;

	this.showDialogBox = function (dialogBox, dialogBoxWrapper, scrollable, nonVisibleDialog) {
		if (guardian.r2.browser.isIE6) {
			document.body.parentNode.style.overflow = 'hidden';
		}
		scrollable = scrollable ? scrollable : false;
		instance.positionDialogBox(dialogBox, dialogBoxWrapper, scrollable, nonVisibleDialog);
		dialogBoxWrapper.style.display = "block";
		if (guardian.r2.browser.isIE6) {
			dialogBoxWrapper.style.background = "none";
			if (dialogBoxWrapperHasNotAlreadyHadImageMaskApplied(dialogBox, dialogBoxWrapper)) {
				applyFullScreenImageMask(dialogBoxWrapper.id);
				appliedImageMask = true;
			}
			else {
				dialogBoxWrapper.firstChild.style.width = document.body.clientWidth + "px";
				leftOffset = dialogBoxWrapper.offsetParent.offsetLeft;
				dialogBoxWrapper.firstChild.style.left = "-" + leftOffset + "px";
			}
		}
		
		toggleHideOnPopupElements("hidden");
	};

	this.hideDialogBox = function (dialogBoxWrapper) {
		if (guardian.r2.browser.isIE6) {
			removeFullScreenImageMask();
		}
		
		toggleHideOnPopupElements("visible");
	};

	this.positionDialogBox = function (dialogBox, dialogBoxWrapper, scrollable, nonVisibleDialog) {
		var position = getCenterPosition();
		var scroll = getScrollPosition();
		var wrapperWidth = 0;
		var posX = position.x;
		if (guardian.r2.browser.isIE6) {
			dialogBoxWrapper.style.position = 'absolute';
			dialogBox.style.position = 'absolute';
		}
		dialogBoxWrapper.style.visibility = 'hidden';
		dialogBoxWrapper.style.display = 'block';
		dialogBox.style.visibility = 'hidden';
		dialogBox.style.display = 'block';
		var w = getAxisBoxModelTotalSize(dialogBox, "width");
		if (guardian.r2.browser.isIE6) {
			if (dialogBoxIsContainedByWrapper(dialogBox)) {
				wrapperWidth = getNumberPropertyValue(document.getElementById('wrapper'), "width");
				if (wrapperWidth < posX) {
					posX = wrapperWidth;
				}
			}
		}
		var centreX = posX / 2;
		var centreOffset = w / 2;
		var leftOffset = Math.round(centreX - centreOffset);
		dialogBoxWrapper.style.top = "0px";
		dialogBoxWrapper.style.left = "0px";
		dialogBox.style.left = leftOffset + "px";
		var boxHeight = getAxisBoxModelTotalSize(dialogBox, "height");
		var windowHeight = position.y;
		var scrollHeight = scroll.y;
		var topOffset = 5;
		if (boxHeight < windowHeight) {
			topOffset = (windowHeight - boxHeight) / 2;
		}
		if (guardian.r2.browser.isIE6 || scrollable) {
			topOffset += scrollHeight;
		}
		dialogBox.style.top = topOffset + "px";
		dialogBox.style.visibility = '';
		dialogBoxWrapper.style.visibility = '';
		dialogBoxWrapper.style.display = 'none';
		
		if (nonVisibleDialog && nonVisibleDialog === true) {
			dialogBoxWrapper.style.zIndex = '-1';
		}
	};
	
	this.createCloseLink = function(dialogBox, dialogBoxWrapper) {
		function closeDialogBox() {
			dialogBox.style.display = 'none';
			dialogBoxWrapper.style.display = 'none';
			instance.hideDialogBox(dialogBoxWrapper);
		}
		var closeLinkId = (dialogBox.id + '-close-link');
		if (!document.getElementById(closeLinkId)) {
			var closeLink = document.createElement('a');
			closeLink.href = '#';
			closeLink.innerHTML = 'close';
			closeLink.id = (closeLinkId);
			closeLink.className='close';
			addEvent(closeLink, 'click', closeDialogBox);
			
			var toolBox= document.createElement('p');
			toolBox.className='toolbox';
			toolBox.appendChild(closeLink);
			
			dialogBox.insertBefore(toolBox, dialogBox.firstChild);

		}
	}
	
	function dialogBoxWrapperHasNotAlreadyHadImageMaskApplied(dialogBox, dialogBoxWrapper) {
		var isEmptyString = /^\s*$/;
		if (dialogBoxIsContainedByWrapper(dialogBox)) {
			return !appliedImageMask;
		}
		return !appliedImageMask && isEmptyString.test(dialogBoxWrapper.innerHTML)
	}

	function dialogBoxIsContainedByWrapper(dialogBox) {
		return !(dialogBox.parentNode === document.body);
	}

	function getAxisBoxModelTotalSize(el, axis) {
		var boxHeight, boxPadding, boxMargins, boxWidth;
		switch (axis) {
		case 'height':
			boxHeight = el.offsetHeight;
			boxMargins = getNumberPropertyValue(el, "marginTop") + getNumberPropertyValue(el, "marginBottom");
			return (boxHeight + boxMargins);
		case 'width':
			boxWidth = el.offsetWidth;
			boxPadding = getNumberPropertyValue(el, "paddingLeft") + getNumberPropertyValue(el, "paddingRight");
			boxMargins = getNumberPropertyValue(el, "marginLeft") + getNumberPropertyValue(el, "marginRight");
			return (boxWidth + boxPadding + boxMargins);
		}
	}
};
