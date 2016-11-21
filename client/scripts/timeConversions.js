var convertToSeconds = function (time) {

  var seconds = Math.ceil(time / 1000);
  var minutes = 0;
  var hours = 0;

  if (seconds >= 60) {
    minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
  }

  if (minutes >= 60) {
    hours = Math.floor(minutes / 60);
    minutes = Math.floor(minutes % 60);
  }

  if (hours >= 24) {
    days = Math.floor(hours / 24);
    hours = Math.floor(hours % 24);
  }

  seconds < 10 ? seconds = '0' + seconds : seconds = '' + seconds;
  minutes < 10 ? minutes = '0' + minutes : minutes = '' + minutes;
  hours < 10 ? hours = '0' + hours : hours = '' + hours;

  return hours + ':' + minutes + ':' + seconds;

};

var convertToFrames = function (time) {

  var frames = Math.ceil((time % 1000) / 1000 * 30);
  var seconds = Math.floor(time / 1000);
  var minutes = 0;
  var hours = 0;

  if (seconds >= 60) {
    minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
  }

  if (minutes >= 60) {
    hours = Math.floor(minutes / 60);
    minutes = Math.floor(minutes % 60);
  }

  if (hours >= 24) {
    days = Math.floor(hours / 24);
    hours = Math.floor(hours % 24);
  }

  frames < 10 ? frames = '0' + frames : frames = '' + frames;
  seconds < 10 ? seconds = '0' + seconds : seconds = '' + seconds;
  minutes < 10 ? minutes = '0' + minutes : minutes = '' + minutes;
  hours < 10 ? hours = '0' + hours : hours = '' + hours;

  return hours + ':' + minutes + ':' + seconds + ':' + frames;

};







