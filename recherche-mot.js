/**
 * 
 * A partir d'un mot donné, cherche des paramètres menant à la génération de ce mot
 * 
 */

function rechercherMot ()
{
    var mot = document.forms['formulaire-mot'].elements['mot'].value;

    if (! /^[HBGD]+$/.test(mot)) { // Le mot donné est invalide
        alert('Mot invalide');
        return;
    }
    alert('Mot valide');
}