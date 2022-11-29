//lleva todo el codigo de los turores, desde aqui gestionas acciones
const { response } = require('express');
const Tutor = require('../models/Tutor')

const getTutor = async (req, res = response) => {
    //utilizando funcion find para encontrar eventos
    //aqui es donde vas a filtrar para los tutores de cada materia
    const tutors = await Tutor.find()
                               .populate('user','name');
    //
    res.json({
        ok: true,
        tutors
    })
};

const crearTutor = async (req, res = response) => {

    //verificar que tenga el evento
    //console.log( req.body );
    const tutor = new Tutor( req.body );

    try {
        //para traer el id del usuario que agregara el evento
        tutor.user = req.uid;       
        //para guardar evento
        const tutorGuardado = await tutor.save();

        //feeback usuario
        res.json({
            ok: true,
            evento: tutorGuardado
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al guardar usuario, hable con el administrador '
        });
    }
};

const actualizarTutor = async (req, res = response) => {
    //para obtener el id del tutor a modificar
    const tutorId = req.params.id;
    //lo utilizo para extraer id del usu que creo el tutor
    const uid = req.uid;

    try {
        //para encontrar el tutor por el id
        const tutor = await Tutor.findById( tutorId );
        //cerificar si el tutor que queres mofdificar esta en la base de datos
        if ( !tutor ) {
            res.status(404).json({
                ok: false,
                msg: "Tutor no existe en la bse de datos"
            })
        }
        //verifixo que el usu que quiere modificar es el que lo creo
        if ( tutor.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: "No esta autoriazado para modificar"
            })
        }

        const nuevoTutor = {
            ...req.body,
            user: uid
        }
        //para que muestre el dato antenrior en postman
        const tutorActualizado = await Tutor.findByIdAndUpdate( tutorId, nuevoTutor );
        //const tutorActualizado = await Tutor.findByIdAndUpdate( tutorId, nuevoTutor,  { new: true } );

        res.json({
            ok:true,
            tutor: tutorActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const eliminarTutor = async (req, res = response) => {

       //para obtener el id del tutor a modificar
    const tutorId = req.params.id;
    //lo utilizo para extraer id del usu que creo el tutor
    const uid = req.uid;

    try {
        //para encontrar el tutor por el id
        const tutor = await Tutor.findById( tutorId );
        //cerificar si el tutor que queres mofdificar esta en la base de datos
        if ( !tutor ) {
            res.status(404).json({
                ok: false,
                msg: "Tutor no existe en la bse de datos"
            })
        }
        //verifixo que el usu que quiere modificar es él que lo creo
        if ( tutor.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: "No esta autoriazado para modificar"
            })
        }

        //para que muestre el dato antenrior en postman
        await Tutor.findByIdAndDelete( tutorId );

        res.json({
            ok:true,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getTutor,
    crearTutor,
    actualizarTutor,
    eliminarTutor
}