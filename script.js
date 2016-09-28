/*
 * Plateau 
 */

var plateauLargeur = 1024;
var plateauHauteur = 512;


/*
 * Mot
 */

var mot = document.getElementById('mot');

function ajouterLettre (lettre) {
    mot.innerText += lettre;
}

/*
 * Bille
 */

var bille = document.getElementById('bille');

var x = 25;
var y = 25;

var deltaX = prompt("Vitesse X", 0);
var deltaY = prompt("Vitesse Y", 0);


function deplacer () {
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

    console.log( bille.style.left);
    bille.style.left = x + 'px';
    console.log( bille.style.left);


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

    bille.style.top = plateauHauteur - y + 'px';
}

setInterval(deplacer, 5000);