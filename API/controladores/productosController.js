//CRUD productos
let productosModel = require("../../API/modelos/productosModel.js").productosModel
let productosController = {}


//create == crear
productosController.create = function (request, response) {

    let post = {
        cod_cat: request.body.cod_cat,
        cod_prod: request.body.cod_prod,
        nombre: request.body.nombre,
        estado: request.body.estado
    }

    if (post.cod_cat == undefined || post.cod_cat == null || post.cod_cat == "") {
        response.json({ state: false, mensaje: "el campo cod_cat es obligatorio ", campo: "cod_cat" })
        return false
    }
    if (post.cod_prod == undefined || post.cod_prod == null || post.cod_prod == "") {
        response.json({ state: false, mensaje: "el campo cod_prod es obligatorio ", campo: "cod_prod" })
        return false
    }
    if (post.cod_prod.length >= 16) {
        response.json({ state: false, mensaje: "El cod_prod es de maximo 15 caracteres." })
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


    productosModel.buscarCodigo(post, function (respuesta) {
        if (respuesta.posicion == -1) {
            productosModel.crear(post, function (respuesta) {
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
productosController.read = function (request, response) {
    productosModel.read(null, function (respuesta) {
        response.json({ respuesta })
    })
}

// readId == listar un solo elemento _id especifico
productosController.readId = function (request, response) {
    let post = {
        _id: request.body._id
    }
    if (post._id == undefined || post._id == null || post._id == "") {
        response.json({ state: false, mensaje: "el campo _id es obligatorio ", campo: "_id" })
        return false
    }
    productosModel.readId(post, function (respuesta) {
        response.json({ respuesta })
    })
}

//update == modificar 
productosController.update = function (request, response) {
    let post = {
        _id: request.body._id,
        cod_prod: request.body.cod_prod,
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
    // if (post.estado.toLocaleLowerCase() == "true") {
    //     post.estado = true

    // }
    // if (post.estado.toString().toLocaleLowerCase() == "false") {
    //     post.estado = false

    // }

    productosModel.update(post, function (respuesta) {
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "Se actualizo el elemento correctamente" })
        } else {
            response.json({ state: false, mensaje: "Se presentó un problema al actualizar el elemento", error: respuesta })
        }
    })
}

//delete == eliminar
productosController.delete = function (request, response) {
    let post = {
        _id: request.body._id
    }

    if (post._id == undefined || post._id == null || post._id == "") {
        response.json({ state: false, mensaje: "el campo _id es obligatorio ", campo: "_id" })
        return false
    }
    productosModel.delete(post, function (respuesta) {
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "Se elimino correctamente el elemeneto" })
        } else {
            response.json({ state: false, mensaje: "Se presento un problema al eliminar el elemento", error: respuesta })
        }
    })

}



module.exports.productosController = productosController