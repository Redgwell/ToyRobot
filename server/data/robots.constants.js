'use strict';

module.exports = {
  direction: {
    N: 'North',
    S: 'South',
    E: 'East',
    W: 'West',
    parse: function(d) {
      if (!d) {
        return null;
      }

      if (this[d]) {
        return this[d];
      }

      for (var k in this) {
        if (this.hasOwnProperty(k) && this[k] === d) {
          return d;
        }
      }
      return null;
    }
  },
  limits: {
    min: {
      x: 0,
      y: 0
    },
    max: {
      x: 4,
      y: 4
    }
  }
}
