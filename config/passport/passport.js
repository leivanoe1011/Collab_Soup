

// this file will contain our passport strategies
// used to secure password
var bCrypt = require("bcrypt-nodejs");

module.exports = function(passport, user){

    var User = user;
    var LocalStrategy = require("passport-local").Strategy;

    passport.use("local-signup", new LocalStrategy(
        {
            // by default, local strategy users username and password
            // we will override with email
            usernameField: 'email',
            passwordField: 'password',
            // allows us to pass back the entire request to the callback
            // which is particularly useful for signing up
            passReqToCallback: true 
        },

        // In this function we will handle storing a user's details. 
        // The email will be validated to see if it exists
        // password will be encrypted
        // done will be returned to the call
        function(req, email, password, done) {

            // hashed password generating function
            var generateHash = function(password){
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            }

            // we check to see if the user already exists, and if not we add them
            User.findOne({
                where: {email: email}
            }).then(function(user){

                // if user exists, than exit
                if(user){
                    return done(null, false, {
                        message: "That email is already taken"
                    })
                }
                else{
                    var data = {
                        email: email,
                        password: generateHash(password);
                        firstName: req.body.firstName, // might have to rename first name to "name"
                        lastName: req.body.lastName // Might need to delete last name
                    };

                    // if the user does not exist, than we create it
                    User.create(data).then(function(newUser, created){
                        if(!newUser){
                            return done(null, false);
                        }

                        if(newUser){
                            return done(null, newUser); // This needs to be captured by the calling function
                        }
                    })
                }
            })
        }

    ));
    // end of Passport.User


    // Serialize
    // In this function, we will be saving the usr id to the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // Deserialize user
    passport.deserializeUser(id).then(function(user){
        if(user){
            done(null, user.get());
        }
        else{
            done(user.errors, null);
        }
    })
}