const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');


//crear el servidor de express
const app = express();


//base de datos
dbConnection();


//cors
app.use(cors());


//directorio
app.use( express.static('public') );

//lectura del body
app.use( express.json());


//rutas
app.use('/api/auth', require('./routes/authRoute') );
app.use('/api/tutors', require('./routes/tutorsRoute'))
app.use('/api/cluster', require('./routes/clusterRoute'))


//escucahr peticiones
app.listen( process.env.PORT,() => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
} );