const mongoose = require('mongoose');

const dbConnection = async() => {
    try{
        await mongoose.connect( process.env.DB_CONNECT);

        console.log('Base de datos conectada y en linea');

    }catch (error) {
        console.log(error);
        throw new Error('Error al iniciar  la base de datos');
    }
}


module.exports = {
    dbConnection
}