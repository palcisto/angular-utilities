(function() {
  'use strict';

  describe('dates.filters', () => {

    beforeEach(module('dates.filters'));

    describe('dateRange filter', function() {
      let list = [{
        id: 1,
        date: '2013-08-06T00:00:00.000+00:00'
      },{
        id: 2,
        date: '2015-02-02T00:00:00.000+00:00'
      },{
        id: 3,
        date: '2016-05-26T00:00:00.000+00:00'
      }];

      it('should return a list filtered by a date range', inject((dateRangeFilter) => {
        let empty = null;
        let startDate = 'Fri Jan 01 2016 00:00:00 GMT-0500 (EST)';
        let endDate   = 'Fri May 27 2016 00:00:00 GMT-0400 (EDT)';
        let startDate1 = 'Sat May 28 2016 00:00:00 GMT-0400 (EDT)';
        let endDate1   = 'Sun May 29 2016 00:00:00 GMT-0400 (EDT)';

        expect(dateRangeFilter(list, 'date', empty, empty).length).toEqual(3);
        expect(dateRangeFilter(list, 'date', startDate, endDate).length).toEqual(1);
        expect(dateRangeFilter(list, 'date', startDate, empty).length).toEqual(1);
        expect(dateRangeFilter(list, 'date', startDate1, endDate1).length).toEqual(0);
        expect(dateRangeFilter(list, 'date', endDate1, startDate1).length).toEqual(0);
      }));
    });
  });
})();
