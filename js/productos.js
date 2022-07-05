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
         notas: "Las de San Miguel están de oferta",
         comprado: "false"},

        {nombre: "arroz",
         cantidad: 2,
         tienda: "Mercadona",
         notas: "Tipo Bomba",
         comprado: "false"},    
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

    /*validamos que el nombre no este vacio*/
    nombre=nombre.toLowerCase(); /*ponemos todo minuscula*/
    nombre = nombre.slice(0,1).toUpperCase() + nombre.slice(1); /*cortamos la primera y la ponemos en mayuscula y la añadimos al nombre*/
    if (nombre.trim()=="") {
        limpiaProducto(); //se llama esta funcion para que limpie sino no haría nada el boton
        return false;
    }
    /*validamos que notas vaya la primera en mayuscula*/
    notas=notas.toLowerCase(); /*ponemos todo minuscula*/
    notas = notas.slice(0,1).toUpperCase() + notas.slice(1); /*cortamos la primera y la ponemos en mayuscula y la añadimos al nombre*/
    
    /*validamos la cantidad porque no queremos compras negativas*/
    if (cantidad <= 0) {
        cantidad = 1;
    }
    col_productos.productos.push( /*tengo un producto metido dentro de mi coleccion de producto*/ {
        "nombre": nombre,
        "cantidad": cantidad,
        "tienda": tienda,
        "notas": notas,
        "comprado": false
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
 * Hacemos la tabla del main desde la funcion
 * 
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
    /*document.getElementById("tabla_Productos").innerHTML="";*/
    let contenedor = document.getElementById("main");
    let tabla = `<table class="rayado" id="tabla_Productos">`;
    let marcado="";

   for (producto of col_productos.productos) {
    indice=col_productos.productos.indexOf(producto);
    /*marcamos el checked cuando este vacio y se haya comprado*/
    if (producto.comprado) {
        marcado="checked";
    }else{
        marcado="";
    }
     filaTabla=
        `<tr>
            <td><input type="checkbox" id="productos${producto.nombre}" name="productos${producto.nombre}" ${marcado} onchange="cambiaComprado(${indice})"></td>
            <td><label for="productos${producto.nombre}">${producto.nombre}</label></td>
            <td class="td_cantidad">${producto.cantidad}</td>
            <td class="iconos"><i class="lupa material-icons" onclick='detalleProducto(${indice})'>search</i>
            <i class="papelera material-icons" onclick='borraProducto(${indice})'>delete</i></td>
       
        </tr>`;
    /*<i class="papelera material-icons" onclick='borraProducto("${col_productos.productos.indexOf(producto)}")'>delete</i></td>*/
    tabla += filaTabla;

    /*document.getElementById("tabla_Productos").innerHTML += filaTabla;*/


   }
   tabla +="</table>";
   contenedor.innerHTML = tabla;

   //añadimos el boton de borrar los articulos seleccionados
   contenedor.innerHTML+=

   `    <div id="seleccion">
            <div id="borrado">
                <button class="eliminar" onclick="borrarComprados()">Borrar</button>
            </div>
        </div>`
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

/**
 *funcion para borrar producto con el icono de la papelera mediante la posicion
 * @param {*} eliminable el producto eliminable
 */
function borraProducto(eliminable) {
    //1. Eliminar el producto del JSON
    col_productos.productos.splice(eliminable,1); //splice elimina el que indiquemos y el pop elimina siempre el ultimo

    //2. Guardar el JSON nuevo en el localStorage, es una copia de seguridad
    localStorage.setItem("col_productos", JSON.stringify(col_productos));

    //3. Volver a rellenar la lista
    rellenaLista();
}
/*function borraProducto(eliminable){
    //1.Eliminar el producto JSON

    //2. Guardar el JSON nuevo en el localStorage, es una copia de seguridad
    localStorage.setItem("col_productos", JSON.stringify(col_productos));

    //3. Volver a rellenar la lista
    rellenaLista();
}*/
/**
 * Funcion para la lupa, enseña la modal de informacion del producto
 * @param {*} indice 
 */

function detalleProducto(indice){
   /* SACADO DE MI PROTOTIPO - ES LA PINTA QUE DEBERIA TENER EL DETALLE DE CADA PRODUCTO
   <header><h2>Plátanos</h2></header>
    <table class="informacion">
    <tr><th>Comprar:</th>
    <td>5</td></tr>
    <tr><th>Lugar:</th>
    <td>Mercadona</td></tr>
    <Tr><th>Notas:</th>
    <td></td></Tr>
    <tr><td colspan=2>vacio las notas</td></tr></table>
    <button onclick="escondeModal()" id="visto">Ok</button>
    */

    let informacion = ""; /*me abro una caja*/
    let producto = col_productos.productos[indice]; /*guardo en la caja la coletilla*/
    let ventana = document.getElementById(`detalle`);

    informacion =
    `<header><h2>${producto.nombre}</h2></header>
    <table class="informacion">
    <tr><th>Comprar:</th>
    <td class="numero">${producto.cantidad}</td></tr>
    <tr><th>Lugar:</th>
    <td>${producto.tienda}</td></tr>
    <Tr><th>Notas:</th>
    <td></td></Tr>
    <tr><td colspan=2>${producto.notas}</td></tr></table>
    <button onclick="escondeModal()" id="visto">Ok</button>`

    ventana.innerHTML = informacion;
    muestraModal(`detalle`);
}

/**
 * funcion para que el checkbox se marque cuando lo toquemos, es decir que reaccione al cambio
 * @param {} params 
 */
function cambiaComprado(indice) {
   
   col_productos.productos[indice].comprado = !col_productos.productos[indice].comprado; /*recoger mi producto y luego lo negamos porque es si true o false*/
   localStorage.setItem("col_productos", JSON.stringify(col_productos));
   //Actualiza ahora o no a gusto del desarrollador.
   rellenaLista();
  
}
/**
 * Esta funcion hace que el focus este en el input del nombre del producto cuando se crea
 */
function focusEnNuevo() {
    muestraModal('nuevo');
    document.getElementById("inputNombre").focus();
}

function borrarComprados(){
    /*
    1. Recorrer la lista de productos
    2. comprobar si comprado == true
    3. si es que si, sacar el indice del producto y hacer splice
    4. Llamar a borraProducto(indice)    */
    
    
    for (producto of col_productos.productos ) {
         
        if (producto.comprado==true) {
            indice=col_productos.productos.indexOf(producto);
            borraProducto(indice);
            borrarComprados();
        }        
    }      
}