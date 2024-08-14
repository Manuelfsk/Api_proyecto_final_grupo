//CRUD productos
let productosModel = {}
const mongoose = require("mongoose")

const Schema = mongoose.Schema
let productosSchema = new Schema({
    cod_cat: String,
    cod_prod: String,
    nombre: String,
    imagen:String,
    precio:Number,
    estado: Number
})

const myModel = mongoose.model("productos", productosSchema)





productosModel.buscarCodigo = function (post, callback) {
    myModel.find({ cod_prod: post.cod_prod }, { cod_prod: 1, nombre: 1, estado:1, cod_cat:1}).then((respuesta) => {
        if (respuesta.length == 0) {
            return callback({ posicion: -1 })

        } else {
            return callback({ posicion: respuesta.length })

        }
    }).catch((error) => {
        console.log(error)
        return callback({ posicion: 0, state: false, mensaje: error })
    })
    //codigo del ejercicio que no aplica en node, "ingnorar"
    // let posicion = productos.findIndex((item) => item.cod_prod == post.cod_prod)
    // return callback({ posicion: posicion })
}

//create == crear
productosModel.crear = function (post, callback) {
    const instancia = new myModel
    instancia.cod_cat = post.cod_cat
    instancia.cod_prod = post.cod_prod
    instancia.nombre = post.nombre
    if(post.imagen == ""){
        instancia.imagen = "http://18.218.88.92:3000/imagenes/default.png"
    }else{
        instancia.imagen=post.imagen
    }
    instancia.precio = post.precio
    instancia.estado = post.estado

    instancia.save().then((respuesta) => {
        return callback({ state: true })

    }).catch((error) => {
        console.log(error)
        return callback({ posicion: 0, state: false, mensaje: error })
    })


    // productos.push({ cod_prod: post.cod_prod, nombre: post.nombre })
    // return callback({ state: true })

}

// read == listar todos los elementos creados
productosModel.read = function (post, callback) {
    myModel.find({}, {}).then((respuesta) => {
        return callback({ state: true, data: respuesta })
    }).catch((error) => {
        console.log(error)
        return callback({ posicion: 0, state: false, mensaje: error })
    })
}

// readId == listar un solo elemento _id especifico
productosModel.readId = function (post, callback) {
    myModel.find({_id:post._id}, {}).then((respuesta) => {
        return callback({ state: true, data: respuesta })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false, mensaje: error })
    })
}

//update == modificar
productosModel.update = function (post, callback) {
    myModel.updateOne({ _id: post._id }, { 
        nombre: post.nombre, 
        estado: post.estado, 
        cod_cat: post.cod_cat, 
        imagen:post.imagen, 
        precio:post.precio
    }).then((respuesta) => {
        console.log(respuesta)
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ posicion: 0, state: false, mensaje: error })
    })
}

//delete == eliminar
productosModel.delete = function (post, callback) {
    myModel.deleteOne({ _id: post._id }).then((respuesta) => {
        console.log(respuesta)
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false, mensaje: error })
    })
}




module.exports.productosModel = productosModel