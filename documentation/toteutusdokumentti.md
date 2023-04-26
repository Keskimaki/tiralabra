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

- Minimax-agoritmin aikavaativuus on O(b^m), missä b on sallittujen siirtojen
  määrä ja m on hakusyvyys.
- Tilavaativuus on O(bm), missä jälleen b on sallittujen siirtojen määrä ja m on
  hakusyvyys.

Ohjelma käyttää neljän hakusyvyyttä, jolloin algoritmin aikavaativuus on O(b^4)
ja tilavaativuus on O(4b).

## Suorituskyky

Evaluaatifunktion ja Minimax-algoritmin suorituskyky eri hakusyvyyksillä on
laskettu
[Denon benchmarking](https://deno.com/manual@v1.31.2/tools/benchmarker)-työkalun
avulla.

![image](https://user-images.githubusercontent.com/87322574/234510551-a7f1b9eb-dc8b-4639-bea8-bf5f97dfca18.png)

## Puutteet ja parannusehdotukset

### TODO

## Lähteet

### Shakkinappuloiden numeeriset arvot ja positiotaulut:

https://www.chessprogramming.org/Simplified_Evaluation_Function

### Lichess-sivuston rajapintadokumentaatio ja muut ohjeet:

https://lichess.org/api#tag/Bot

https://lichess.org/@/thibault/blog/how-to-create-a-lichess-bot/FuKyvDuB

### Minimax:

#### Esimerkkitoteutus:

https://gist.github.com/byanofsky/c8dd06cd1b1fb8d06a9dd695d07e403e

#### Aikavaativuus:

https://cis.temple.edu/~vasilis/Courses/CIS603/Lectures/l7.html
