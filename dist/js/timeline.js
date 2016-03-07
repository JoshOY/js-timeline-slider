'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  // 单个时间节点

  var Timenode = function Timenode(year, month) {
    _classCallCheck(this, Timenode);

    var d = new Date();
    this.year = year || d.getUTCYear();
    this.month = month || d.getMonth() + 1;
  };

  // 时间轴


  var Timeline = function () {
    function Timeline() {
      var timenodes = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
      var width = arguments.length <= 1 || arguments[1] === undefined ? 760 : arguments[1];
      var padding = arguments.length <= 2 || arguments[2] === undefined ? 140 : arguments[2];

      _classCallCheck(this, Timeline);

      var self = this;
      self.timenodes = timenodes;
      self.width = width;
      self.padding = padding;
      self.monthRange = 0;
      self.monthDistance = 0;
      self.earliestMonth = 0;
    }

    _createClass(Timeline, [{
      key: 'addTimenode',
      value: function addTimenode(timenode) {
        var self = this;
        self.timenodes = self.timenodes.concat(timenode);
        self.timenodes.sort(function (a, b) {
          if (a.year < b.year) {
            return true;
          } else if (a.year > b.year) {
            return false;
          } else /* a.year === b.year */{
              return a.month < b.month;
            }
        });

        if (self.timenodes.length === 1) {
          return 0;
        } else {
          self.monthRange = self.timenodes[0].year * 12 + self.timenodes[0].month - (self.timenodes[self.timenodes.length - 1].year * 12 + self.timenodes[self.timenodes.length - 1].month);
          self.monthDistance = (self.width - self.padding) / self.monthRange;
          self.firstMonth = self.timenodes[0].year * 12 + self.timenodes[0].month;
          self.earliestMonth = self.timenodes[self.timenodes.length - 1].year * 12 + self.timenodes[self.timenodes.length - 1].month;
          return 0;
        }
      }
    }, {
      key: 'applyToDOM',
      value: function applyToDOM(selector) {
        var self = this;
      }
    }]);

    return Timeline;
  }();

  window.Timenode = Timenode;
  window.Timeline = Timeline;

  // window.demoTimeline = new Timeline();

  window.createTimeline = function (selector) {
    var width = arguments.length <= 1 || arguments[1] === undefined ? 760 : arguments[1];
    var padding = arguments.length <= 2 || arguments[2] === undefined ? 140 : arguments[2];


    var tl = new Timeline([], width, padding);

    $(selector + ' > ul').children().map(function (idx, dom) {
      var year = parseInt($(dom).attr('year'));
      var month = parseInt($(dom).attr('month'));

      var timenode = new Timenode(year, month);
      tl.addTimenode(timenode);
      console.log(tl);
      return null;
    });

    $(selector + '> ul').children().map(function (idx, dom) {
      var year = parseInt($(dom).attr('year'));
      var month = parseInt($(dom).attr('month'));
      var offset = (tl.padding / 2 + tl.monthDistance * (tl.firstMonth - (12 * year + month))).toString() + 'px';
      $(dom).css('left', offset);
      var text = year + '.' + month;
      $(dom).append('<span class="time">' + year + '.' + month + '</span>');
    });
  };
})();

createTimeline('#timeline-demo');
//# sourceMappingURL=../maps/timeline.js.map
