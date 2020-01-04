export default () => {
  if (typeof document !== 'undefined') {
    const date = new Date()
    document.cookie = 'token= ; expires = ' + date
  }
}
