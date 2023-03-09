const router = require("express").Router();
const Publisher = require("../models/Publisher.js");
const { response } = require("../utils");

router.get("/", async (req, res) => {
    const result = await Publisher.getAll();
    return response(res, result);
});


module.exports = router;