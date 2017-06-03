/**
 * @param {number} time - 时间戳
 * @returns {string} 当天零点
 */
function formatDate (time) {
  const date = new Date(time)
  let _date = date.getFullYear() + '-'
  _date += addZero(date.getMonth() + 1) + '-'
  _date += addZero(date.getDate())
  return _date
}

/**
 * 计算两天相差天数
 * @param {Date} dateOne
 * @param {Date} dateTwo
 * @returns {number}
 */
function daysBetween (dateOne, dateTwo) {
  let _dateOne = new Date(formatDate(dateOne.getTime()))
  let _dateTwo = new Date(formatDate(dateTwo.getTime()))

  let diff = _dateTwo.getTime() - _dateOne.getTime()
  let days = parseInt(diff / (1000 * 60 * 60 * 24), 10)

  return days
}

/**
 * @param {number} offset - 偏离天数
 * @returns {string} 与当前日期偏离offset的日期
 */
function getDate (offset = 0) {
  let now = new Date()
  now.setDate(now.getDate() + offset)

  let m = now.getMonth() + 1
  let d = now.getDate()

  return m + '月' + d + '日'
}

/**
 * 为小于10的数字前面添加0
 * @param n
 * @returns {string}
 */
function addZero (n) {
  if (n < 10) {
    return '0' + n
  }
  return '' + n
}

/**
 * @param {number} time - 时间戳
 * @param {number} offset - 偏离分钟
 * @returns {string} 格式为HH:mm的时间
 */
function getTime (time, offset = 0) {
  let t = new Date(time)
  t.setMinutes(t.getMinutes() + offset)

  let h = addZero(t.getHours())
  let m = addZero(t.getMinutes())

  return h + ':' + m
}

export {
  addZero,
  formatDate,
  daysBetween,
  getDate,
  getTime
}
