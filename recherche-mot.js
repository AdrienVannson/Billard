/**
 * 
 * A partir d'un mot donné, cherche des paramètres menant à la génération de ce mot
 * 
 */

var directionsOpposees = {
    'H' : 'B',
    'B' : 'H',
    'G' : 'D',
    'D' : 'G'
};


function getMemeOrientation (a, b) // Vérifie que deux directions sont dans la même orientation (verticale ou horizontale)
{
    if (a == b || a == directionsOpposees[b]) {
        return true;
    }
    return false;
}


/*
 * Intervalles
 */

function getIntervalles (mot)
{
    var orientationDepart = mot[0];

    var intervalles = [];
    var nbIntervallesEnCours = 0;
    var nbFrontieres = 0;

    for (var iCaractere=0; iCaractere<=mot.length; iCaractere++) {
        if (iCaractere == mot.length || getMemeOrientation(mot[iCaractere], orientationDepart)) {
            var tailleIntervalle = 1 / nbIntervallesEnCours;

            for (var iIntervalleAjoute=0; iIntervalleAjoute<nbIntervallesEnCours; iIntervalleAjoute++) {
                intervalles.push([
                    nbFrontieres-1 + iIntervalleAjoute * tailleIntervalle,
                    nbFrontieres-1 + (iIntervalleAjoute+1) * tailleIntervalle
                ]);
            }
            
            nbIntervallesEnCours = 0;
            nbFrontieres++;
        }
        else {
            nbIntervallesEnCours++;
        }

    }
    
    return intervalles;
}


/*
 * Système d'inéquations
 */

// ax + y + b COMP 0
var Inequation = function (a=0, b=0, comp='<')
{
    this.a = a;
    this.b = b;
    this.comp =  comp; // < OU >
};

var Point = function (x=0, y=0)
{
    this.x = x;
    this.y = y;
};

function getBarycentre (points)
{
    var sommeX = 0;
    var sommeY = 0;

    points.forEach(function(point) {
        sommeX += point.x;
        sommeY += point.y;
    }, this);

    return new Point(sommeX/points.length, sommeY/points.length);
}

function resoudreSysteme (inequations)
{
    // Sommets du polygone des contraintes, par ordre trigonométrique
    // Contraintes de départ : x>0 ; x<1000 ; y > 0 ; y < 1000
    var points = [
        new Point(0, 0),
        new Point(1000, 0),
        new Point(1000, 1000),
        new Point(0, 1000)
    ];


    return getBarycentre(points);
}


/*
 * Vérification
 */

function estValide (positionsChoisies, intervalles)
{
    for (var iPosition=0; iPosition<positionsChoisies.length; iPosition++) {
        var position = positionsChoisies[iPosition];
        var intervalle = intervalles[iPosition];

        if (position < intervalle[0] || position > intervalle[1]) {
            return false;
        }
    }

    return true;
}


/*
 * Recherche
 */

function rechercherMot ()
{
    var mot = document.forms['formulaire-mot'].elements['mot'].value;

    if (! /^[HBGD]+$/.test(mot)) { // Le mot donné est invalide
        Materialize.toast('Mot invalide', 3000);
        return;
    }
    
    var intervalles = getIntervalles(mot);
    console.log(intervalles);

    inequations = []; // TODO : ajouter x>0 ; y>0 et y<x

    intervalles.forEach(function(intervalle) {

        // Début
        var inequationDebut = new Inequation();

        inequations.push(inequationDebut);

        // Fin
        var inequationFin = new Inequation();

        inequations.push(inequationFin);

    }, this);

    var solutionSysteme = resoudreSysteme(inequations);
    console.log(solutionSysteme);
}
