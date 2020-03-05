import {
  last,
  map,
  pipe,
  split,
  startsWith,
  trim,
  filter, prop,
  head, defaultTo
} from 'ramda'

export const setCookie = (name, value, expire) => {
  const date = new Date()
  date.setTime(date.getTime() + expire * 24 * 60 * 60 * 1000)
  const expires = 'expires=' + date.toUTCString()
  if (typeof document !== 'undefined') {
    document.cookie = name + '=' + value + ';' + expires + ';path=/'
  }
}

const a = (b) => {
  console.warn(b)
  return b
}
export const getCookie = key =>
  pipe(
    split(';'),
    map(trim),
    filter(startsWith(key)),
    defaultTo([]),
    map(split('=')),
    filter(prop(1)),
    head,
    defaultTo([]),
    last
  )(document.cookie)
