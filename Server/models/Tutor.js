const { Schema, model } = require('mongoose');

const TutorSchema = Schema ({

    name: {
        type: String,
        required: true
    },
    career: {
        type: String,
        required: true
    },
    teacher: {
        type: String
    },
    skill: {
        type: String,
        required: true
    },
    horary: {
        type: String,
        required: true
    },
     stars: {
        type: [{
            user: {
                type:String
            },
            value: {
                type:Number,
                default:4
            } 
        }]
    }, 
    comment:{
        default: [{}]
    },
    //para que el usuario se muestre al final de la consulta
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

//para que el id se muestre sin el guion bajo
TutorSchema.method('toJSON', function() {
    const { _v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Tutor', TutorSchema );

//para aagaregar comentario desdfe ela creacion del tutor, usando default::[]

/* if(TutorSchema.starts.contains(userId)) {
    return res.status(409);
}
TutorSchema.stars.push({
    user:userId,
    value:value
}) */
 