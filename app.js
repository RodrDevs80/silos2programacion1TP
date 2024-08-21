/*Consigna: Simulación de una Planta de Silos
Como desarrollador eres el encargado de desarrollar un sistema para gestionar el ingreso
de camiones a una planta de silos que almacena soja y maíz.
Tu tarea:
1. Crear un desarrollo en JavaScript que simule el funcionamiento de esta planta.
2. Definir dos silos: uno para soja y otro para maíz. Cada silo tendrá una capacidad
máxima y un stock actual de cereal.
3. Implementar una función que permita ingresar un camión. Esta función debe:
o Solicitar al usuario el tipo de cereal (soja o maíz) y el peso de la carga.
o Validar los datos ingresados (por ejemplo, que el peso sea un número
positivo).
o Determinar el silo correspondiente al tipo de cereal.
o Verificar si hay suficiente espacio en el silo para almacenar la carga.
o Si hay espacio, actualizar el stock del silo y mostrar un mensaje informando
sobre el ingreso del camión.
o Si no hay espacio, mostrar un mensaje indicando que el silo está lleno.
Conceptos básicos a utilizar:
 Variables y constantes: Para almacenar datos como el nombre del silo, su
capacidad y el stock actual. Ámbitos, CUIDADO!!.
 Objetos literales: Para representar los silos y sus propiedades.
 Estructuras condicionales: if y switch para tomar decisiones basadas en los
datos ingresados.
 Funciones: Para modularizar el código y realizar tareas específicas.
 Entrada y salida de datos: prompt para solicitar información al usuario y alert
para mostrar mensajes.
Ejemplo de ejecución:
Al ejecutar el programa, se le pedirá al usuario que ingrese el tipo de cereal y el peso de la carga. El
programa verificará los datos y actualizará el stock del silo correspondiente. Si hay algún error o si
el silo está lleno, se mostrará un mensaje al usuario.
 */
//vamos a suponer que la empresa tiene 2 silos  de 4000 toneladas cada uno(soja y maíz);
//variables
let condicion;
//variable-array
const silos = [{
    nombre: 'Silo1-Soja',
    cantidad: 0,
    almacenamientoMaximo: 4000
},
{
    nombre: 'Silo2-Maiz',
    cantidad: 0,
    almacenamientoMaximo: 4000
}
];
const ingresos = [];
let idIngreso = 0;
//variables-objetos
const ingreso = {
    tipo: '',
    peso: 0,
}
//funciones
function validarEntradaDeDatos(tipo, peso) {

    if (tipo === null || tipo === "" || isNaN(tipo)) {
        return 'ERROR:No se ingreso un valor o el mismo no es valido!❌';
    }
    if (peso === null || peso === "") {
        return 'ERROR:No se ingreso ningún valor!❌';
    } else if (isNaN(peso)) {
        return 'ERROR:No ingreso un numero!❌';
    } else if (Number(peso) <= 0) {
        return 'ERROR:No ingreso un numero positivo mayor a 0!❌';
    }
    return [Number(tipo), Number(peso)];
}

function mostarStock(array) {
    for (let i = 0; i < array.length; i++) {
        alert(`El ${array[i].nombre}, tiene ${array[i].cantidad} toneladas,Capacidad libre:${array[i].almacenamientoMaximo - array[i].cantidad} Toneladas 🚚`);
    }
}
//⚠❓
function ControlarIngresoAlSilo(array, index, cant) {
    if (array[index].cantidad >= 0 && array[index].cantidad <= array[index].almacenamientoMaximo) {
        array[index].cantidad += cant;
        alert('Ingreso realizado con éxito!💾✔')
    } else {
        alert('Supera la cantidad de almacenaje del silo!⚠');
    }

}

function informeGeneralSilos(array) {
    const informe = `\n**INFORME GENERAL DE LOS INGRESOS 🖨***\n${array[0].nombre},contiene:${array[0].cantidad} TN 🚍. Espacio disponible: ${array[0].almacenamientoMaximo - array[0].cantidad}TN 🚍.\n${array[1].nombre},contiene:${array[1].cantidad} TN 🚍. Espacio disponible: ${array[1].almacenamientoMaximo - array[1].cantidad}TN 🚍.`;
    return informe;
}

function mostarIngresos(array) {
    for (let i = 0; i < array.length; i++) {
        alert(`\n N° de Ingreso: ${i + 1}\n Tipo: ${array[i].tipo === 1 ? 'Soja' : 'Maíz'} \n Peso: ${array[i].peso} ⚖`);
    }
}

function ingresarCamion(array, ingreso) {

    do {
        const tipoIngresado = prompt('Ingrese el tipo\n 1.Soja\n 2.Maíz:');
        const pesoIngresado = prompt('Ingrese el peso en toneladas:');
        condicion = validarEntradaDeDatos(tipoIngresado, pesoIngresado);
        if (condicion.includes('ERROR')) {
            alert(condicion);
        }
    } while (condicion.includes('ERROR'));
    ingreso.tipo = condicion[0];
    ingreso.peso = condicion[1];

    ingresos.push({
        id: idIngreso,
        tipo: condicion[0],
        peso: condicion[1],
    });
    idIngreso++;
    console.log(ingresos);
    switch (ingreso.tipo) {
        case 1:
            array[0].almacenamientoMaximo < ingreso.peso || array[0].almacenamientoMaximo - array[0].cantidad < ingreso.peso ? alert('Supera la capacidad maxima del silo,introduzca una cantidad valida ⚠') : ControlarIngresoAlSilo(array, 0, ingreso.peso);
            break;
        case 2:
            array[1].almacenamientoMaximo < ingreso.cantidad || array[1].almacenamientoMaximo - array[1].cantidad < ingreso.peso ? alert('Supera la capacidad maxima del silo,introduzca una cantidad valida ⚠') : ControlarIngresoAlSilo(array, 1, ingreso.peso);
            break;
        default:
            alert('opción no valida!');
            break;
    }

}


//main->Menu principal
do {
    opcion = prompt(`\n**Empresa NewExport 🕋**\n**Sistema de Ingreso y Clasificación 👁 **\n1️⃣. Ingresar y Clasificar granos🏷\n2️⃣. Mostrar stock actual👁\n3️⃣. Mostrar Ingresos ⏬🗃\n4️⃣. Salir🚪\n\nElija una opción:`);
    switch (opcion) {
        case '1':
            ingresarCamion(silos, ingreso);
            break;
        case '2':
            mostarStock(silos);
            break;
        case '3':
            ingresos.length == 0 ? alert('No se realizo ningún ingreso!🚨') : mostarIngresos(ingresos);
            break;
        case '4':
            alert(informeGeneralSilos(silos));
            break;
        default:
            alert('\nIngreso una opción no valida!\nLas opciones validas están en el rango de 1 a 4 ❌')
            break;
    }

} while (opcion != 4);
