const { Router } = require('express');
const { check } = require('express-validator');
const { validation } = require('../middleware/Validation')
const { validarJWT } = require('../middleware/validationJWT');
const { getTutor,crearTutor,actualizarTutor,eliminarTutor } = require('../controllers/tutors')

const router = Router();

//para qeu todas las peticiones tengan que pasar por validar token
router.use( validarJWT );

router.get('/get', getTutor ); 

router.post('/create',
    [
        check('name', 'Es obligatorio el nombre del tutor').not().isEmpty(),
        check('career', 'Es obligatorio la carrera a la que pertenece el tutor').not().isEmpty(),
        check('skill', 'Es obligatorio escribir reseña del tutor').not().isEmpty(),
        check('horary', 'Es obligatorio mostrar el horario disponible del tutor').not().isEmpty(),
        validation
    ], 
    crearTutor ); 

router.put('/:id',
    [
        check('name', 'Es obligatorio el nombre del tutor').not().isEmpty(),
        check('career', 'Es obligatorio la carrera a la que pertenece el tutor').not().isEmpty(),
        check('skill', 'Es obligatorio escribir reseña del tutor').not().isEmpty(),
        check('horary', 'Es obligatorio mostrar el horario disponible del tutor').not().isEmpty(),
        validation
    ], 
    actualizarTutor ); 

router.delete('/:id', eliminarTutor ); 


module.exports = router;