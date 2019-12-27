let sid
const session = JSON.parse(window.localStorage.getItem('session'))
if (session) sid = session.sid

const obj = {
  url: 'http://localhost:3000',
  sid: sid

}
export default obj
