
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