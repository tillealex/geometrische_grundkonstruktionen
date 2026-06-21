# ARCHITECTURE.md

## Ziel dieser Datei

Diese Datei beschreibt den aktuellen technischen Aufbau des Projekts und hält fest, welche Architekturentscheidungen bewusst getroffen wurden. Sie dient als Orientierung, bevor neue Konstruktionen ergänzt oder bestehende Dateien refaktoriert werden.

---

## Projektart

Das Projekt ist eine statische Lernwebseite mit mehreren Unterseiten.

Es verwendet bewusst:

- HTML für Seitenstruktur und Inhalte
- CSS für Layout, Gestaltung und Strichkonzept
- JavaScript für Schrittsteuerung und Animationen
- SVG für geometrische Zeichnungen

Es verwendet bewusst nicht:

- Frameworks wie React, Vue oder Angular
- Build-Systeme
- externe Serverlogik
- unnötige Abhängigkeiten

Die Webseite soll lokal durch Öffnen der `index.html` im Browser funktionieren und ebenso über GitHub Pages veröffentlicht werden können.

---

## Aktuelle Ordnerstruktur

```text
geometrische_grundkonstruktionen/
├── README.md
├── PROJECT_CONTEXT.md
├── CHANGELOG.md
├── ARCHITECTURE.md
├── LICENSE
├── index.html
├── css/
│   └── style.css
├── docs/
│   └── konstruktionsbausteine.md
├── js/
│   ├── action-types.js
│   ├── construction-player.js
│   ├── strecke-abtragen.js
│   ├── winkel-abtragen.js
│   ├── senkrechte-errichten.js
│   ├── mittelsenkrechte.js
│   └── lot-faellen.js
└── konstruktionen/
    ├── strecke-abtragen.html
    ├── winkel-abtragen.html
    ├── senkrechte-errichten.html
    ├── mittelsenkrechte.html
    └── lot-faellen.html
```

---

## Zuständigkeiten der Dateien

### `index.html`

Die Startseite bildet den Lernpfad ab. Sie zeigt die verfügbaren Konstruktionen als Karten und ordnet sie nach Schwierigkeit bzw. fachlicher Reihenfolge.

Aufgabe der Startseite:

- Einstieg in das Projekt
- Übersicht über aktive und geplante Konstruktionen
- Navigation zu den einzelnen Konstruktionsseiten
- didaktische Struktur des Lernpfads sichtbar machen

---

### `konstruktionen/*.html`

Jede HTML-Datei im Ordner `konstruktionen/` beschreibt genau eine Konstruktion.

Typischer Aufbau einer Konstruktionsseite:

1. Kopfbereich mit Titel und Navigation zurück zur Übersicht
2. Konzeptbox: Was wird konstruiert?
3. Konstruktionsbereich mit SVG-Zeichnung
4. Schrittbeschreibung mit Steuerbuttons
5. Legende zum Strichkonzept
6. Erklärung: Warum funktioniert die Konstruktion?
7. Hinweise oder Links zu weiterführenden Konstruktionen

Die HTML-Datei enthält fachliche Struktur und SVG-Elemente, aber keine große Steuerlogik.

Alle aktiven Konstruktionsseiten laden am Ende die JavaScript-Dateien in dieser Reihenfolge:

```html
<script src="../js/action-types.js"></script>
<script src="../js/construction-player.js"></script>
<script src="../js/strecke-abtragen.js"></script>
```

Die Reihenfolge ist wichtig:

1. `action-types.js` stellt die zentralen fachlichen Typen bereit.
2. `construction-player.js` stellt die gemeinsame Schrittsteuerung bereit.
3. Die konstruktionsspezifische Datei definiert die Schritte und startet den Player.

---

### `css/style.css`

Die CSS-Datei ist die zentrale Gestaltungsquelle.

Sie enthält:

- Grundlayout
- Karten auf der Startseite
- Konstruktionsseiten-Layout
- Buttons
- Legende
- SVG-Strichkonzept
- Farben und Abstände über CSS-Variablen

Wichtige Regel:

Wiederkehrende Designentscheidungen gehören nicht in einzelne HTML-Dateien, sondern in `css/style.css`.

---

### `js/action-types.js`

Diese Datei bündelt die zentralen fachlichen Typen der Konstruktionsschritte.

Sie enthält:

- `ConstructionActionTypes`: Konstanten für die verbindlichen `actionType`-Werte
- `ConstructionActionTypeInfo`: Label und kurze Hilfe zu jedem Typ

Beispiel:

```js
ConstructionActionTypes.COMPASS_MEASURE // "compass-measure"
```

Die Metadaten sind bereits vorbereitet, damit spätere Schritte die Bausteine sichtbar anzeigen oder kurze Hilfetexte ausgeben können.

Beispiel:

```js
ConstructionActionTypeInfo[ConstructionActionTypes.COMPASS_MEASURE]
```

liefert sinngemäß:

```js
{
  label: "Zirkelweite aufnehmen",
  help: "Der Zirkel wird auf eine vorhandene Länge eingestellt."
}
```

`action-types.js` enthält bewusst keine Animation und keine DOM-Steuerung. Die Datei ist nur die zentrale Quelle für fachliche Typen und deren Bedeutungen.

---

### `js/construction-player.js`

Diese Datei bündelt die allgemeine Steuerung, die auf den Konstruktionsseiten wiederkehrt.

Sie übernimmt:

- Schrittindex verwalten
- Buttons verbinden
- Schritttext anzeigen
- Play-/Pause-Funktion steuern
- Reset ausführen
- Labels ein- und ausblenden
- SVG-Elemente anhand von Schrittdefinitionen sichtbar machen
- das jeweils zuletzt sichtbare Element als aktiv hervorheben

Die Funktion wird so genutzt:

```js
initConstructionPlayer({
  steps
});
```

Optional kann pro Konstruktion eine andere Abspielgeschwindigkeit gesetzt werden:

```js
initConstructionPlayer({
  steps,
  playbackDelay: 1600
});
```

`construction-player.js` nutzt aktuell `title`, `text`, `visible` und optional `active`. Das Feld `actionType` wird als fachliche Zusatzinformation mitgeführt. Die sichtbare Auswertung von `actionType` ist ein geplanter nächster Schritt.

---

### einzelne Konstruktionsdateien in `js/`

Die einzelnen Konstruktionsdateien enthalten nur noch die fachliche Konfiguration und bei Bedarf sehr kleine konstruktionsspezifische Vorbereitungen.

Standardform:

```js
const { COMPASS_MEASURE } = window.ConstructionActionTypes;

const steps = [
  {
    title: "Zirkelweite aufnehmen",
    actionType: COMPASS_MEASURE,
    text: "Stelle den Zirkel auf die Länge AB ein.",
    visible: ["point-a", "point-b", "segment-ab"],
    active: ["segment-ab"]
  }
];

initConstructionPlayer({
  steps
});
```

`actionType` beschreibt den fachlichen Konstruktionsbaustein eines Schrittes. Die verbindlichen Bausteine stehen in `docs/konstruktionsbausteine.md`; die technischen Konstanten und Metadaten stehen in `js/action-types.js`.

Typische Konstanten sind:

```text
SEGMENT_DRAW
LINE_DRAW
CIRCLE_DRAW
ARC_DRAW
COMPASS_MEASURE
COMPASS_KEEP
DISTANCE_TRANSFER
INTERSECTION_MARK
RESULT_HIGHLIGHT
```

Sondertypen für Ausgangslagen:

```text
ANGLE_GIVEN
LINE_GIVEN
```

Aktueller Stand:

- `strecke-abtragen.js` nutzt zentrale Action-Type-Konstanten.
- `winkel-abtragen.js` nutzt zentrale Action-Type-Konstanten.
- `senkrechte-errichten.js` nutzt zentrale Action-Type-Konstanten.
- `mittelsenkrechte.js` nutzt zentrale Action-Type-Konstanten und enthält zusätzlich eine kleine Zeichnungskorrektur.
- `lot-faellen.js` nutzt zentrale Action-Type-Konstanten.

Damit ist die gemeinsame Schrittsteuerung für alle aktuell aktiven Konstruktionsseiten ausgerollt und die vorhandenen Schrittlisten sind fachlich typisiert.

---

## Namensregeln

Dateinamen sollen klein geschrieben und mit Bindestrichen getrennt werden:

```text
winkel-halbieren.html
winkel-halbieren.js
strecke-teilen.html
strecke-teilen.js
```

SVG-IDs sollen sprechend sein:

```text
point-a
point-b
circle-a
circle-b
arc-highlight-a
result-line
helper-line
```

CSS-Klassen sollen fachlich oder funktional benannt werden:

```text
construction-card
construction-panel
step-box
legend-item
```
