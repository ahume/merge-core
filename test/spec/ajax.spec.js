/*global define:true, describe:true, it:true, expect:true */

define(['ajax'], function(AjaxRequest) {

    describe("Ajax module", function() {

        it("to return a function", function() {
            expect(typeof AjaxRequest).toBe('function');
        });

    });
});