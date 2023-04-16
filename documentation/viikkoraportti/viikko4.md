# Viikkoraportti 4

### Käytetty aika

Tällä viikolla ja pääsiäisloman aikana yhteensä n. 15 tuntia.

## Raportti

Valtaosa ajasta on mennyt shakkipelilogiikan toteuttamiseen. Pääsin kokonaan
eroon chess.js-kirjastosta, mutta prosessi oli odotettua työläämpi.
Ohestalyönti, rajatapauksissa oikeellinen tornitus ym. on vielä toteuttamatta ja
sovelluksen suorituskyky kärsi ainakin väliaikaisesti.

Itse kirjoitetun peliloogikan testaus osana jo toteutettua Minimax-algoritmia ja
Lichess-integraatiota vaati käytännössä koko pelinkulun ohjelmointia alusta
loppuun. Täysin oletettavasti sadat rivit uutta koodia eivät toiminetkaan täysin
halutulla tavalla, vaan tekoäly pelasikin merkittävästi huonommin. Hankalahkon
manuaalisen testauksen jälkeen mm. JavaScript-objektin väärään kopiotumiseen ja
pelaajien vuorojen oikeaoppiseen seuraamiseen liittyvät bugit löytyivät ja
tekoäly on jälleen yhtä kykenevä kuin ennen chess.js-kirjastosta luopumista.

Kaikki siirrot on nyt testattu kattavasti ja mm. ylennykset ja tornitus on
toteutettu. Tämänhetkinen tornituksen tarkistamisessa käytetty shakkiruudun
turvallisuuden tarkistava funktio on erittäin huonosti toteutettu, koska se
laskeen kaikkien nappuloiden mahdolliset siirrot uudestaan, joka kierroksella.
Kuninkaan turvallisuuden erillinen tarkistaminen vaatisi tehokkaamaan funktion,
mutta tekoäly sinänsä valitsee aina sallitun siirron ilmankin tarkistusta, koska
kuninkaan arvo on määritelty niin suureksi evaluaatiofunktiossa.

Laajensin testausta selvästi nyt kun sovelluksen rakenne on alkanut vakiintua.
Pelilogiikan hoitavia funktioita olisi hyvä refaktoroida pienemmiksi. Tämän
lisäksi ainakin ohestalyönti pitää toteuttaa ja mahdollisesti parannuksia
käyttömukavuuteen, kuten automaattinen haasteiden hyväksyntä Lichess-sivuston
kautta. Tekoälyn toiminnasta voisi myös raportoida komentorivisovelluksen
kautta. Esimerkiksi tämänhetkistä hakusyvyyttä ja molempien pelaajien tilanteita
tekoälyn evaluaatiofunktion mukaan olisi mielenkiintoista seurata.
