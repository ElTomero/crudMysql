const router = require("express").Router();
const { Router } = require("express");
const User = require("../models/User.js");
const { response } = require("../utils");
//const { proppatch } = require("./book.js");

router.post("/registration", async(req, res ) => {
    const {name, surname, email, password} = req.body;

    try {
        const token = await User.registerUser(name, surname, email, password);
        if (token) {
            return response(res, (token))
        } else {
            return response(res, {message: 'impossibile registrare utente'}, 400);
        } 
    } catch (error) {
        console.error(error);
        return response(res, { message: 'Si è verificato un errore durante la registrazione' }, 500);
    } 
});

router.post("/login", async(req, res) => {
    const {email, password} = req.body;

    try {
      const token = await User.login(email_id, password);
      if (token) {
          return response(res, ({token}))
      } else {
          return response(res, {message: 'login invalido'}, 400);
      }
    } catch (error) {
        console.error(error);
        return response(res, {message: 'Si è verificato un errore durante il login'}, 500);
    }
});

module.exports = router