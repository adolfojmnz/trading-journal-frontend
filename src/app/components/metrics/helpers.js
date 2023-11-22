export function formatTime(seconds) {
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);
  var remainingSeconds = seconds % 60;

  var formattedTime = padZero(hours) + ':' + padZero(minutes) + ':' + padZero(Math.floor(remainingSeconds));
  return formattedTime;
}

function padZero(number) {
  return (number < 10 ? '0' : '') + number;
}

