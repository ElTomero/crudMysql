const router = require("express").Router();
const User = require("../models/User.js");
const { response } = require("../utils");
const { proppatch } = require("./book.js");

router.post("/registration", async(req, res ) => {
    const {name, surname, email, password, role} = req.body;

    try {
        const token = await User.registerUser(name, surname, email, password, role);
        if (token) {
            return response(res, ({token}))
        } else {
            return response(res, {message: 'impossibile registrare utente'}, 400);
        } 
    } catch (error) {
        console.error(error);
        return response(res, { message: 'Si è verificato un errore durante la registrazione' }, 500);
    }
});

