// this file will contain our passport strategies
// used to secure password
var bCrypt = require("bcrypt-nodejs");

module.exports = function(passport, user, userLanguage){

    var User = user; // Used to load a new user or query existing user
    var User_language = userLanguage; // Used to load the languages
    var LocalStrategy = require("passport-local").Strategy;

    passport.use("local-creation", new LocalStrategy(
        {
            // by default, local strategy users username and password
            // we will override with email
            usernameField: 'email',
            passwordField: 'password',
            // allows us to pass back the entire request to the callback
            // which is particularly useful for signing up
            passReqToCallback: true ,

        },

        // In this function we will handle storing a user's details. 
        // The email will be validated to see if it exists
        // password will be encrypted
        // done will be returned to the call
        function(req, email, password, done) {

            // hashed password generating function
            var generateHash = function(password){
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            // we check to see if the user already exists, and if not we add them
            User.findOne({
                where: {email: email}
            }).then(function(user){

                // if user exists, then exit
                if(user){
                    return done(null, false, {
                        message: "That email is already taken"
                    })
                }
                else{
                    // Create the object to load to the User model
                    var data = {
                        email: email,
                        password: generateHash(password),
                        firstname: req.body.firstname, // might have to rename first name to "name"
                        lastname: req.body.lastname, // Might need to delete last name
                        github: req.body.github,
                        linkedin: req.body.linkedin

                    };

                    var languageProperties = [];
                    var propertyNames = Object.getOwnPropertyNames(req.body);

                    // Looking for any languages the user entered
                    for(var i = 0; i < propertyNames.length; i++){
                        
                        var propertyName = propertyNames[i].toLowerCase();

                        if(propertyName.includes("language")){
                            languageProperties.push(propertyName);
                        };
                    };

                    // if the user does not exist, than we create it
                    User.create(data).then(function(newUser, created){
                        if(!newUser){
                            return done(null, false);
                        };

                        var userId = newUser.id;

                        if(languageProperties.length > 0){
                            for(var i = 0; i < languageProperties.length; i++){
                                var lang = languageProperties[i];
                               
                                var userLang = {
                                    UserId: userId,
                                    language_name: req.body[lang]
                                };

                                User_language.create(userLang).then(function(userLanguage, created){
                                    if(!userLanguage){
                                        return done(null, false);
                                    };
                                });
                                // languageProperties[lang] = req.body[lang];
                            };

                        };
                      
                        // If the user is created successfully
                        if(newUser){
                            return done(null, newUser); // This needs to be captured by the calling function
                        };
                    });
                };
            });
        }
    ));
    // end of Passport.User

   // serialize
    // In this function, we will be saving the user id to the session
    passport.serializeUser(function(user, done) {

        done(null, user.id);

    });

    // deserialize user 
    passport.deserializeUser(function(id, done) {
    
        // we use the Sequelize findById promise to get the user, 
        // and if successful, an instance of the Sequelize model is returned.
        // User.findById(id).then(function(user) {
        User.findByPk(id).then(function(user) {
    
            if (user) {

                done(null, user.get());
    
            } else {
    
                done(user.errors, null);
    
            };
    
        });
    
    });

    //LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy(

        {
    
            // by default, local strategy uses username and password, we will override with email
    
            usernameField: 'email',
    
            passwordField: 'password',
    
            passReqToCallback: true // allows us to pass back the entire request to the callback
    
        },
    
    
        function(req, email, password, done) {
    
            var User = user;
    
            // compares the password entered with the bCrypt comparison 
            // method since we stored our password with bcrypt
            var isValidPassword = function(userpass, password) {
    
                return bCrypt.compareSync(password, userpass);
    
            }
    
            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
    
                if (!user) {
    
                    return done(null, false, req.flash("error", "User not found"));
    
                }
    
                if (!isValidPassword(user.password, password)) {
    
                    return done(null, false, req.flash("error", "password not correct"));
    
                }
    
    
                var userinfo = user.get();
                return done(null, userinfo);
    
    
            }).catch(function(err) {
    
                console.log("Error:", err);
    
                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });
    
            });
    
    
        }
    
    ));

}