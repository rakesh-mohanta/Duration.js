
var ParseDuration = (function () {

    var nanosecond  = 1,
        microsecond = 1000 * nanosecond,
        millisecond = 1000 * microsecond,
        second      = 1000 * millisecond,
        minute      = 60   * second,
        hour        = 60   * minute;

    var unitMap = {
        "ns" : nanosecond,
        "us" : microsecond,
        "µs" : microsecond,
        "μs" : microsecond,
        "ms" : millisecond,
        "s"  : second,
        "m"  : minute,
        "h"  : hour
    };

    var Duration = function (nanoseconds) {
        this._nanoseconds = nanoseconds;
    };

    Duration.prototype.nanoseconds = function () {
        return this._nanoseconds;
    };

    Duration.prototype.microseconds = function () {
        return Math.floor(this._nanoseconds / microsecond);
    };

    Duration.prototype.milliseconds = function () {
        return Math.floor(this._nanoseconds / millisecond);
    };

    Duration.prototype.seconds = function () {
        return Math.floor(this._nanoseconds / second);
    };

    Duration.prototype.minutes = function () {
        return Math.floor(this._nanoseconds / minute);
    };

    Duration.prototype.hours = function () {
        return Math.floor(this._nanoseconds / hour);
    };

    return function (duration) {

        if (duration === "0" || duration === "+0" || duration === "-0") {
          return new Duration(0);
        }

        var regex = /([\-\+\d\.]+)([a-zµμ]+)/g,
            total = 0,
            count = 0,
            sign  = duration[0] === '-' ? -1 : 1,
            unit, value, match;

        while (match = regex.exec(duration)) {

            unit  = match[2];
            value = Math.abs(parseFloat(match[1]));
            count++;

            if (isNaN(value)) {
              throw new Error("invalid duration");
            }

            if (typeof unitMap[unit] === "undefined") {
              throw new Error("invalid unit " + unit);
            }

            total += value * unitMap[unit];
        }

        if (count === 0) {
          throw new Error("invalid duration");
        }

        return new Duration(total * sign);
    };

}).call(this);

if (typeof module !== "undefined") {
   module.exports = ParseDuration;
}