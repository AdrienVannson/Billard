/**
 * 
 * A partir d'un mot donné, cherche des paramètres menant à la génération de ce mot
 * 
 */

function rechercherMot ()
{
    var mot = document.forms['formulaire-mot'].elements['mot'].value;

    if (! /^[HBGD]+$/.test(mot)) { // Le mot donné est invalide
        Materialize.toast('Mot invalide', 3000);
        return;
    }
    

}
