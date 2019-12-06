const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


function initialize(passport,getUserByEmail) { 
  const authenticateUser = async (email,pswd,done) => {
    const user = getUserByEmail (email)
    if(user === null) {
      return done(null, false, {message: 'No user with that email'})
    }
    try {
      if(await bcrypt.compare(pswd, user.pswd)) {
        return done(null,user)
      } else{
        return done(null, false, {message: 'Password Incorrect'})
      }
    }  catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({usernameField: 'user_email'},
  authenticateUser))
}
   
module.exports = initialize