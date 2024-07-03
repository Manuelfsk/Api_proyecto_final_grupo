let AvatarController = {}


AvatarController.Avatar = function (request, response) {

    let post = {
        _id: request.session._id
    }

    console.log(post)


    if (post._id == undefined || post._id == null || post._id == "") {
        response.json({ state: false, mensaje: "el campo_id es obligatorio" })
        return false
    }
    try {

        let CargarImagen = multer({
            storage: multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, raiz + "/ImagenesAvatar/")
                },
                filename: (req, file, cb) => {
                    cb(null, post._id + '.png')
                }
            }),
            fileFilter: function (req, file, cb) {
                let ext = path.extname(file.originalname)
                let misextensiones = ['.png', '.jpeg', '.jpg', '.gif', '.tif']
                if (misextensiones.indexOf(ext) == -1) {
                    return cb({ state: false, mensaje: "solo soportamos las siguintes imagenes " + misextensiones.join("|") }, null)
                }
                cb(null, true)
            }
        }).single('image')



        CargarImagen(request, response, function (err) {
            if (err) {
                response.json({ state: false, error: err })
            } else {
                response.json({ state: true, mensaje: "Archivo subido correctament" })
            }
        })

    } catch (error) {
        response.json({ state: false, error: error })

    }






}

module.exports.AvatarController = AvatarController