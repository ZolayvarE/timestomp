var Timesheet = function (input) {
  if (typeof input === typeof 'hello') {
    this.status = 'new';
    this.title = 'Timesheet';
    this.stamps = [];
    this.startTime = 0;
    this.currentTime = 0;
  } else if (typeof input === typeof {}) {
    for (var key in input) {
      this[key] = input[key];
    }
  } else {
    console.error(new Error('Improper input type.'));
  }
};

Timesheet.prototype.save = function () {
  localStorage.currentSheet = JSON.stringify(this);
  localStorage[this.title] = JSON.stringify(this);
};

Timesheet.prototype.updateTime = function () {
  this.currentTime = Date.now() - this.startTime;
};






