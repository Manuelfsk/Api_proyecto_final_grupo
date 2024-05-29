let login = function () {
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    console.log(email)
    console.log(password)
    // WARNING: For POST requests, body is set to null by browsers.
    var data = "email=" + email + "&password=" + password;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "http://localhost:3001/usuarios/login");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(data);

}
