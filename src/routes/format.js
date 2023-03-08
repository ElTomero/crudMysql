const router = require("express").Router();
const Format = require("../models/Format.js");
const { response } = require("../utils");

router.get("/", async (req, res) => {
    const result = await Format.getAll();
    return response(res, result);
});


module.exports = router;