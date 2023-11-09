function validarFormulario() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;

    const nombreError = document.getElementById("nombreError");
    const apellidoError = document.getElementById("apellidoError");

    // Validación de nombre
    if (!validarTexto(nombre)) {
        nombreError.textContent = "Ingrese un nombre válido sin números ni caracteres especiales.";
        return false;
    } else {
        nombreError.textContent = "";
    }

    // Validación de apellido
    if (!validarTexto(apellido)) {
        apellidoError.textContent = "Ingrese un apellido válido sin números ni caracteres especiales.";
        return false;
    } else {
        apellidoError.textContent = "";
    }

    // Resto de la lógica para enviar el formulario si la validación es exitosa
    alert("Formulario enviado correctamente");
    return true;
}

function validarTexto(texto) {
    // Utilizamos una expresión regular para permitir solo letras y espacios
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(texto);
}
