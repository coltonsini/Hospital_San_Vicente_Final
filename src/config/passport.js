// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy
// const User = require('../models/Users');
// // const { matchPassword } = require('../utils');

// passport.use(new LocalStrategy({
//     usernameField: 'email'
// }, async (email, pass, done) => {
//     const user = await User.findOne ({email: email});
//     if(!user) {
//         return done(null, false, { message: 'Usuario no encontrado'});
//     } else {
//         const match = await user.matchPassword(pass);
//         if(match){
//             return done(null, user);
//         } else {
//             return done(null, false, {message: 'Contraseña incorrecta'});
//         }
//     }
// }));

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// })

// passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => {
//         done(err, user);
//     })
// })


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/Users');
const { matchPassword } = require('../utils');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pass'
}, async(email, pass, done) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        return done(null, false, { message: 'Not User Found. ' });
    } else {
        const match = await User.matchPassword(pass);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect Password' });
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
})