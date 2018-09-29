let $ = require('jquery')
let fs = require('fs')
let filename1 = 'encontrados';
let filename2 = 'buscados';

let encontrados = 0;
let buscados = 0;
let linkEncontre = '';
let linkBusco = '';
let linkLogo = '<a class="navbar-brand" href="index.html">Inicio</a>';

function crearNav(){
    let stringNav;
    stringNav = '<nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top"><a class="navbar-brand" href="#">'+ linkLogo +'</a><ul class="navbar-nav"><li class="nav-item"><a class="nav-link" href="'+ linkEncontre +'">Encontre algo!</a></li><li class="nav-item"><a class="nav-link" href="'+ linkBusco +'">Busco algo!</a></li></ul></nav>'
    $('#navbar').append(stringNav);
}

function agregarContadores(found,toFind){
    let stringContadores;
    stringContadores = '<div> <span class="badge badge-success"> Se han encontrado: ' + found +  '</span></div>';
    stringContadores += '<div> <span class="badge badge-warning"> Se estan buscando: ' + toFind + '</span></div>'
    $('#contadores').append(stringContadores);
}

crearNav();
agregarContadores(encontrados,buscados);