//CRUD categorias
let categoriasModel = require("../../API/modelos/categoriasModel.js").categoriasModel
let categoriasController = {}


//create == crear
categoriasController.create = function (request, response) {

    let post = {
        cod_cat: request.body.cod_cat,
        nombre: request.body.nombre,
        estado: request.body.estado
    }

    if (post.cod_cat == undefined || post.cod_cat == null || post.cod_cat == "") {
        response.json({ state: false, mensaje: "el campo cod_cat es obligatorio ", campo: "cod_cat" })
        return false
    }
    if (post.cod_cat.length >= 16) {
        response.json({ state: false, mensaje: "El cod_cat es de maximo 15 caracteres." })
    }

    if (post.nombre == undefined || post.nombre == null || post.nombre == "") {
        response.json({ state: false, mensaje: "el campo nombre es obligatorio ", campo: "nombre" })
        return false
    }

    if (post.nombre.length >= 51) {
        response.json({ state: false, mensaje: "El nombre es de maximo 50 caracteres." })
    }
    if (post.nombre.length <= 3) {
        response.json({ state: false, mensaje: "El nombre es de minimo 4 caracteres" })
    }
    if (post.estado == undefined || post.estado == null || post.estado == "") {
        response.json({ state: false, mensaje: "el campo estado es obligatorio ", campo: "estado" })
        return false
    }

    //solo true o false

    // if (post.estado.toLocaleLowerCase() == "true") {
    //     post.estado = true
    // }
    // if (post.estado.toString().toLocaleLowerCase() == "false") {
    //     post.estado = false
    // }

    // if (typeof post.estado != "boolean") {
    //     response.json({ state: false, mensaje: "el campo estado debe ser true o false", campo: "estado" })
    //     return false
    // }


    categoriasModel.buscarCodigo(post, function (respuesta) {
        if (respuesta.posicion == -1) {
            categoriasModel.crear(post, function (respuesta) {
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
categoriasController.read = function (request, response) {
    categoriasModel.read(null, function (respuesta) {
        response.json({ respuesta })
    })
}

// readId == listar un solo elemento _id especifico
categoriasController.readId = function (request, response) {
    let post = {
        _id: request.body._id
    }
    if (post._id == undefined || post._id == null || post._id == "") {
        response.json({ state: false, mensaje: "el campo _id es obligatorio ", campo: "_id" })
        return false
    }
    categoriasModel.readId(post, function (respuesta) {
        response.json({ respuesta })
    })
}

//update == modificar 
categoriasController.update = function (request, response) {
    let post = {
        _id: request.body._id,
        cod_cat: request.body.cod_cat,
        nombre: request.body.nombre,
        estado: request.body.estado
    }

    if (post._id == undefined || post._id == null || post._id == "") {
        response.json({ state: false, mensaje: "el campo ID es obligatorio ", campo: "_id" })
        return false
    }

    if (post.nombre == undefined || post.nombre == null || post.nombre == "") {
        response.json({ state: false, mensaje: "el campo nombre es obligatorio ", campo: "nombre" })
        return false
    }

    if (post.nombre.length >= 51) {
        response.json({ state: false, mensaje: "El nombre es de maximo 50 caracteres." })
    }
    if (post.nombre.length <= 3) {
        response.json({ state: false, mensaje: "El nombre es de minimo 4 caracteres" })
    }
    if (post.estado == undefined || post.estado == null || post.estado == "") {
        response.json({ state: false, mensaje: "el campo estado es obligatorio ", campo: "estado" })
        return false
    }

    //solo true o false
    if (post.estado.toLocaleLowerCase() == "true") {
        post.estado = true

    }
    if (post.estado.toString().toLocaleLowerCase() == "false") {
        post.estado = false

    }

    categoriasModel.update(post, function (respuesta) {
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "Se actualizo el elemento correctamente" })
        } else {
            response.json({ state: false, mensaje: "Se presentó un problema al actualizar el elemento", error: respuesta })
        }
    })
}

//delete == eliminar
categoriasController.delete = function (request, response) {
    let post = {
        _id: request.body._id
    }

    if (post._id == undefined || post._id == null || post._id == "") {
        response.json({ state: false, mensaje: "el campo _id es obligatorio ", campo: "_id" })
        return false
    }
    categoriasModel.delete(post, function (respuesta) {
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "Se elimino correctamente el elemeneto" })
        } else {
            response.json({ state: false, mensaje: "Se presento un problema al eliminar el elemento", error: respuesta })
        }
    })

}



module.exports.categoriasController = categoriasController