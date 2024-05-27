//CRUD usuarios
let usuariosModel = {}
const mongoose = require("mongoose")

const Schema = mongoose.Schema
let usuariosSchema = new Schema({
    email: String,
    password: String,
    nombre: String
})

const myModel = mongoose.model("usuarios", usuariosSchema)

usuariosModel.buscarCodigo = function (post, callback) {
    myModel.find({ email: post.email }, { email: 1, nombre: 1 }).then((respuesta) => {
        if (respuesta.length == 0) {
            return callback({ posicion: -1 })

        } else {
            return callback({ posicion: respuesta.length })

        }
    }).catch((error) => {
        console.log(error)
        return callback({ posicion: 0, state: false, mensaje: error })
    })
    // let posicion = usuarios.findIndex((item) => item.codigo == post.codigo)
    // return callback({ posicion: posicion })
}

//create == crear
usuariosModel.crear = function (post, callback) {
    const instancia = new myModel
    instancia.email = post.email
    instancia.password = post.password
    instancia.nombre = post.nombre

    instancia.save().then((respuesta) => {
        return callback({ state: true })

    }).catch((error) => {
        console.log(error)
        return callback({ posicion: 0, state: false, mensaje: error })
    })

    // usuarios.push({ codigo: post.codigo, nombre: post.nombre })
    // return callback({ state: true })
}

// read == listar todos los elementos creados
usuariosModel.read = function (post, callback) {
    myModel.find({}, {password:0}).then((respuesta) => {
        return callback({ state: true, data: respuesta })
    }).catch((error) => {
        console.log(error)
        return callback({ posicion: 0, state: false, mensaje: error })
    })
}

// readId == listar un solo elemento _id especifico
usuariosModel.readId = function (post, callback) {
    myModel.find({_id:post._id}, {password:0}).then((respuesta) => {
        return callback({ state: true, data: respuesta })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false, mensaje: error })
    })
}

//update == modificar
usuariosModel.update = function (post, callback) {
    myModel.updateOne({ _id: post._id }, { nombre: post.nombre }).then((respuesta) => {
        console.log(respuesta)
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ posicion: 0, state: false, mensaje: error })
    })
}

//delete == eliminar
usuariosModel.delete = function (post, callback) {
    myModel.deleteOne({ _id: post._id }).then((respuesta) => {
        console.log(respuesta)
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false, mensaje: error })
    })
}




module.exports.usuariosModel = usuariosModel