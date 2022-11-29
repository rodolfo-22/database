 //lleva todo el codigo del cluster tutorias, desde aqui gestionas acciones
const { response } = require('express');
const clusterTutorias = require('../models/clusterTutoria')

const getClusterTutorias = async (req, res = response) => {
    //utilizando funcion find para encontrar eventos
    //aqui es donde vas a filtrar para los tutores de cada materia
    const tutorias = await clusterTutorias.find()
                               .populate('user','name');
    //
    res.json({
        ok: true,
        tutorias
    })
};

const crearClusterTutorias = async (req, res = response) => {

    //verificar que tenga el evento
    //console.log( req.body );
    const clusterTutoria = new clusterTutorias( req.body );

    try {
        //para traer el id del usuario que agregara el evento
        clusterTutoria.user = req.uid;       
        //para guardar evento
        const clusterTutoriaGuardado = await clusterTutoria.save();

        //feeback usuario
        res.json({
            ok: true,
            evento: clusterTutoriaGuardado
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al guardar el grupo de tutorias, hable con el administrador '
        });
    }
};

const actualizarClusterTutorias = async (req, res = response) => {
    //para obtener el id del tutor a modificar
    const clusterTutoriaId = req.params.id;
    //lo utilizo para extraer id del usu que creo el tutor
    const uid = req.uid;

    try {
        //para encontrar el tutor por el id
        const clusterTutoria = await clusterTutorias.findById( clusterTutoriaId );
        //cerificar si el tutor que queres mofdificar esta en la base de datos
        if ( !clusterTutoria ) {
            res.status(404).json({
                ok: false,
                msg: "Tutor no existe en la bse de datos"
            })
        }
        //verifixo que el usu que quiere modificar es el que lo creo
        if ( clusterTutoria.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: "No esta autoriazado para modificar"
            })
        }

        const nuevoclusterTutorias = {
            ...req.body,
            user: uid
        }
        //para que muestre el dato antenrior en postman
        const clusterTutoriaActualizado = await clusterTutorias.findByIdAndUpdate( clusterTutoriaId, nuevoclusterTutorias );
        //const tutorActualizado = await Tutor.findByIdAndUpdate( tutorId, nuevoTutor,  { new: true } );

        res.json({
            ok:true,
            tutor: cluster_de_tutorias_actualizodo
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const eliminarClusterTutorias = async (req, res = response) => {

       //para obtener el id del tutor a modificar
    const clusterTutoriaId = req.params.id;
    //lo utilizo para extraer id del usu que creo el tutor
    const uid = req.uid;

    try {
        //para encontrar el tutor por el id
        const clusterTutoria = await clusterTutorias.findById( clusterTutoriaId );
        //cerificar si el tutor que queres mofdificar esta en la base de datos
        if ( !clusterTutoria ) {
            res.status(404).json({
                ok: false,
                msg: "Tutor no existe en la bse de datos"
            })
        }
        //verifixo que el usu que quiere modificar es él que lo creo
        if ( clusterTutoria.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: "No esta autoriazado para modificar"
            })
        }

        //para que muestre el dato antenrior en postman
        await clusterTutorias.findByIdAndDelete( tutorId );

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
    getClusterTutorias,
    crearClusterTutorias,
    actualizarClusterTutorias,
    eliminarClusterTutorias
} 