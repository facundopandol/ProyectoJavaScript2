
let entradasDisponibles = [
    { tipo: 'General', precio: 500.0, cantidad: 100 },
    { tipo: 'VIP', precio: 2000.0, cantidad: 20 },
    { tipo: 'Tribuna Derecha', precio: 1500.0, cantidad: 50 },
    { tipo: 'Tribuna Izquierda', precio: 1500.0, cantidad: 50 }
];

let carrito = [];

function agregarEntrada() {
    let tipoEntrada;
    let entrada;
    do {
        tipoEntrada = prompt('Ingrese el tipo de entrada (General, VIP, Tribuna Derecha, Tribuna Izquierda):');
        if (!tipoEntrada) {
            alert('El tipo de entrada no puede estar vacío.');
            continue;
        }
        entrada = entradasDisponibles.find(entradas => entradas.tipo.toLowerCase() === tipoEntrada.toLowerCase());
        if (!entrada) {
            alert('El tipo de entrada ingresado no es válido.');
        }
    }
    while (!entrada);
    let cantidad;
    do {
        cantidad = parseInt(prompt('Ingrese la cantidad de entradas a comprar:'));

        if (isNaN(cantidad)) {
            alert('La cantidad ingresada no es válida. Por favor ingrese un número');
        } else if (entrada.cantidad < cantidad) {
            alert('Lo sentimos, no hay suficientes entradas disponibles en esa ubicación.');
        }
    } while (isNaN(cantidad) || entrada.cantidad < cantidad);
    let subtotal = entrada.precio * cantidad;
    carrito.push({ tipo: tipoEntrada, precio: entrada.precio, cantidad, subtotal });

    // ACTUALIZAR STOCK DE ENTRADAS
    entrada.cantidad -= cantidad;
    alert(`Se agregaron ${cantidad} entradas ${tipoEntrada} al carrito.`);
}

//COMPRAR MAS ENTRADAS O REALIZAR COMPRA
let continuarCompra = 's';
while (continuarCompra.toLowerCase() === 's') {
    agregarEntrada();
    continuarCompra = prompt('¿Desea agregar más entradas? s/n');
    if (continuarCompra.toLowerCase() === 'n') {
        verCarrito();
        realizarCompra();
    }
}

// CARRITO DE COMPRAS
function verCarrito() {
    if (carrito.length === 0) {
        alert('El carrito está vacío.');
        return;
    }
    let carritoTemporal = 'Carrito:\n';
    let total = 0;
    for (let entrada of carrito) {
        carritoTemporal += `${entrada.cantidad} entradas ${entrada.tipo} $${entrada.precio} cada una. Subtotal: $${entrada.subtotal}\n`;
        total += entrada.subtotal;
    }
    carritoTemporal += `Total: $${total}`;
    alert(carritoTemporal);
}



function realizarCompra() {
    if (carrito.length === 0) {
        alert('Debe seleccionar al menos una entrada para realizar la compra.');
        return;
    }

    // ARMAR NUEVO ARRAY CON LOS DATOS DEL COMPRADOR A PARTIR DE LOS SIG PROMPTS PARA GENERAR BASE DE DATOS
    // DATOS DEL USUARIO
    const nombre = prompt('Ingrese su nombre:');
    const email = prompt('Ingrese su correo electrónico:');
    const telefono = prompt('Ingrese su número de teléfono:');


    alert('Usted ha reservado sus entradas satisfactoriamente. Por email le llegará el comprobante para realizar el pago.\nGracias por usar nuestra página.');
}

agregarEntrada();
