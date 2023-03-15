# Määrittelydokumentti

### Koulutusohjelma

Tietojenkäsittelytieteen kandiohjelma

### Kieli

Projektin koodi ja koodinsisäinen dokumentaatio on englanniksi. Kurssin aikana
erikseen palautettavat dokumentit kirjoitan suomeksi.

## Ohjelmointikielet

Käytän projektissa TypeScriptia Deno-ajoympäristössä. Hallitsen hyvin Pythonin,
JavaScriptin ja TypeScriptin. Minulla on kokemusta myös mm. Haskelista, Rustista
ja C#:sta.

## Algoritmit ja tietorakenteet

Tarkoituksena on käyttää alpha–beta pruning-metodilla tehostettua
minimax-algoritmia. Tietorakenteita tarvitaan ainakin hakupuu, hajautustaulu ja
lista.

## Ongelma

Ongelmana on toteuttaa perinteinen shakkitekoäly. Minimax soveltuu hyvin
vuoropohjaisiin peleihin. Jos aikaa riittää, niin shakkialgoritmia voi tehostaa
avauskirjaa ja loppupelitaulua käyttämällä. Tavoitteena on saavuttaa
mahdollisimman toimiva tekoäly algoritmisin metodein ts. ilman koneoppimista.

Itse shakkiohjelma toteutetaan suurilta osin ulkoisten riippuvuuksien avulla,
jotta aikaa jää tekoälyn toteuttamiseen. Kysessä on komentorivisovellus, jossa
voi joko pelata tekoälyä vastaan tai seurata, kun se pelaa itseään vastaan.

## Syötteet

Komentoriviargumentit:

```
-h, --help - Näyttää ohjeet
-v, --version - Näyttää versionumeron
-c, --color - Määrittää pelaajan värin (Oletus: 'white', Arvot: 'white', 'black')
--no-player - Käynnistää kahden tekoälyn välisen pelin
```

Mahdollisesti myös kyky muokata joitain tekoälyn toimintaan liittyviä muuttujia
suorituskertakohtaisesti.

## Aika- ja tilavaatimukset

Tavoitteena on saada aikaiseksi mahdollisimman hyvä tekoäly. Algoritmin
tehokkuus ja tilavaativuus vaikuttavat esimerkiksi puuhaun mahdolliseen
syvyyteen ja niitä optimoidaan tarpeen mukaan.
