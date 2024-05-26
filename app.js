const express = require("express")
global.app = express()
global.config = require("./config.js").config
let bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/" + config.bd).then(() => console.log("conected!")
).catch((error) => {
    console.log(error)
    return callback({ posicion: 0, state: false, mensaje: error })
})



global.tags = []



app.listen(config.puerto, function () {
    console.log("El servidor esta funcionando por el puerto " + config.puerto)
})


require("./routes.js")