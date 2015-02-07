module.exports = function (req, res, next) {
    var responsefn = function (statusCode, message, callback) {
        if (req.xhr) {
            res.status(statusCode);
            return res.json(message);
        }

        res.locals.message = message;
        callback();
    };

    res.ok = responsefn;
    res.reject = responsefn;

    next();
};