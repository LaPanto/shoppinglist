function selecTienda() {
    let select = document.getElementById("tiendas");
    let opciones = "";
    opciones = `<option value="no seleccionado">  </option>`;
    for (tienda of col_tiendas.tiendas) {
        opciones += `<option value= ${tienda.nombre} > ${tienda.nombre} </option>`
    }
    select.innerHTML = opciones;
}

let col_tiendas; /*coleccion de tiendas*/

col_tiendas = {
    tiendas: [{
            nombre: "Mercadona"
        },
        {
            nombre: "FamilyCash"
        },
        {
            nombre: "Consum"
        },
        {
            nombre: "Aldi"
        },
        {
            nombre: "MaxiDia"
        },
        {
            nombre: "Lidl"
        },
        {
            nombre: "Alcampo"
        },
        {
            nombre: "Maximas"
        },
        {
            nombre: "CashFamily"
        },
        {
            nombre: "Carrefour"
        },
        {
            nombre: "Mercado"
        },

    ]
}