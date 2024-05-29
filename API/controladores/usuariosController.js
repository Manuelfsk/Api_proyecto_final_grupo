//CRUD usuarios
let usuariosModel = require("../../API/modelos/usuariosModel.js").usuariosModel
let usuariosController = {}


//create == crear
usuariosController.create = function (request, response) {

    let post = {
        email: request.body.email,
        password: request.body.password,
        nombre: request.body.nombre,
    }

    if (post.email == undefined || post.email == null || post.email == "") {
        response.json({ state: false, mensaje: "el campo email es obligatorio ", campo: "email" })
        return false
    }
    if (post.password == undefined || post.password == null || post.password == "") {
        response.json({ state: false, mensaje: "el campo password es obligatorio ", campo: "password" })
        return false
    }

    if (post.nombre == undefined || post.nombre == null || post.nombre == "") {
        response.json({ state: false, mensaje: "el campo nombre es obligatorio ", campo: "nombre" })
        return false
    }

    usuariosModel.buscarCodigo(post, function (respuesta) {
        if (respuesta.posicion == -1) {
            usuariosModel.crear(post, function (respuesta) {
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
usuariosController.read = function (request, response) {
    usuariosModel.read(null, function (respuesta) {
        response.json({ respuesta })
    })
}

// readId == listar un solo elemento _id especifico
usuariosController.readId = function (request, response) {
    let post = {
        _id: request.body._id
    }
    if (post._id == undefined || post._id == null || post._id == "") {
        response.json({ state: false, mensaje: "el campo _id es obligatorio ", campo: "_id" })
        return false
    }
    usuariosModel.readId(post, function (respuesta) {
        response.json({ respuesta })
    })
}

//update == modificar 
usuariosController.update = function (request, response) {
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

    usuariosModel.update(post, function (respuesta) {
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "Se actualizo el elemento correctamente" })
        } else {
            response.json({ state: false, mensaje: "Se presentó un problema al actualizar el elemento", error: respuesta })
        }
    })
}

//delete == eliminar
usuariosController.delete = function (request, response) {
    let post = {
        _id: request.body._id
    }

    if (post._id == undefined || post._id == null || post._id == "") {
        response.json({ state: false, mensaje: "el campo _id es obligatorio ", campo: "_id" })
        return false
    }
    usuariosModel.delete(post, function (respuesta) {
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: "Se elimino correctamente el elemeneto" })
        } else {
            response.json({ state: false, mensaje: "Se presento un problema al eliminar el elemento", error: respuesta })
        }
    })

}

//crear login
usuariosController.login = function (request, response) {
    let post = {
        email: request.body.email,
        password: request.body.password
    }
    // credenciales de validacion if(){}.
    if (post.email == undefined || post.email == null || post.email == "") {
        response.json({ state: false, mensaje: "el campo email es obligatorio ", campo: "email" })
        return false
    }
    if (post.password == undefined || post.password == null || post.password == "") {
        response.json({ state: false, mensaje: "el campo password es obligatorio ", campo: "password" })
        return false
    }
    usuariosModel.login(post, function (respuesta) {
        console.log(respuesta)
        if (respuesta.state == true) {
            if (respuesta.data.length == 0) {
                response.json({ state: false, mensaje: "error en las credenciales de acceso" })
            } else {
                response.json({ state: true, mensaje: "Bienvenido " + respuesta.data[0].nombre })
            }
        } else {
            response.json({ state: false, mensaje: "error en las credenciales de acceso" })
        }
    })
}


module.exports.usuariosController = usuariosController