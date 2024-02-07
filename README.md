## Projektbeschreibung
Diese Web-App stellt hauptsächlich einen Pokedex mit einigen Features dar. Wir haben insgesamt 3 Features:

- Pokedex:

Hier hat man die Möglichkeit, Informationen wie Attacken, Größe, Basiserfahrung, Typen usw. über die einzelnen Pokemon herauszufinden.
Es ist möglich, die Liste nach verschiedenen Kriterien zu filtern.
Man kann sich entweder eine zufällige Beschreibung des Pokemons geben lassen oder von der KI eine Beschreibung generieren lassen.

- Kampf:

In diesem Feature kann man 2 Pokemons auswählen und sie gegeneinander kämpfen lassen (Klick auf das VS-Zeichen).
Der Gewinner wird anhand seines Typs bestimmt.

- Custom Pokemon:

Hier kann man über ein Formular sein eigenes Pokemon erstellen und sämtliche Informationen ausfüllen.
Das Bild des Pokemons wird zufällig generiert, und man hat die Möglichkeit, sich immer ein neues zufälliges Bild generieren zu lassen.

## Informationen über den Pokemon Context
Die Pokemons werden am Anfang einmalig im "PokemonContext" gefetcht und dann an die Komponenten weitergereicht. Wir fetchen die Pokemons bis zur 4. Generation (letztes ist Arceus). Die zufälligen Bilder bei Custom Pokemon stammen aus der 5. Generation, um Duplikate zu vermeiden.

## Informationen zur KI
Für das Erstellen der Beschreibung via KI benutzen wir dieses Modell: https://github.com/PawanOsman/ChatGPT.

Da diese KI kostenlos nutzbar ist und ein selbst trainiertes Modell verwendet, ist sie leider nicht zu 100% akkurat. Die Erfolgschance auf eine gute Beschreibung ist jedoch sehr hoch. Manchmal aber ignoriert sie Aufforderungen, z. B. zur Länge des Textes, was dazu führen kann, dass der Text manchmal überläuft. Zudem kann die KI nur mit dem Namen des Pokemons gefüttert werden, da sie mit zu vielen Informationen nicht umgehen kann.

Um die KI zu nutzen, ist ein Schlüssel erforderlich, weshalb ihr leider nicht auf euren Laptops darauf zugreifen könnt. Ihr könnt den Button jedoch trotzdem klicken; der Fehler wird behandelt. Wir haben eine Art Mock-API erstellt, wo ihr eine zufällige Beschreibung von 100 Zeichen erhalten könnt, damit ihr zumindest etwas sehen könnt. Einfach auf den Random-Button klicken

Die KI ist IP-gesperrt, und wir müssen den IP-Lock über Discord zurücksetzen, wenn wir uns mit dem Netzwerk der Hochschule verbinden. Sonst würden wir euch den Schlüssel einfach geben.

In der Demo wird aber alles über unseren Laptop funktionieren.

## Aufsetzen des Projektes
npm run dev
Keine weiteren Instanzen...

## Ordnerstruktur
├── src
|   └── components
|       └── feature     => Feature-basierte Komponenten (z. B. Fight oder Pokedex) 
|       └── shared      => Globale Komponenten (z. B. Button)
|   └── config          => Wichtige Konstanten und Informationen projektwelt
|   └── context         => Pokemon-Context, wo alle Pokemons gefetcht werden
|   └── pages           => Seiten
|       └── api         => API-Routen
|   └── theme           => Alles, was mit dem Theme zu tun hat (global, Variablen, Spacing) inkl. Utils fürs Styling, z. B. responsiveCSS()
|   └── utils           => Nützliche Helper und Tools, unter anderem Session-Methoden



