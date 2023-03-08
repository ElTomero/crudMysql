const response = (res, result) => {
    /* if (result.error) return next(result); */
    if (result.status !== undefined || !isNaN(parseInt(result.status))) res.status(result.status);
    if (isNaN(parseInt(result.status))) res.status(200);
    if (!result.status) res.status(200);
    return res.json(result);
}

module.exports = {
    response
}