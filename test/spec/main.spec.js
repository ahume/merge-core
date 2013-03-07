describe("Main R2 module", function() {

	var r2 = guardian.r2;

	it("should load and provide r2 on the window", function() {
		expect(typeof r2).toBe('object');
	});

	describe("Ajax module", function() {

		it("should load and provide all functions", function() {
	    	expect(typeof r2.ajax).toBe('object');
	        expect(typeof r2.ajax.Request).toBe('function');
	    });

	});

	describe("DateUtil module", function() {

		it("should load and provide all functions", function() {
	        expect(typeof r2.DateUtil).toBe('object');
	        expect(typeof r2.DateUtil.myParseDate).toBe('function');
	        expect(typeof r2.DateUtil.formatDate).toBe('function');
	        expect(typeof r2.DateUtil.formatDateFromISO).toBe('function');
	        expect(typeof r2.DateUtil.relativeTimeDifference).toBe('function');
	        expect(typeof r2.DateUtil.formatToISO).toBe('function');

	    });

	});

	describe("Util10 module", function() {

		it("should load and provide all functions", function() {
	        expect(typeof r2.browser.isWebKit).toBe('boolean');

	    });

	});

});