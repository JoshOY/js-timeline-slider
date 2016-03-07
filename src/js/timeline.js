(() => {
  // 单个时间节点
  class Timenode {
    constructor(year, month) {
      let d = new Date();
      if (!year) {
        year = d.getUTCYear();
      }
      if (!month) {
        month = d.getMonth() + 1;
      }
    }
  }

  // 时间轴
  class Timeline {
    constructor(timenodes = [], width = 560) {
      for (let timenode of timenodes) {

      }
    }
  }



  window.TimenodeImg = TimenodeImg;
  window.TimeNode = TimeNode;
  window.Timeline = Timeline;

  window.createTimeline = (selector) => {
    console.log($(selector));
  };

})();