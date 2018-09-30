const remote = require('electron').remote;

let $ = require('jquery')
let fs = require('fs')
let dirfind = 'find';
let dirBuscados = 'buscados';

let find = 0;
let buscados = 0;
let linkEncontre = 'ControlEncontrados.html';
let linkBusco = 'ControlBusquedas.html';
let linkLogo = '<a class="navbar-brand" href="index.html">Inicio</a>';

function crearNav() {
    let stringNav;
    stringNav = '<nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top"><a class="navbar-brand" href="#">' + linkLogo + '</a><ul class="navbar-nav"><li class="nav-item"><a class="nav-link" href="' + linkEncontre + '">Encontre algo!</a></li><li class="nav-item"><a class="nav-link" href="' + linkBusco + '">Busco algo!</a></li><li class="nav-item" id="btnCerrar"><a class="nav-link" href="#">Cerrar</a></li></ul></nav>'
    $('#navbar').append(stringNav);
}

function agregarContadores(buscados, encontrado) {
    let stringContadores;
    stringContadores = '<div> <span class="badge badge-success"> Se han encontrado: ' + buscados + '</span></div>';
    stringContadores += '<div> <span class="badge badge-warning"> Se estan buscando: ' + buscados + '</span></div>'
    $('#contadores').append(stringContadores);
}

$('#btnCerrar').on('click', () => {
    var window = remote.getCurrentWindow();
    window.close();
})

//Busquedas
$('#agregarBusqueda').on('click', () => {
    let nombreBusquedas = 'Pedro Emilio Perez Franco'
    let contactoBusquedas = $('#txt_ContactoBusquedas').val();
    let objetoBusquedas = $('#ObjetoBusquedas').val();
    let ciudadBusqueda = $('#selectCiudad').find(':selected').val();
    ciudadBusqueda = setCiudadBusqueda(ciudadBusqueda);
    fs.appendFile(dirBuscados, nombreBusquedas + ',' + contactoBusquedas + ',' + objetoBusquedas + ',' + ciudadBusqueda + '\n');
    agregarBusquedaObj(nombreBusquedas, contactoBusquedas, objetoBusquedas, setCiudadBusqueda(ciudadBusqueda));
})

function agregarBusquedaObj(nombreBusquedas, contactoBusquedas, objetoBusquedas,ciudadBusqueda) {
    
    if (nombreBusquedas && contactoBusquedas && objetoBusquedas) {
        buscados++;
        let updateBuscados = '<tr><td>' + buscados + '</td><td>' + nombreBusquedas + '</td><td>' + contactoBusquedas + '</td><td>' + objetoBusquedas + '</td><td>' + ciudadBusqueda + '</td></tr>';
        console.log(updateBuscados);
        $('#tabla-Busquedas').append(updateBuscados);
    }
}

function setCiudadBusqueda(ciudadBusqueda){
    
    switch(ciudadBusqueda){
        case 'Lerdo':
            ciudadBusqueda = 'Lerdo';
            break;
        case 'Torreon':
            ciudadBusqueda = 'Torreon';
            break;
        case 'Gomez Palacio':
            ciudadBusqueda = 'Gomez Palacio';
            break;
    }
    return ciudadBusqueda
}

function mostrarBuscados() {
    
    if(fs.existsSync(dirBuscados)){
        console.log('ya esta creado')
        let data = fs.readFileSync(dirBuscados, 'utf-8').split('\n');
        data.forEach((post,index) => {
            let [nombreBusquedas,contactoBusquedas,objetoBusquedas] = post.split(',')
            agregarBusquedaObj(nombreBusquedas,contactoBusquedas,objetoBusquedas)
        })
    }
    else{
        console.log("Se esta creando el archivo")
        fs.writeFile(dirBuscados,'',(err) => {
            if(err){
                console.log(err);
            }
        })
    }

}

//Encuentros
$('#agregarfind').on('click', () => {
    let nombrefind = 'Pedro Emilio Perez Franco'
    let contactofind = $('#txt_Contactofind').val();
    let objetofind = $('#Objetofind').val();
    let ciudadfind = $('#selectCiudad').find(':selected').val();
    ciudadfind = setCiudadfind(ciudadfind);
    fs.appendFile(dirfind, nombrefind + ',' + contactofind + ',' + objetofind + ',' + ciudadfind + '\n');
    agregarEncontradoObj(nombrefind, contactofind, objetofind,setCiudadfind(ciudadfind));
})

function setCiudadfind(ciudadfind){
    
    switch(ciudadfind){
        case 'Lerdo':
            ciudadEncontrar = 'Lerdo';
            break;
        case 'Torreon':
            ciudadEncontrar = 'Torreon';
            break;
        case 'Gomez Palacio':
            ciudadEncontrar = 'Gomez Palacio';
            break;
    }
    return ciudadfind
}

function agregarEncontradoObj(nombrefind, contactofind, objetofind,ciudadfind) {
    console.log('xd')
    if (nombrefind && contactofind && objetofind) {
        find++;
        let updatefind = '<tr><td>' + find + '</td><td>' + nombrefind + '</td><td>' + contactofind + '</td><td>' + objetofind + '</td><td>' + ciudadfind + '</td></tr>';
        $('#tabla-find').append(updatefind);
    }
}

function mostrarfind() {
    
    if(fs.existsSync(dirfind)){
        console.log('ya esta creado')
        let data = fs.readFileSync(dirfind, 'utf-8').split('\n');
        data.forEach((post,index) => {
            let [nombrefind,contactofind,objetofind] = post.split(',')
            agregarEncontradoObj(nombrefind,contactofind,objetofind)
        })
    }
    else{
        console.log("Se esta creando el archivo")
        fs.writeFile(dirfind,'',(err) => {
            if(err){
                console.log(err);
            }
        })
    }

}


crearNav();
agregarContadores(find, buscados);
mostrarBuscados();
mostrarfind();