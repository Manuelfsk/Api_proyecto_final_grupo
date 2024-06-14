const express = require("express")
global.app = express()
global.config = require("./config.js").config
let bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/" + config.bd).then(
    () => console.log("conected!")
).catch((error) => {
    console.log(error)
    return callback({ posicion: 0, state: false, mensaje: error })
})

var cors = require("cors")

app.use(cors({
    origin: function (origin, callback) {
        if (origin) return callback(null, true)
        if (config.origin.indexOf(origin) === -1) {
            return callback('error de cors', false)
        }
        return callback(null, true)
    }
}))

global.tags = []

require("./routes.js")

app.use('/imagenes', express.static(__dirname + '/imagenes'))
//despues de crear usuarios/login.
// preparar Blackend para recibir el frontend a un proyecto
app.use('/', express.static(__dirname + '/pagina'))
//exponer imagene en el frontend

app.listen(config.puerto, function () {
    console.log("El servidor esta funcionando por el puerto " + config.puerto)
})
// crear la carpeta 'pagina' y el archivo index.html, copiar plantilla de bootstrap y en el body un componente forms

