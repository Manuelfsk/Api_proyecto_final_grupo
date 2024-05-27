//CRUD tags
let tagsModel = {}
const mongoose = require("mongoose")

const Schema = mongoose.Schema
let tagsSchema = new Schema({
    codigo: String,
    nombre: String
})

const myModel = mongoose.model("tags", tagsSchema)





tagsModel.buscarCodigo = function (post, callback) {
    myModel.find({ codigo: post.codigo }, { codigo: 1, nombre: 1 }).then((respuesta) => {
        if (respuesta.length == 0) {
            return callback({ posicion: -1 })

        } else {
            return callback({ posicion: respuesta.length })

        }
    }).catch((error) => {
        console.log(error)
        return callback({ posicion: 0, state: false, mensaje: error })
    })
    // let posicion = tags.findIndex((item) => item.codigo == post.codigo)
    // return callback({ posicion: posicion })
}

//create == crear
tagsModel.crear = function (post, callback) {
    const instancia = new myModel
    instancia.codigo = post.codigo
    instancia.nombre = post.nombre

    instancia.save().then((respuesta) => {
        return callback({ state: true })

    }).catch((error) => {
        console.log(error)
        return callback({ posicion: 0, state: false, mensaje: error })
    })


    // tags.push({ codigo: post.codigo, nombre: post.nombre })
    // return callback({ state: true })

}

// read == listar todos los elementos creados
tagsModel.read = function (post, callback) {
    myModel.find({}, {}).then((respuesta) => {
        return callback({ state: true, data: respuesta })
    }).catch((error) => {
        console.log(error)
        return callback({ posicion: 0, state: false, mensaje: error })
    })
}

// readId == listar un solo elemento _id especifico
tagsModel.readId = function (post, callback) {
    myModel.find({_id:post._id}, {}).then((respuesta) => {
        return callback({ state: true, data: respuesta })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false, mensaje: error })
    })
}

//update == modificar
tagsModel.update = function (post, callback) {
    myModel.updateOne({ _id: post._id }, { nombre: post.nombre }).then((respuesta) => {
        console.log(respuesta)
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ posicion: 0, state: false, mensaje: error })
    })
}

//delete == eliminar
tagsModel.delete = function (post, callback) {
    myModel.deleteOne({ _id: post._id }).then((respuesta) => {
        console.log(respuesta)
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false, mensaje: error })
    })
}




module.exports.tagsModel = tagsModel