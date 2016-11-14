
var copyToClipboard = function (input) {
  window.textArea = document.createElement('textarea');

  document.body.appendChild(textArea);

  textArea.innerHTML = input;
  textArea.select();

  document.execCommand('copy');

  document.body.removeChild(textArea);
};








