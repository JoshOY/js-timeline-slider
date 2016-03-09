(() => {
  // 单个时间节点
  class Timenode {
    constructor(year, month) {
      let d = new Date();
      this.year = year || d.getUTCYear();
      this.month = month || d.getMonth() + 1;
    }
  }

  // 时间轴
  class Timeline {
    constructor(timenodes = [], width = 760, padding = 140) {
      var self = this;
      self.timenodes = timenodes;
      self.width = width;
      self.padding = padding;
      self.monthRange = 0;
      self.monthDistance = 0;
      self.earliestMonth = 0;
    }

    addTimenode(timenode) {
      var self = this;
      self.timenodes = self.timenodes.concat(timenode);
      self.timenodes.sort((a, b) => {
        if (a.year < b.year) {
          return true;
        }
        else if (a.year > b.year) {
          return false;
        }
        else /* a.year === b.year */ {
          return (a.month < b.month);
        }
      });

      if (self.timenodes.length === 1) {
        return 0;
      }
      else {
        self.monthRange = (self.timenodes[0].year * 12 + self.timenodes[0].month)
          - (self.timenodes[self.timenodes.length - 1].year * 12 + self.timenodes[self.timenodes.length - 1].month);
        self.monthDistance = (self.width - self.padding) / self.monthRange;
        self.firstMonth = self.timenodes[0].year * 12 + self.timenodes[0].month;
        self.earliestMonth = self.timenodes[self.timenodes.length - 1].year * 12 + self.timenodes[self.timenodes.length - 1].month;
        return 0;
      }
    }

    applyToDOM(selector) {
      var self = this;

    }

  }

  window.Timenode = Timenode;
  window.Timeline = Timeline;

  window.createTimeline = (selector, width=760, padding=140) => {

    var tl = new Timeline([], width, padding);

    $(selector + ' > ul').children().map(
      (idx, dom) => {
        let year = parseInt($(dom).attr('year'));
        let month = parseInt($(dom).attr('month'));

        var timenode = new Timenode(year, month);
        tl.addTimenode(timenode);
        // console.log(tl);
        return null;
      }
    );

    $(selector + '> ul').children().map(
      (idx, dom) => {
        let year = parseInt($(dom).attr('year'));
        let month = parseInt($(dom).attr('month'));
        let position = $(dom).attr('data-position') || '';
        let offset = (tl.padding / 2 + tl.monthDistance * (tl.firstMonth - (12 * year + month) )).toString() + 'px';
        $(dom).css('left', offset);
        var text = year + '.' + ((month < 10) ? ('0' + month) : month);
        $(dom).append('<span class="time">' + text + '</span>' + '<br /><span class="position">' + position + '</span>')
      }
    );

    $(selector + '> ul').children().map(
      (idx, dom) => {
        let sliderId = $(dom).attr('target-slider');
        let targetDOM = $(selector + ' > .timeline-slider > [timeline-order="{0}"]'.replace('{0}', sliderId));
        // console.log(targetDOM);

        $(dom).click(() => {

          let prevDOMs = $(targetDOM).prevAll();
          let nextDOMs = $(targetDOM).nextAll();

          $(targetDOM).map(
            (idx, dom) => { if ($(dom).hasClass('slide-left')) { $(dom).removeClass('slide-left'); }
          });
          $(prevDOMs).map(
            (idx, dom) => { if (!$(dom).hasClass('slide-left')) { $(dom).addClass('slide-left'); } }
          );
          $(nextDOMs).map(
            (idx, dom) => { if ($(dom).hasClass('slide-left')) { $(dom).removeClass('slide-left'); } }
          );
        })
      }
    );

  };

})();