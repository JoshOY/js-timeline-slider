"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  // 单个时间节点

  var Timenode = function Timenode(year, month) {
    _classCallCheck(this, Timenode);

    var d = new Date();
    if (!year) {
      year = d.getUTCYear();
    }
    if (!month) {
      month = d.getMonth() + 1;
    }
  };

  // 时间轴


  var Timeline = function Timeline() {
    var timenodes = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var width = arguments.length <= 1 || arguments[1] === undefined ? 560 : arguments[1];

    _classCallCheck(this, Timeline);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = timenodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var timenode = _step.value;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };

  window.TimenodeImg = TimenodeImg;
  window.TimeNode = TimeNode;
  window.Timeline = Timeline;

  window.createTimeline = function (selector) {
    console.log($(selector));
  };
})();
//# sourceMappingURL=../maps/timeline.js.map
