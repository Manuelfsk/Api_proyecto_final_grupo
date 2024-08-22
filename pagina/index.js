
let login = function () {
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    console.log(email)
    console.log(password)
    // WARNING: For POST requests, body is set to null by browsers.
    var data = "email=" + email + "&password=" + password;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open("POST", "http://3.12.198.97:3000/usuarios/login");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(data);
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var resultado = JSON.parse(this.responseText);
            console.log(resultado)
            var mismensajes = document.getElementById("mismensajes")
            if (resultado.state == true) {
                mismensajes.innerHTML += `<div  class = "alert alert-success" role = "alert"> 
                                        ${resultado.mensaje}    
                                        </div>`
            } else {
                mismensajes.innerHTML += `<div  class = "alert alert-danger" role = "alert"> 
                                        ${resultado.mensaje}    
                                        </div>`
            }
        }
    });
}
