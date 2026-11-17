const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const bcrypt = require('bcryptjs');
const { User } = require('../models/dbModel');

// LOCAL STRATEGY
// Login ke waqt email aur password verify karegi

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({
                    where: { email }
                });

                if (!user) {
                    return done(null, false, {
                        message: 'User not found'
                    });
                }

                const isMatch = await bcrypt.compare(
                    password,
                    user.password
                );

                if (!isMatch) {
                    return done(null, false, {
                        message: 'Invalid password'
                    });
                }

                return done(null, user);

            } catch (error) {
                return done(error);
            }
        }
    )
);


// JWT STRATEGY
// Protected routes par cookie se token nikalegi aur verify karegi

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req.cookies?.token || null
    ]),
    secretOrKey: process.env.JWT_SECRET
};

passport.use(
    new JwtStrategy(
        jwtOptions,
        async (payload, done) => {
            try {
                const user = await User.findByPk(payload.id);

                if (!user) {
                    return done(null, false);
                }

                return done(null, user);

            } catch (error) {
                return done(error, false);
            }
        }
    )
);

module.exports = passport;