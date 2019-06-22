/** 
 * function: 线上手势拉起vconsole,线下开发模式始终打开vconsole
 * rules:如⬅️ ⬅️ ⬅️ ⬅️ ⬅️ 再点三次
 */
const Debugger = (devDomainName,rules) => {
  var startx, starty
  var slideDistance = 100; // 最小滑动距离
  // var triggerRule = [3, 3, 3, 3, 3, 0, 0, 0]; // 滑动规则
  var triggerRule = directionTurnNumber(rules); // 滑动规则
  console.log('triggerRule',triggerRule)
  var saveTrack = []
  var isOff = true; // vconsole显示后不再执行
  window.onload = function () {
    if (location.href.indexOf(devDomainName) > 0) return // 开发环境始终打开vconsole
    document.getElementById('__vconsole').style.display = 'none'
  }
  // 获得角度
  function getAngle(angx, angy) {
    return Math.atan2(angy, angx) * 180 / Math.PI
  }

  function directionTurnNumber(rules) {
    var turnRules = []
    rules.forEach(item => {
      switch (item) {
        case 'click':
          turnRules.push(0)
          break
        case 'up':
          turnRules.push(1)
          break
        case 'down':
          turnRules.push(2)
          break
        case 'left':
          turnRules.push(3)
          break
        case 'right':
          turnRules.push(4)
          break
        default:
          console.warn('unknown rules!')
          break
      }
    });
    return turnRules
  }

  // 根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
  function getDirection(startx, starty, endx, endy) {
    var angx = endx - startx
    var angy = endy - starty
    // console.log('angx', angx)

    var result = 0

    // 如果滑动距离太短
    if (Math.abs(angx) < slideDistance && Math.abs(angy) < slideDistance) {
      return result; // 点击，未滑动！
    }

    var angle = getAngle(angx, angy)
    if (angle >= -135 && angle <= -45) { // 向上！
      result = 1
    } else if (angle > 45 && angle < 135) { // 向下
      result = 2
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) { // 向左
      result = 3
    } else if (angle >= -45 && angle <= 45) { // 向右
      result = 4
    }

    return result
  }

  function dealDirection(direction) {
    saveTrack.push(direction)
    // console.log('saveTrack', saveTrack)

    if (saveTrack.length < triggerRule.length) {
      if (saveTrack[saveTrack.length - 1] != triggerRule[saveTrack.length - 1]) return saveTrack = []
    } else if (saveTrack.length === triggerRule.length) {
      saveTrack.toString() === triggerRule.toString() ? dealSucess() : saveTrack = []
    } else {
      console.warn('check rules')
    }
  }

  function dealSucess() {
    saveTrack = []
    document.getElementById('__vconsole').style.display = 'block'
    isOff = false
  }
  // 手指接触屏幕
  document.addEventListener('touchstart', function (e) {
    startx = e.touches[0].pageX
    starty = e.touches[0].pageY
  }, false)
  // 手指离开屏幕
  document.addEventListener('touchend', function (e) {
    if (!isOff) return
    var endx, endy
    endx = e.changedTouches[0].pageX
    endy = e.changedTouches[0].pageY
    var direction = getDirection(startx, starty, endx, endy)

    dealDirection(direction)
  }, false)
}


export default Debugger