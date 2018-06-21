const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const GooglePlusTokenStrategy = require("passport-google-plus-token");

const { JWT_SECRET } = require("./index");
const User = require("../models/user");

// JSON WEB STRATEGY
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: JWT_SECRET
    },
    async (payload, done) => {
      try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);
        // If user doesn't exist handle it
        if (!user) {
          return done(null, false);
        }
        // Otherwise return user
        done(null, user);
      } catch (error) {
        console.warn('there was an error here');
        done(error, false);
      }
    }
  )
);

// LOCAL STRATEGY
passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false);
        }
        const isMatch = await user.isValidPassword(password);

        if (!isMatch) {
          return done(null, false);
        }
        // Otherwise return user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// GOOGLE OAUTH STRATEGY
passport.use(
  "googleToken",
  new GooglePlusTokenStrategy(
    {
      clientID:
        "628123425516-gpfqsvd4epb7su6ru5qdudvnvco65pv9.apps.googleusercontent.com",
      clientSecret: "AJ2o6GEquNOxDrMVCqp0Lhf0"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }

        // if new user
        const newUser = new User({
          method: "google",
          firstname: profile.name.givenName,
          lastname: profile.name.familyName,
          email: profile.emails[0].value,
          google: {
            id: profile.id
          }
        });
        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);
