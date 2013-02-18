// -------------------- update-content-mask.js starts here ----------------------------

jQ(document).ready(function () {
	// must do this because 'images' is dynamically updated by DOM - see travel-mask.js
    var images = document.getElementsByTagName('img');
    var imagesToProcess = [];
    forEachElementOf(images, function (image) {
        imagesToProcess.push(image);
    });
    var maskClass = /([a-zA-Z]+)-mask/;
    var anchorOrDiv = /^a$|^div/i;
    forEachElementOf(imagesToProcess, function (image) {
        var matchMaskClass = maskClass.exec(image.className); 
        if (matchMaskClass && image.parentNode.nodeName.match(anchorOrDiv)) {
            var maskName = matchMaskClass[1];
            applyImageMaskImmediate(image, maskName);
        }
    });
});

// --------------------- update-content-mask.js ends here -----------------------------
