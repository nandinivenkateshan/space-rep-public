const name = 'session'
export const getSession = () => {
  const session = JSON.parse(window.localStorage.getItem(name))
  return session
}
