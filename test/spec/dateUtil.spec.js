/*global define:true, describe:true, it:true, expect:true */

define(["dateUtil"], function(DateUtil) {

    describe("dateUtil module", function() {

        describe("myParseDate function", function() {

            it("should return correct day month and year", function() {
             var d = DateUtil.myParseDate("07:08:09:1234");
             expect(d.getDate()).toBe(1);
             expect(d.getMonth()).toBe(0);
             expect(d.getFullYear()).toBe(1994);
            });

        });

    });

});