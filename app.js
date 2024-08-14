const express = require("express")
const mongoStore = require("connect-mongo")
global.app = express()
global.config = require("./config.js").config
global.sha256 = require("sha256")
global.multer = require('multer')
global.path = require("path")
global.raiz = __dirname


let bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
global.tags = []

app.all('*', function (req, res, next) {

    var whitelist = req.headers.origin;
    // console.log(whitelist)
    res.header('Access-Control-Allow-Origin', whitelist);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
    res.header('Access-Control-Allow-Headers', " authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("Access-Control-Allow-Credentials", "true");
    // res.header('Set-Cookie: cross-site-cookie=name; SameSite=None; Secure');


    next();

});
const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://fonsecafernando88:app@cluster0.1prgpov.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" + config.bd).then(
    // mongoose.connect("mongodb://18.218.88.92:27017/" + config.bd).then(
    () => console.log("conected!")
).catch((error) => {
    console.log(error)
    // return callback({ posicion: 0, state: false, mensaje: error })
})

var cors = require("cors")




// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin) return callback(null, true)
//         if (config.origin.indexOf(origin) === -1) {
//             return callback('error de cors', false)
//         }
//         return callback(null, true)
//     }
// }))
app.use(cors({
    origin: 'http://18.218.88.92:4200', // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.options('*', cors()); // Allow all preflight requests

let session = require("express-session")({
    secret: config.palabraclave,
    resave: true,
    saveUninitialized:true,
    // cookie:{path:"/", httpOnly:true, maxAge:config.maxAge , secure: false},
    name:config.nombrecookie,
    rolling:true,
    store: mongoStore.create({mongoUrl:"mongodb+srv://fonsecafernando88:app@cluster0.1prgpov.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" + config.bd + "cookies"})
    // store: mongoStore.create({mongoUrl:"mongodb://18.218.88.92:27017/" + config.bd + "cookies"})
})
app.use(session)
require("./routes.js")

app.use('/imagenes', express.static(__dirname + '/imagenes'))
app.use('/ImagenesAvatar', express.static(__dirname + '/ImagenesAvatar'))
//despues de crear usuarios/login.
// preparar Blackend para recibir el frontend a un proyecto
app.use('/', express.static(__dirname + '/pagina'))
//exponer imagene en el frontend

app.listen(config.puerto, function () {
    console.log("El servidor esta funcionando por el puerto " + config.puerto)
})
// crear la carpeta 'pagina' y el archivo index.html, copiar plantilla de bootstrap y en el body un componente forms

