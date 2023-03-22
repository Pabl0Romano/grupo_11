function guestMiddleware(req, res, next) {
    if (req.session.usuarioLogueado) {
        return res.redirect('/user/profile');
    }
    next();
}

module.exports = guestMiddleware;