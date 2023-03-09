const router = require("express").Router();
const Language = require("../models/Language.js");
const { response } = require("../utils");

router.get("/", async (req, res) => {
    const result = await Language.getAll();
    return response(res, result);
});


module.exports = router;