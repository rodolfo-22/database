const { response } = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = ( req, res = response,next ) => {

    //x-token en ell header
    const token = req.header('x-token');
    //validando si viene token, sino lo saco
    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }
    try {
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRECT_JWT_SEED
        );
        req.uid = uid;
        req.name = name;
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: 'Token no valido, validarJWT'
        })
    }


    next();
}

module.exports = {
    validarJWT
}