const { Router } = require('express');
const { check } = require('express-validator');
const { validation } = require('../middleware/Validation')
const { validarJWT } = require('../middleware/validationJWT');
const { getClusterTutorias,crearClusterTutorias,actualizarClusterTutorias,eliminarClusterTutorias } = require('../controllers/clusterTutorias')

const router = Router();

//para qeu todas las peticiones tengan que pasar por validar token
router.use( validarJWT );

router.get('/get', getClusterTutorias ); 

router.post('/create',
    [
        check('name', 'Es obligatorio el nombre de la Materia').not().isEmpty(),
        validation
    ], 
    crearClusterTutorias ); 

router.put('/:id',
    [
        check('name', 'Es obligatorio el nombre la Materia').not().isEmpty(),
        validation
    ], 
    actualizarClusterTutorias ); 

router.delete('/:id', eliminarClusterTutorias ); 


module.exports = router; 