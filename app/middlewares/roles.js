function requireRole(role) {
    var isRole = function (user, role) {
        
        var _role = user.role;

        if (typeof role == "object") {
            return role.indexOf(_role) != -1;
        }

        return _role === role;
    };

    return function(req, res, next) {
        req.url = req.url || '/';

        if (req.session.user && isRole(req.session.user, role)) {
            console.log(" >>> access controll pass ");
            next();
        } else {
            if (req.xhr) {
                res.status(403);
                return res.json({
                    error: 'please log in!',
                    redirect: encodeURIComponent(req.url)
                });
            } 

            res.redirect('/login?redirect=' + encodeURIComponent(req.url));
        }
    }
}

module.exports = requireRole;