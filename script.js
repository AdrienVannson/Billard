/*
 * Variables globales
 */

// Plateau
var plateauLargeur;
var plateauHauteur;

// Bille
var deltaX;
var deltaY;

// Calcul
var tempsActuel;
var cachePositions; // Positions en fonction du temps

// DOM
var bille;
var mot;



/*
 * Mot
 */

function ajouterLettre (lettre)
{
    mot.innerText += lettre;
}


/*
 * Bille
 */

function getPosition (temps)
{
    if (cachePositions.length > temps) {
        return cachePositions[temps];
    }
    
    var pos = getPosition (temps-1);
    var x = pos[0];
    var y = pos[1]; 

    x += deltaX;

    if (x >= plateauLargeur) {
        x = plateauLargeur - (deltaX - (plateauLargeur - (x-deltaX)));
        deltaX = -deltaX;
        ajouterLettre('D');
    }
    if (x < 0) {
        deltaX = -deltaX;
        x = 0 - x;
        ajouterLettre('G');
    }


    y += deltaY;

    if (y >= plateauHauteur) {
        y = plateauHauteur - (deltaY - (plateauHauteur - (y-deltaY)));
        deltaY = -deltaY;
        ajouterLettre('H');
    }
    if (y < 0) {
        deltaY = -deltaY;
        y = 0 - y;
        ajouterLettre('B');
    }

    var result = [x, y];

    cachePositions.push(result);
    return result;
}

function allerAuTemps (temps)
{
    var pos = getPosition(temps);

    bille.style.left = pos[0] + 'px';
    bille.style.top = plateauHauteur - pos[1] + 'px';

    tempsActuel = temps;
}


/*
 * Global 
 */

function demarrer ()
{
    cachePositions = [[10, 10]];
    tempsActuel = 0;

    plateauLargeur = 1024;
    plateauHauteur = 512;

    deltaX = 25;
    deltaY = 10;

    bille = document.getElementById('bille');
    mot = document.getElementById('mot');

    setInterval(function() {
        allerAuTemps(tempsActuel+1)
    }, 100);
}

demarrer();