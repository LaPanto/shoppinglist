let col_productos;

col_productos = {
    "productos": []
}

recuperarProductos(); 

/*
col_productos={
    productos:[
        {nombre: "cerveza",
         cantidad: 24,
         tienda: "Alcampo",
         notas: "Las de San Miguel están de oferta"},

        {nombre: "arroz",
         cantidad: 2,
         tienda: "Mercadona",
         notas: "Tipo Bomba"},     
    ]
}
*/
/**
 * 1. Consigue datos del producto
 * 2. Validamos cantidad para que no haya negativas
 * 3. Los guarda en el JSON en el push
 * 4. Archiva el JSON en localStorage
 * 5. Con la funcion limpiaProductos, limpiamos los inputs y escondemos la modal
  */
function creaProducto() {
    let nombre = document.getElementById("inputNombre").value;
    let cantidad = document.getElementById("inputCantidad").value; /*habria que validar*/
    let tienda = document.getElementById("tiendas").value;
    let notas = document.getElementById("notasProducto").value;
    /*validamos la cantidad porque no queremos compras negativas*/
    if (cantidad <= 0) {
        cantidad = 1;
    }
    col_productos.productos.push( /*tengo un producto metido dentro de mi coleccion de producto*/ {
        "nombre": nombre,
        "cantidad": cantidad,
        "tienda": tienda,
        "notas": notas
    });
    //Actualizo la lista
    rellenaLista();

    /*para guardar los datos y se queden se utiliza el localStorage*/

    localStorage.setItem("col_productos", JSON.stringify(col_productos));

    //limpio la ventana de producto
    limpiaProducto();

}

/**
 * Borra los inputs y esconde la modal
 */

function limpiaProducto() {
    //Limpiar los inputs, tienda no hace falta se borra por si solo
    document.getElementById("inputNombre").value = "";
    document.getElementById("inputCantidad").value = "";
    document.getElementById("tiendas").value = "";
    document.getElementById("notasProducto").value = "";

    //Esconde la pantalla, esta funcion esta en modal.js
    escondeModal()
}


/**
 * Actualiza la lista
 */
function rellenaLista(){
/*
<tr>
                <td>
                    <input type="checkbox" id="productos" name="productos">
                </td>
                <td>
                    <label for="productos">Plátanos</label>
                </td>
                <td class="td_cantidad">
                    2
                </td>
                <td class="iconos">
                    <i class="lupa material-icons" onclick="muestraModal('detalle')">search</i>
                    <i class="papelera material-icons">delete</i>
                </td>
            </tr>
    */
    document.getElementById("tabla_Productos").innerHTML="";

   for (producto of col_productos.productos) {
     filaTabla=
        `<tr>
            <td><input type="checkbox" id="productos${producto.nombre}" name="productos${producto.nombre}"></td>
            <td><label for="productos${producto.nombre}">${producto.nombre}</label></td>
            <td class="td_cantidad">${producto.cantidad}</td>
            <td class="iconos"><i class="lupa material-icons" onclick="muestraModal('detalle')">search</i>
            <i class="papelera material-icons">delete</i></td>
        </tr>`;

    document.getElementById("tabla_Productos").innerHTML += filaTabla;


   }
}
/**
 * sirve para recuperar los archivos
 */
function recuperarProductos() {

    if(localStorage.getItem("col_productos")){

    col_productos = localStorage.getItem("col_productos"); //recojo la cadena
    col_productos = JSON.parse(col_productos); //lo hago un JSON

    }
}
