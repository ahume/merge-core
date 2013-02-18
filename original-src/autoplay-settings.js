jQ(document).ready(function() {

    var testCookie = 'GU_TEST_COOKIE';
    var cookieName = 'GU_VIDEO_SETTINGS';
    date = new Date();
    date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000)); // thirty day cookie expiry date
    var options = { path: '/', expires: date };

    function setAutoplayText() {
        if(jQ.cookie(cookieName) == 'false') {
            jQ(".off").show();
            jQ(".on").hide();
        }
        else {
            jQ(".on").show();
            jQ(".off").hide();
        }
    }

    function checkCookiesEnabled() {
        jQ.cookie( testCookie, true );
        if (jQ.cookie(testCookie)) {
            jQ.cookie(testCookie, null);
            jQ(".cookied").show();
            jQ(".not-cookied").hide();
        }
        else {
            jQ(".not-cookied").show();
            jQ(".cookied").hide();
        }
    }

    jQ(".autoplay-on").click(function() {
        jQ.cookie(cookieName, 'true', options);
        setAutoplayText();
        jQ('a.close-toolbox-settings').focus();
        return false;
    });
    
    jQ(".autoplay-off").click(function() {
        jQ.cookie(cookieName, 'false', options);
        setAutoplayText();
        jQ('a.close-toolbox-settings').focus();
        return false;
    });

    checkCookiesEnabled();
    setAutoplayText();
    
});
