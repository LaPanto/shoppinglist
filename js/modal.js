function escondeModal() {

    document.getElementById("modal").style.display = "none"; //Escondo la modal
}

function muestraModal(id) {
    escondehijas();//primero escondo todas las hijas de la modal
    document.getElementById(id).style.display="flex"; //Doy flex a la hija que quiero que se vea
    document.getElementById("modal").style.display="flex";//Doy flex, es decir enseño la modal
}

function escondehijas(){
    const hijas = document.getElementsByClassName("modalhijas")
    for (hija of hijas) {
        hija.style.display="none";
    }
}

/**
 * funcion genérica
 * @param {*} num nos dan el numero -1 para restar y 1 para incrementar
 * @param {*} idInputNumber id donde tiene que aparecer el numero
 */
function sumaNumMin(num, idInputNumber,topeMin){

    topeMin = topeMin|0;

    let input = document.getElementById (idInputNumber);
    input.value = Number (input.value) + num;

    if (input.value < topeMin) {
        input.value = topeMin;
    }
}
