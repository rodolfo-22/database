//trabaja de la mano con los routers para detener al usuario si hay algo
//malo en la validacion de los campo. ej: deja campo vacio
const { response } = require('express')
const { validationResult } = require('express-validator')

const validation = (req, res = response, next) => {

    const errors = validationResult( req );
    if( !errors.isEmpty() ){
        return res.status(400).json({
            ok:false,
            errors:errors.mapped()
        });
    }


    next()
}
 

module.exports = {
    validation
}