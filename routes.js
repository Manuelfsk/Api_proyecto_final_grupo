// control de acceso solo para administradores 
let SoloAdministradores = function(request, response, next){
    let rol = request.session.rol
    if(rol == 1){
        next()
    }else{
        response.json({permisos: true, state:false, mensaje:"Esta API es solo para ADMINISTRADORES"})
    }
}
// solo usuarios logeados 
let SoloLogeados = function(request, response, next){
    if(request.session._id != undefined){
        next()
    }else{
        response.json({permisos: true, state:false, mensaje:"Debe iniciar session "})
    }
}





// const { request, response } = require("express")
// const session = require("express-session")

//crud Tags 
let tagsController = require("./API/controladores/tagsController.js").tagsController

//create == crear elemento
app.post("/tags/create", function (request, response) {
    tagsController.create(request, response)
})
// read == listar todos los elementos
app.get("/tags/read", function (request, response) {
    tagsController.read(request, response)
})
// readId == lista un solo elemento por ID
app.get("/tags/readId", function (request, response) {
    tagsController.readId(request, response)
})
// update == modificar elementos 
app.put("/tags/update", function (request, response) {
    tagsController.update(request, response)
})
// delete  == eliminar elementos
app.delete("/tags/delete", function (request, response) {
    tagsController.delete(request, response)
})

//crud usuarios 
let usuariosController = require("./API/controladores/usuariosController.js").usuariosController

//create == crear elemento
app.post("/usuarios/create", SoloAdministradores, function (request, response) {
    usuariosController.create(request, response)
})
// read == listar todos los elementos
app.get("/usuarios/read", function (request, response) {
    usuariosController.read(request, response)
})
// readId == lista un solo elemento por ID
app.get("/usuarios/readId", SoloAdministradores, function (request, response) {
    usuariosController.readId(request, response)
})
// update == modificar elementos 
app.put("/usuarios/update", SoloAdministradores, function (request, response) {
    usuariosController.update(request, response)
})
// delete  == eliminar elementos
app.delete("/usuarios/delete",  SoloAdministradores, function (request, response) {
    usuariosController.delete(request, response)
})

//crear LOGIN
app.post("/usuarios/login", function (request, response) {
    usuariosController.login(request, response)
})
// activar usuarios
app.post("/usuarios/activar", function (request, response) {
    usuariosController.activar(request, response)
})
// activar roles y nombre de usuario
app.post("/usuarios/state", function (request, response){
    response.json(request.session)
})
//cerrar session 
app.post("/usuarios/logout",SoloLogeados, function (request, response) {
    request.session.destroy()
    response.json({state:true, mensaje:"session Cerrada"})
})
// perfil == lista un solo elemento por ID
app.post("/usuarios/perfil",SoloLogeados,  function (request, response) {
    usuariosController.perfil(request, response)
})


//crear productos
//crud productos 
let productosController = require("./API/controladores/productosController.js").productosController

//create == crear elemento
app.post("/productos/create",SoloLogeados, SoloAdministradores, function (request, response) {
    productosController.create(request, response)
})
// read == listar todos los elementos
app.post("/productos/read", function (request, response) {
    productosController.read(request, response)
})
// readId == lista un solo elemento por ID
app.post("/productos/readId", SoloAdministradores, function (request, response) {
    productosController.readId(request, response)
})
// update == modificar elementos 
app.put("/productos/update", SoloAdministradores, function (request, response) {
    productosController.update(request, response)
})
// delete  == eliminar elementos
app.post("/productos/delete", SoloAdministradores, function (request, response) {
    productosController.delete(request, response)
}) 
//crear categorias
//crud categorias 
let categoriasController = require("./API/controladores/categoriasController.js").categoriasController

//create == crear elemento
app.post("/categorias/create",SoloLogeados, SoloAdministradores, function (request, response) {
    categoriasController.create(request, response)
})
// read == listar todos los elementos
app.post("/categorias/read",  function (request, response) {
    categoriasController.read(request, response)
})
// readId == lista un solo elemento por ID
app.post("/categorias/readId", SoloAdministradores, function (request, response) {
    categoriasController.readId(request, response)
})
// update == modificar elementos 
app.put("/categorias/update", SoloAdministradores, function (request, response) {
    categoriasController.update(request, response)
})
// delete  == eliminar elementos
app.post("/categorias/delete", SoloAdministradores, function (request, response) {
    categoriasController.delete(request, response)
}) 