let tagsController = require("./API/controladores/tagsController.js").tagsController


app.post("/tags/create", function (request, response) {
    tagsController.create(request, response)
})

app.get("/tags/read", function (request, response) {
    tagsController.read(request, response)
})

app.get("/tags/readId", function (request, response) {
    tagsController.readId(request, response)
})

app.put("/tags/update", function (request, response) {
    tagsController.update(request, response)
})

app.delete("/tags/delete", function (request, response) {
    tagsController.delete(request, response)
})