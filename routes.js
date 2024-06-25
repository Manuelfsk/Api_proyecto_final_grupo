
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
app.post("/usuarios/create", function (request, response) {
    usuariosController.create(request, response)
})
// read == listar todos los elementos
app.get("/usuarios/read", function (request, response) {
    usuariosController.read(request, response)
})
// readId == lista un solo elemento por ID
app.get("/usuarios/readId", function (request, response) {
    usuariosController.readId(request, response)
})
// update == modificar elementos 
app.put("/usuarios/update", function (request, response) {
    usuariosController.update(request, response)
})
// delete  == eliminar elementos
app.delete("/usuarios/delete", function (request, response) {
    usuariosController.delete(request, response)
})

//crear LOGIN
app.post("/usuarios/login", function (request, response) {
    usuariosController.login(request, response)
})
// activar usuarios
app.post("/usuarios/activar", function (request, response) {
    usuariosController.uactivar(request, response)
})



//crear productos
//crud productos 
let productosController = require("./API/controladores/productosController.js").productosController

//create == crear elemento
app.post("/productos/create", function (request, response) {
    productosController.create(request, response)
})
// read == listar todos los elementos
app.post("/productos/read", function (request, response) {
    productosController.read(request, response)
})
// readId == lista un solo elemento por ID
app.post("/productos/readId", function (request, response) {
    productosController.readId(request, response)
})
// update == modificar elementos 
app.put("/productos/update", function (request, response) {
    productosController.update(request, response)
})
// delete  == eliminar elementos
app.post("/productos/delete", function (request, response) {
    productosController.delete(request, response)
}) 
//crear categorias
//crud categorias 
let categoriasController = require("./API/controladores/categoriasController.js").categoriasController

//create == crear elemento
app.post("/categorias/create", function (request, response) {
    categoriasController.create(request, response)
})
// read == listar todos los elementos
app.post("/categorias/read", function (request, response) {
    categoriasController.read(request, response)
})
// readId == lista un solo elemento por ID
app.post("/categorias/readId", function (request, response) {
    categoriasController.readId(request, response)
})
// update == modificar elementos 
app.put("/categorias/update", function (request, response) {
    categoriasController.update(request, response)
})
// delete  == eliminar elementos
app.post("/categorias/delete", function (request, response) {
    categoriasController.delete(request, response)
}) 