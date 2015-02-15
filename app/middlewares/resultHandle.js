module.exports = function (req, res, next) {
    var responsefn = function (statusCode, message, callback) {
        console.log(">>>>", req.xhr);
        if (req.xhr) {
            res.status(statusCode);
            return res.json(message);
        }

        res.locals.message = message;
        if (callback && typeof callback == "function") {
            callback();
        }
    };

    res.ok = responsefn;
    res.reject = responsefn;

    next();
};