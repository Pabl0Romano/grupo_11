const db = require("../database/models");


function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;
//     let emailInCookie = req.cookies.userEmail;
//     db.Users.findAll()
//         .then(User => {
//             let usuario = User.find(user => user.email = emailInCookie)
//             if(emailInCookie != undefined){
//             let userFromCookie = usuario.email;
//             console.log(userFromCookie);
            
//             if (userFromCookie) {
//         req.session.usuarioLogueado = userFromCookie;
//     }
//     }
    
// })
if (req.session && req.session.usuarioLogueado) {
    res.locals.isLogged = true;
    res.locals.user = req.session.usuarioLogueado
}

    next();
}

module.exports = userLoggedMiddleware;