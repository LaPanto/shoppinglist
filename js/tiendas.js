
let col_tiendas; /*coleccion de tiendas*/

col_tiendas = {
    tiendas: [
        {nombre: "Mercadona"},
        {nombre: "FamilyCash"},
        {nombre: "Consum"},
        {nombre: "Aldi"},
        {nombre: "MaxiDia"},
        {nombre: "Lidl"},
        {nombre: "Alcampo"},
        {nombre: "Masymas"},
        {nombre: "CashFamily"},
        {nombre: "Carrefour"},
        {nombre: "Mercado"}
    ]
}


/**
 * Sirve para rellenar una seleccion de un input
 * @param {*} idSelect Es el id del select que rellenamos
 * @param {*} coleccion Es la coleccion de JSON de las que creamos nuestras tiendas
 */
function rellenaSelect(idSelect, coleccion) {

    let select = document.getElementById(idSelect);
    let opciones = "";

    opciones = `<option value="no seleccionado">  </option>`;

    for (tienda of coleccion) {
        opciones += `<option value= ${tienda.nombre} > ${tienda.nombre} </option>`
    }

    select.innerHTML = opciones;
}
