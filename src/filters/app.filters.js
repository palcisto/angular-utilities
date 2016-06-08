(function() {
  'use strict';

  angular
    .module('app.filters', [])
    .filter('dateRange', dateRangeFilter);

  dateRange.$inject =  [];

  function dateRange() {
    return function filter(dateList, dateField, rangeStart, rangeEnd) {
      if (rangeStart || rangeEnd) {
        let startDate = rangeStart ? new Date(rangeStart) : 0;
        let endDate   = rangeEnd ? new Date(rangeEnd) : Infinity;

        let objectsInRange = dateList.filter((obj) => {
          let objDate = wholeDays(obj[dateField]);
          let inRange;

          if (objDate >= startDate && objDate <= endDate) {
            inRange = obj;
          }
          return inRange;
        });

        return objectsInRange;
      } else {

        return dateList;
      }

      function wholeDays(date) {
        let d = new Date(date);
        return new Date(d.getFullYear(), d.getMonth(), d.getDate());
      }

    }
  }
})();
