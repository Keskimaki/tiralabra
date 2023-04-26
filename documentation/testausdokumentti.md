# Testausdokumentti

## Testikattavuus [![codecov](https://codecov.io/gh/Keskimaki/tiralabra/branch/main/graph/badge.svg?token=Y2NNQ3KPS0)](https://codecov.io/gh/Keskimaki/tiralabra)

Testikattavuutta seurataan automaattisesti `deno coverage`-komennon avulla. Näin
luotua kattavuusraporttia käytetään Codecov-raportin luontiin. Kattavuusraportin
luonti ja sen lähetys Codecov-sivustolla tapahtuu automaattisesti osana
CI-putkea. Kattavuutta ja siihen liittyviä visualisointeja voi katsella
osoitteessa https://app.codecov.io/gh/Keskimaki/tiralabra.

Testikattavuuslaskenta ei ota kokonaan testaamattomia tiedostoja huomioon.
Kokonaan testauksen ulkopuolella on tällä hetkellä Lichess API-integraatio sekä
komentorivikäyttöliittymä.

## Testaus

Tekoälyn toiminta, eli minimax-algoritmi ja evaluaatiofunktio, sekä
pelilogiikkaa kuten sallitut siirrot ovat mukana testauksessa.

Evaluaatifunktiota testataan erikseen varmistamalla alkutilanteen samanarvoisuus
ja se, että nappulan menettäminen huonontaa tilannetta. Funktiota testataan myös
osana Minimax-algoritmin testejä. Utiliteettifunktioita testataan osana muita
testejä. Pelilogiikka testataan kattavasti eri tilanteissa varsinkin sallittujen
siirtojen tasolla.

Minimax-algoritmin palauttaman siirron validiteetti testataan. Tämän lisäksi
testataan algoritmin kyky löytää voittava siirto, vastustajan nappuloiden
syöminen ja tekoälylle edullisten vaihtojen tekeminen.

## Testien suorittaminen

Testit voi suorittaa komennon `deno task test` avulla. Samalla lasketaan
kattavuusraportti hakemistoon `coverage`. Testit suoritetaan myös
automaattisesti osana CI-putkea.

## Suorituskykytestaus

Evaluaatiofunktion sekä minimax-algoritmin suoritusnopeutta eri syvyyksillä
testataan. Suorituskykytestit voi suorittaa komennolla `deno bench`.

## Koodin laadun seuranta ![Maintainability](https://api.codeclimate.com/v1/badges/c9c944ac9abf94eddf74/maintainability)

Koodin tyylivirheet voi tarkistaa komennolla `deno lint` ja koodiformatointi
suoritetaan komennolla `deno fmt`. Linttaus ja formatointi tarkistetaan osana
CI-putkea. Poikkeavuudet Denon oletusarvoisiin tyyli- ja formatointisääntöihin
on määritelty [deno.jsonc](/deno.jsonc)-tiedostossa.

Koodin ylläpidettävyyttä seurataan myös Codeclimate-sivuston avulla. Koodikannan
ylläpidettävyysraporttia voi katsella osoitteessa
https://codeclimate.com/github/Keskimaki/tiralabra.
