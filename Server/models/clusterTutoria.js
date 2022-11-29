const { Schema, model } = require('mongoose');

const clusterTutoriasSchema = Schema ({

    name: {
        type: String,
        required: true
    },
    alums: [{
        type: Schema.Types.ObjectId,
        ref:"Usuario",
        default:[]}
    ]
});

//para que el id se muestre sin el guion bajo
clusterTutoriasSchema.method('toJSON', function() {
    const { _v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('clusterTutorias', clusterTutoriasSchema ); 