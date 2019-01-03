export function addClass(el, classPropertyName) {
  if (hasClass(el, classPropertyName)) {
    return
  }
  let newClass = el.className.split(' ') // 以空格分割为数组
  newClass.push(classPropertyName)
  el.className = newClass.join(' ') // 把数组中的所有元素放入一个字符串
}
// 检查是否有css类名
export function hasClass(el, classPropertyName) {
  // (^|\\s)--以className开头或者以空白字符开头
  let reg = new RegExp('(^|\\s)' + classPropertyName + '(\\s|$)')
  // el.className返回元素的class属性值
  return reg.test(el.className)
}

export function getData(el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}
