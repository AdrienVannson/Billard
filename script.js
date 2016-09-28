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

// Général
var intervalleId = -1; 



/*
 * Mot
 */

function ajouterLettre (lettre)
{
    mot.innerText += lettre;
}

function effacerMot ()
{
    mot.innerText = '';
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

function stopIntervalle ()
{
    if (intervalleId != -1) {
        clearInterval(intervalleId);
    }
}

function startIntervalle ()
{
    stopIntervalle();
    
    intervalleId = setInterval(function() {
        allerAuTemps(tempsActuel+1);
    }, 100);
}

function pause () {
    stopIntervalle();

    document.getElementById('pause').style.display = 'none';
    document.getElementById('lecture').style.display = 'block';
}

function lecture () {
    startIntervalle();

    document.getElementById('pause').style.display = 'block';
    document.getElementById('lecture').style.display = 'none';
}

function demarrer ()
{
    var elementsFormulaire = document.forms['parametres'].elements;

    plateauLargeur = +elementsFormulaire['largeur-plateau'].value;
    plateauHauteur = +elementsFormulaire['hauteur-plateau'].value;

    deltaX = +elementsFormulaire['vitesse-x'].value;
    deltaY = +elementsFormulaire['vitesse-y'].value;

    cachePositions = [[
        +elementsFormulaire['balle-x'].value,
        +elementsFormulaire['balle-y'].value
    ]];
    tempsActuel = 0;

    bille = document.getElementById('bille');
    mot = document.getElementById('mot');


    var conteneurPlateau = document.getElementById('conteneur-plateau');
    conteneurPlateau.style.height = plateauHauteur + 64 + 'px';
    conteneurPlateau.style.width = plateauLargeur + 64 + 'px';

    effacerMot();

    lecture();
}

demarrer();