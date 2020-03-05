/**
 * Add two string time values (HH:mm:ss) with javascript
 *
 * Usage:
 *  > addTimes('04:20:10', '21:15:10');
 *  > "25:35:20"
 *  > addTimes('04:35:10', '21:35:10');
 *  > "26:10:20"
 *  > addTimes('30:59', '17:10');
 *  > "48:09:00"
 *  > addTimes('19:30:00', '00:30:00');
 *  > "20:00:00"
 *
 * @param {String} startTime  String time format
 * @param {String} endTime  String time format
 * @returns {String}
 */
function addTimes (startTime, endTime) {
  var times = [ 0, 0, 0 ]
  var max = times.length

  var a = (startTime || '').split(':')
  var b = (endTime || '').split(':')

  // normalize time values
  for (var i = 0; i < max; i++) {
    a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
    b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
  }

  // store time values
  for (var i = 0; i < max; i++) {
    times[i] = a[i] + b[i]
  }

  var hours = times[0]
  var minutes = times[1]
  var seconds = times[2]

  if (seconds >= 60) {
    var m = (seconds / 60) << 0
    minutes += m
    seconds -= 60 * m
  }

  if (minutes >= 60) {
    var h = (minutes / 60) << 0
    hours += h
    minutes -= 60 * h
  }

//  return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2)
  return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2)
}

export default addTimes
