const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/User');
const { generarJWT } = require('../helpers/jwtoken')

const crearUsuario = async (req, res = response) => {

    const {  email, password } = req.body;

    try {
        let usuario =  await Usuario.findOne({ email }); 
        if( usuario ) {
            return res.status(400).json({
                ok:false,
                msg: 'Un usuario existe con ese correo'
            })
        }

        usuario = new Usuario( req.body );

        //encriptar contraseña
        const salt = bcrypt.genSaltSync(  );
        usuario.password = bcrypt.hashSync( password, salt ); 
        //para guardar el usuario en db
        await usuario.save();

        //Generar token
        const token = await generarJWT( usuario.id, usuario.name )
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token,
            msg: 'Usuario almacenado exitosamente',
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error. Contactarse con el administrador del programa'
        })
    }

};


const loginUsuario = async (req, res= response ) => {
    
    const { email, password } = req.body;

    try {
        const usuario =  await Usuario.findOne({ email });
        if ( !usuario )  {
        return res.status(400).json({
            ok: false,
            msg:'no existe usuario registrado con ese email'
        });
        }
        //confirmar los pasword
        const validPassword = bcrypt.compareSync( password, usuario.password );
        if (!validPassword) {
            return res.status(400).json({
                ok:false,
                msg: 'Contraseña incorrecta'
            })
            
        };
        //Generar token
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token,
            msg: 'usuario con token generado',
        });
    
    }   catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'error en el login, contactar al administrador'
        })
    }

};


//revalidar token
const revalidarToken = async (req, res= response ) => {


    const { uid, name } = req.uid;

    //Generar token
    const token = await generarWJT( uid, name );


    res.json({
        ok:true,
        token
    })
};



module.exports = { 
    crearUsuario,
    loginUsuario,
    revalidarToken
}

//contra atlas
//aE0GO5LWkC2ICbDG