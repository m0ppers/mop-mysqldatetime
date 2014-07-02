"use strict";
angular.module("mopMysqlDateTime", [])
    .service("mopMysqlDateTime", function() {
        return {
            fromMysqlDateTime: function(mysqlDateTime) {
                var date = new Date();
                date.setMilliseconds(0);

                var result = mysqlDateTime.match(/^(\d{4})-(\d{2})-(\d{2})( (\d{2}):(\d{2}):(\d{2}))?$/);

                if (!result) {
                    throw new Error(mysqlDateTime + " is not a mysql datetime");
                }
                result = result.map(function(match) {
                    return parseInt(match, 10);
                });
                date.setFullYear(result[1]);
                date.setMonth(result[2] - 1);
                date.setDate(result[3]);
                date.setHours(result[5] || 0);
                date.setMinutes(result[6] || 0);
                date.setSeconds(result[7] || 0);
                return date;
            },
            toMysqlDateTime: function(date) {
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var seconds = date.getSeconds();

                if (month < 10) {
                    month = "0" + month;
                }
                if (day < 10) {
                    day = "0" + day;
                }
                if (hours < 10) {
                    hours = "0" + hours;
                }
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }

                return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
            }
        }
    })
    .filter('mysqlDate2Date', ["mopMysqlDateTime", function(mopMysqlDateTime) {
        return function(value) {
            return mopMysqlDateTime.fromMysqlDateTime(value);
        }
    }])
;
