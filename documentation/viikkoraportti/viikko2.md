# Viikkoraportti 2

### Käytetty aika

Käytin koodaukseen, Lichessin rajapintaan perehtymiseen jne. noin 10 tuntia.

## Raportti

Aloitin viikon toteuttamalla yksinkertaisen version minimax-algoritmista. Tämän
yhteydessä piti toteuttaa lautatilanteen numeerisen arvioinnin suorittava
funktio, joka on myös tällä hetkellä hyvin yksinkertainen. Tekoäly laskee
laudalla olevat omat nappulat arvoilla kuningas 100, kuningatar 9 jne. sekä
miinustaa vastustajan nappuloiden arvot loppuarvosta. Tämänhetkinen
optimoimation algoritmi laskee nopeasti kolmen siirron syvyteen ja pelin keston
kannalta vielä kohtuullisessa ajassa myös neljän syvyteen.

Algoritmi ja sen yksinkertainen evaluaatiofunktio pärjää jo yllättävän hyvin
amatööritason peleissä. Ongelmana ovat pääasiassa huonot alkupelin siirrot ja
pelitestauksessa löytynyt bugi, jossa algoritmi saattaa tehdä tasapeliin
johtavan siirron sille edullisessa tilanteessa. Kunhan ehdin päivittämään
evaluaatiofunktion ottamaan esim. nappuloiden aseman laudan keskeisemmillä
ruuduilla huomioon, niin oletan että alkupeli paranee.

Ratkaisin alkupelin ennustettavuuden väliaikaisesti sekoittamalla mahdollisten
siirtojen listan minimaxin aikana, mutta tästä huonosta väliratkaisusta on
tarkoitus päästä ensi viikolla eroon. Sallittujen liikkeiden listaaminen ja
pelin loppumisen toteaminen on tällä hetkellä toteutettu shakkikirjaston avulla,
mutta korvaan ne omalla toteutuksella tulevien viikkojen aikana.

Käyttöliittymän suhteen suunnitelmat muuttuivat merkittävästi tällä viikolla.
Pelkän yksinkertaisen komentorivikäyttöliittymän sijaan toteutin integraation
Lichess-shakkisivuston kanssa. Sivusto tukee erillisiä bottikäyttäjiä ja sille
löytyy dokumentoitu vapaasti käytettävä API. Viikon aikana toteutettua
yksinkertaista tekoälyä vastaan voi nyt pelata sivuston käyttöliittymän kautta.
Shakkiohjelma hakee pelin tiedot ja uudet tapahtumat Lichess API:n kautta ja
lähettää sinne laskemansa siirrot reaaliajassa. Komentorivikäyttöliittymän rooli
muuttu yksinkertaiseksi botin kontrollipaneeliksi.

Suuri osa koodista meni käyttöliittymämuutosten takia uusiksi, joten
dokumentaatio ja testaus on väliaikaisesti vajaata. Aloitin kuitenkin viikolla
yksikkötestauksen ja myös testikattavuuden seurannan. Github Actions:in avulla
toteutettu CI-putki tarkistaa koodin laadun ja formatoinnin sekä suorittaa
testit ja laskee testikattavuuden aina uusien committien yhteydessä.

Ensi viikolla olisi tarkoitus keskittyä enemmän algoritmin parantamiseen, nyt
kun käyttöliittymän tilanne on hyvä. Testausta ja dokumentointia on tarkoitus
laajentaa ja mahdollisesti ottaa Denon sisäänrakennettu
benchmarking-toiminnallisuus käyttöön algoritmin tehokkuuden analysoinnissa.
