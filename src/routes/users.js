
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/users/signin', (req, res) => {
  res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/citas/crear',
    failureRedirect: '/users/signin',
    failureFlash: true,
}));

router.get('/users/signup', (req, res) => {
  res.render('users/signup');
});

router.post('/users/signup', async(req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const errors = [];
  console.log(req.body)
  if (name.lenght <= 0) {
    errors.push({ text: "Porfavor ingresa tu nombre" });
  }
  if (password.lenght <= 0) {
    errors.push({ text: "Porfavor ingresa tu contraseña" });
  }
  if (confirm_password.lenght <= 0) {
    errors.push({ text: "Porfavor ingresa la confirmación de tu contraseña" });
  }
  // if (validateEmail(email)) {
  //   errors.push({ text: "Porfavor ingresa un correo valido" });
  // }
  if (password != confirm_password) {
    errors.push({ text: "La contraseña no coincide" });
  }
  if (password.lenght < 4) {
    errors.push({ text: "La contraseña debe tener al menos 4 caracteres" });
  }
  if (errors.lenght > 0) {
    res.render('/users/signup', { errors, name, email, password, confirm_password });
  } else {
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash('error_msg', 'El correo ingresado ya esta en uso');
      res.redirect('/users/signup');
    }
        const NewUser = await new User({ name, email, password });
        NewUser.password = await NewUser.encryptPassword(password);
        await NewUser.save();

        req.flash("sucesss_msg", "Estas registrado");
        res.redirect("/users/signin");
    }
});

router.get('/users/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
  
module.exports = router;