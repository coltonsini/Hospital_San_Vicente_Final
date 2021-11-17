// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const User = require('../models/User');

// passport.use(new LocalStrategy ({
//     usernameField: 'email',
//     passwordField: 'password '
// }, async (email, password, done) => {
//     const user = await User.findOne({email: email})
//     if(!user) {
//         return done(null, false, { message: 'Usuario No Encontrado'});
//     } else {
//         const match = user.matchPassword(password);
//         if(match) {
//             return done(null, user);
//         } else {
//             return done(null, false, {message: 'Contraseña Incorrecta'});
//         }
//     }

// }));

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => {
//         done(err, user);
//     });
// });

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email',
}, async(email, password, done) => {
    const user = await Users.findOne({ email: email });
    if (!user) {
        return done(null, false, { message: ' Usuario no encontrado ' });
    } else {
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Contraseña Incorrecta' });
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Users.findById(id, (err, user) => {
        done(err, user);
    })
})