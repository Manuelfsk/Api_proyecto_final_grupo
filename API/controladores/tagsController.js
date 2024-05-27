//CRUD tags
let tagsModel = require("../../API/modelos/tagsModel.js").tagsModel
let tagsController = {}


//create == crear
tagsController.create = function (request, response) {

    let post = {
        codigo: request.body.codigo,
        nombre: request.body.nombre,
    }

    if (post.codigo == undefined || post.codigo == null || post.codigo == "") {
        response.json({ state: false, mensaje: "el campo codigo es obligatorio ", campo: "codigo" })
        return false
    }

    if (post.nombre == undefined || post.nombre == null || post.nombre == "") {
        response.json({ state: false, mensaje: "el campo nombre es obligatorio ", campo: "nombre" })
        return false
    }

    tagsModel.buscarCodigo(post, function (respuesta) {
        if (respuesta.posicion == -1) {
            tagsModel.crear(post, function (respuesta) {
                if (respuesta.state == true) {
                    console.log(respuesta.posicion)
                    response.json({ state: true, mensaje: " El elemento ha sido creado correctamente" })
                    return false
                } else {
                    response.json({ state: false, mensaje: "error al guardar elemento" })
                    return false
                }
            })
        } else {
            response.json({ state: false, mensaje: "El elemento ya existe" })
            console.log(respuesta)
            return false
        }
    })
}

// read == listar todos los elementos creados
tagsController.read = function (request, response) {
    tagsModel.read(null, function (respuesta) {
        response.json({ respuesta })
    })
}

// readId == listar un solo elemento _id especifico
tagsController.readId = function (request, response) {
    let post = {
        _id: request.body._id
    }
    if (post._id == undefined || post._id == null || post._id == "") {
        response.json({ state: false, mensaje: "el campo _id es obligatorio ", campo: "_id" })
        return false
    }
    tagsModel.readId(post, function (respuesta) {
        response.json({ respuesta })
    })
}

//update == modificar 
tagsController.update = function (request, response) {
    let post = {
        _id: request.body._id,
        codigo: request.body.codigo,
        nombre: request.body.nombre
    }

    if (post._id == undefined || post._id == null || post._id == "") {
        response.json({ state: false, mensaje: "el campo codigo es obligatorio ", campo: "_id" })
        return false
    }

    if (post.nombre == undefined || post.nombre == null || post.nombre == "") {
        response.json({ state: false, mensaje: "el campo nombre es obligatorio ", campo: "nombre" })
        return false
    }

    tagsModel.update(post, function (respuesta) {
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "Se actualizo el elemento correctamente" })
        } else {
            response.json({ state: false, mensaje: "Se presentó un problema al actualizar el elemento", error: respuesta })
        }
    })
}

//delete == eliminar
tagsController.delete = function (request, response) {
    let post = {
        _id: request.body._id
    }

    if (post._id == undefined || post._id == null || post._id == "") {
        response.json({ state: false, mensaje: "el campo _id es obligatorio ", campo: "_id" })
        return false
    }
    tagsModel.delete(post, function (respuesta) {
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "Se elimino correctamente el elemeneto" })
        } else {
            response.json({ state: false, mensaje: "Se presento un problema al eliminar el elemento", error: respuesta })
        }
    })

}



module.exports.tagsController = tagsController