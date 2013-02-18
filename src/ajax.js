/*global define:true, ActiveXObject:true */
// --------------------------------- ajax.js -------------------------------------------
define(function() {

    var XMLHttpArray = [
            function () {return new XMLHttpRequest();},
            function () {return new ActiveXObject("Msxml2.XMLHTTP");},
            function () {return new ActiveXObject("Microsoft.XMLHTTP");}
    ];

    function createXMLHTTPObject() {
        var xmlhttp = false;
        for (var i = 0; i < XMLHttpArray.length; i++) {
            try {
                xmlhttp = XMLHttpArray[i]();
            } catch (e) {
                continue;
            }
            break;
        }
        return xmlhttp;
    }

    function AjaxRequest(url, requestDetails) {
        var requestObject = createXMLHTTPObject();
        var method = requestDetails.method ? requestDetails.method.toLowerCase() : 'get';
        var postBody = null;
        if (method === 'get' && requestDetails.parameters) {
            url += ((url.indexOf('?') === -1) ? '?' : '&') + requestDetails.parameters;
        } else {
            postBody = requestDetails.parameters;
        }
        requestObject.onreadystatechange = function () {
            if (requestObject.readyState !== 4) {
                return;
            }
            if (requestObject.status === 200) {
                requestDetails.onSuccess(requestObject);
            } else {
                requestDetails.onFailure(requestObject);
            }
        };
        requestObject.open(method, url, true);
        if (method === 'post') {
            requestObject.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        }
        requestObject.send(postBody);
    }


    return AjaxRequest;

});
