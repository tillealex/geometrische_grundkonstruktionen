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

Alle aktiven Konstruktionsseiten laden am Ende zuerst die gemeinsame Steuerung:

```html
<script src="../js/construction-player.js"></script>
```

und danach die konstruktionsspezifische Datei, zum Beispiel:

```html
<script src="../js/strecke-abtragen.js"></script>
```

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

`construction-player.js` nutzt aktuell `title`, `text`, `visible` und optional `active`. Das Feld `actionType` wird als fachliche Zusatzinformation mitgeführt, verändert die Steuerlogik aber noch nicht.

---

### einzelne Konstruktionsdateien in `js/`

Die einzelnen Konstruktionsdateien enthalten nur noch die fachliche Konfiguration und bei Bedarf sehr kleine konstruktionsspezifische Vorbereitungen.

Standardform:

```js
const steps = [
  {
    title: "Zirkelweite aufnehmen",
    actionType: "compass-measure",
    text: "Stelle den Zirkel auf die Länge AB ein.",
    visible: ["point-a", "point-b", "segment-ab"],
    active: ["segment-ab"]
  }
];

initConstructionPlayer({
  steps
});
```

`actionType` beschreibt den fachlichen Konstruktionsbaustein eines Schrittes. Die verbindlichen Bausteine stehen in `docs/konstruktionsbausteine.md`.

Typische Werte sind:

```text
segment-draw
line-draw
circle-draw
arc-draw
compass-measure
distance-transfer
intersection-mark
result-highlight
```

Sondertypen sind möglich, wenn sie eine Ausgangslage beschreiben, zum Beispiel:

```text
angle-given
line-given
```

Aktueller Stand:

- `strecke-abtragen.js` nutzt die gemeinsame Steuerung und typisierte Schritte.
- `winkel-abtragen.js` nutzt die gemeinsame Steuerung und typisierte Schritte.
- `senkrechte-errichten.js` nutzt die gemeinsame Steuerung und typisierte Schritte.
- `mittelsenkrechte.js` nutzt die gemeinsame Steuerung, typisierte Schritte und enthält zusätzlich eine kleine Zeichnungskorrektur.
- `lot-faellen.js` nutzt die gemeinsame Steuerung und typisierte Schritte.

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
