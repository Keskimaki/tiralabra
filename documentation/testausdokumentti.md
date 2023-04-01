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
pelilogiikkaan liittyvät utiliteettifunktion ovat mukana testauksessa. Tämän
hetkiset testit ovat melko rajallisia.

Minimax-algoritmin palauttaman siirron validiteetti testataan ja
evaluaatifunktiota testataan muutamassa eri tilanteessa. Utiliteettifunktioita
testataan osana tekoälyyn liittyviä testejä ja
AN/UCI-shakkinotaatioikonversioita testataan erikseen.

## Testien suorittaminen

Testit voi suorittaa komennon `deno task test` avulla. Samalla lasketaan
kattavuusraportti hakemistoon `coverage`. Testit suoritetaan myös
automaattisesti osana CI-putkea.

## Suorituskykytestaus

Evaluaatiofunktion sekä minimax-algoritmin suoritusnopeutta eri syvyyksillä
testataan. Suorituskykytestit voi suorittaa komennolla `deno task bench`.

## Koodin laadun seuranta ![Maintainability](https://api.codeclimate.com/v1/badges/c9c944ac9abf94eddf74/maintainability)

Koodin tyylivirheet voi tarkistaa komennolla `deno lint` ja koodiformatointi
suoritetaan komennolla `deno fmt`. Linttaus ja formatointi tarkistetaan osana
CI-putkea. Poikkeavuudet Denon oletusarvoisiin tyyli- ja formatointisääntöihin
on määritelty [deno.jsonc](/deno.jsonc)-tiedostossa.

Koodin ylläpidettävyyttä seurataan myös Codeclimate-sivuston avulla. Koodikannan
ylläpidettävyysraporttia voi katsella osoitteessa
https://codeclimate.com/github/Keskimaki/tiralabra.
