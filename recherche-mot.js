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
}
