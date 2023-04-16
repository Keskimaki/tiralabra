# Toteutusdokumentti

## Yleisrakenne

Ohjelma koostuu yksinkertaisesta komentorivikäyttöliittymästä, jonka avulla
hallitaan Lichess-shakkisivuston kanssa kommunikoivaa shakkitekoälyä. Ohjelma
kommunikoi Lichess-sivuston rajapinnan kanssa botti-käyttäjille tarkoitetun
API-tokenin avulla.

Shakkitekoäly perustuu Minimax-algoritmiin ja käyttää alfa-beta-karsintaa.
Tekoälyn evaluaatiofunktio käyttää eri shakkinappuloille määriteltyjä numeerisia
arvoja sekä nappulakohtaisia positiotauluja.

## Aika- ja tilavaatimukset

### TODO

## Suorituskyky

### TODO

## Puutteet ja parannusehdotukset

### TODO

## Lähteet

### Shakkinappuloiden numeeriset arvot ja positiotaulut:

https://www.chessprogramming.org/Simplified_Evaluation_Function

### Lichess-sivuston rajapintadokumentaatio ja muut ohjeet:

https://lichess.org/api#tag/Bot

https://lichess.org/@/thibault/blog/how-to-create-a-lichess-bot/FuKyvDuB

### Minimax esimerkkitoteutus:

https://gist.github.com/byanofsky/c8dd06cd1b1fb8d06a9dd695d07e403e
