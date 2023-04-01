# Viikkoraportti 3

### Käytetty aika

Koodaus, muutosten testaus ym. noin 8 tuntia.

## Raportti

Keskityin tällä viikolla pääasiassa shakkialgoritmin parantamiseen. Otin
positiotaulut käyttöön eri nappulatyypeille osana evaluaatiofunktiota. Tämä
paransi tekoälyn siirtoja varsinkin alkupelissä selvästi. Paransin
minimax-algoritmia alfa-beta karsinnan avulla. Suoritusnopeus parani paljon,
joten tekoäly voi nyt helposti laskea siirtoja tason syvemmälle.

Aloin käyttää Denon benchmarking-toiminnallisuutta ja testasin algoritmin
nopeuksia erinäisillä muutoksilla. Tätä kautta huomasin, että alustin
shakkilaudan turhaan jokaisella minimax-kierroksella. Koko laudan alustuksen
sijaan vain tehdyn siirron peruminen nopeutti algoritmia selvästi. Aloitin
kirjoittamaan koodin sisäistä JSDoc-tyylistä dokumentaatiota.

Nyt suurin ongelma tekoälyn toiminnassa on pelin lopettaminen. Pelitestauksessa
tekoäly saattaa joutua tasapelitilanteeseen vaikka sillä on selvä
etulyöntiasema. On ilmennyt myös tilanteita, joissa tekoäly ei huomaa sitä
uhkaavaa shakkimattia. Olettaisin, että tämä johtuu minimax-toteutuksessa
olevasta bugista. Tekoäly ei ehkä ota kuninkaan syömistä huomioon, koska peli
loppuu ennen sitä ja mahdollisia siirtoja, joita analysoida ei näin ollen ole.

Seuraavilla viikoilla olisi tarkoitus laajentaa testausta ja melko suurena
urakkana korvata kaikki chess.js-kirjaston kautta saatu toiminnallisuus.
Shakkilaudan simulointi tehokkaasti ja erikoistapausten kuten tornitus,
ylennykset ja ohestalyönti toteuttaminen vaatii varmasti aikaa. Jotta botti
pystyy kommunikoimaan ongelmitta oikeat siirrot Lichessille nämä on kaikki
toteutettava ja siirot on ilmaistava oikeellisesti UCI-notaatiolla.
