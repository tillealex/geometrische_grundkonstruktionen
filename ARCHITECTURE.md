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

Die Webseite soll lokal durch Öffnen der `index.html` im Browser funktionieren.

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
├── js/
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

Die HTML-Datei soll fachliche Struktur und SVG-Elemente enthalten, aber keine große Steuerlogik.

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

### `js/*.js`

Aktuell besitzt jede Konstruktion eine eigene JavaScript-Datei.

Diese Dateien enthalten im Moment zwei Arten von Logik:

1. allgemeine Schrittsteuerung
2. konkrete Sichtbarkeit und Texte der jeweiligen Konstruktion

Das ist für den Prototypen verständlich, führt aber bei weiteren Konstruktionen zu Wiederholungen.

---

## Aktuelles Architekturproblem

Die Schrittsteuerung ist wahrscheinlich in mehreren JS-Dateien ähnlich aufgebaut:

- aktueller Schritt
- Schritt anzeigen
- vorwärts / zurück
- abspielen / stoppen
- zurücksetzen
- Labels ein- und ausblenden
- SVG-Elemente je Schritt sichtbar machen

Diese Logik sollte mittelfristig nicht in jeder Konstruktionsdatei erneut stehen.

---

## Zielarchitektur nach dem nächsten Refactoring

Empfohlene nächste Struktur:

```text
js/
├── construction-player.js
├── strecke-abtragen.js
├── winkel-abtragen.js
├── senkrechte-errichten.js
├── mittelsenkrechte.js
└── lot-faellen.js
```

### `construction-player.js`

Diese Datei soll die allgemeine Steuerung übernehmen:

- Schrittindex verwalten
- Buttons verbinden
- Schritttext anzeigen
- Play-/Pause-Funktion steuern
- Reset ausführen
- optionale Labels ein- und ausblenden
- SVG-Elemente anhand von Schrittdefinitionen sichtbar machen

### einzelne Konstruktionsdateien

Die einzelnen Dateien sollen danach nur noch die fachliche Konfiguration enthalten:

```js
const steps = [
  {
    title: "Schritt 1",
    text: "...",
    visible: ["element-id-1", "element-id-2"]
  }
];

initConstructionPlayer({
  steps
});
```

Das ist nur ein Zielbild. Vor der Umsetzung muss die tatsächliche vorhandene JS-Struktur geprüft werden.

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
svg-helper
svg-result
```

---

## Konstruktionsseiten: empfohlener Standardaufbau

Neue Konstruktionsseiten sollen möglichst diesem Aufbau folgen:

```html
<header>
  <!-- Titel und Zurück-Link -->
</header>

<main>
  <section class="concept-box">
    <!-- Was wird konstruiert? -->
  </section>

  <section class="construction-layout">
    <div class="drawing-panel">
      <!-- SVG -->
    </div>

    <aside class="step-panel">
      <!-- Schritttext und Buttons -->
    </aside>
  </section>

  <section class="legend">
    <!-- Strichkonzept -->
  </section>

  <section class="reason-box">
    <!-- Warum funktioniert das? -->
  </section>
</main>
```

Die konkrete vorhandene HTML-Struktur darf davon abweichen, sollte aber langfristig in diese Richtung vereinheitlicht werden.

---

## Erweiterungsstrategie

Vor neuen Konstruktionen sollte zuerst die gemeinsame Schrittsteuerung ausgelagert werden.

Empfohlene Reihenfolge:

1. Dokumentation und Architekturstand festhalten
2. gemeinsame Schrittsteuerung extrahieren
3. eine bestehende Konstruktion testweise auf die neue Steuerung umstellen
4. danach weitere bestehende Konstruktionen umstellen
5. erst danach neue Konstruktionen ergänzen

Vorteil:

Neue Konstruktionen können später schneller erstellt werden, weil nur noch die fachlichen Schritte und SVG-Elemente ergänzt werden müssen.

---

## Teststrategie

Nach jeder größeren Änderung sollten mindestens folgende Punkte geprüft werden:

- `index.html` öffnet lokal im Browser
- alle Konstruktionskarten führen zur richtigen Seite
- jede Konstruktionsseite lädt CSS und JS korrekt
- Schritt vor / zurück funktioniert
- Abspielen funktioniert
- Zurücksetzen funktioniert
- Legende bleibt sichtbar und verständlich
- SVG-Elemente erscheinen im richtigen Schritt
- keine JavaScript-Fehler in der Browser-Konsole

---

## Dokumentationsregel

Nach größeren Änderungen prüfen:

- Muss `README.md` aktualisiert werden?
- Muss `PROJECT_CONTEXT.md` aktualisiert werden?
- Muss `CHANGELOG.md` ergänzt werden?
- Muss `ARCHITECTURE.md` angepasst werden?

Besonders bei neuen Konstruktionen muss mindestens `PROJECT_CONTEXT.md` und `CHANGELOG.md` geprüft werden.

---

## Git-Regel

Für größere Änderungen eigene Branches verwenden.

Beispiele:

```text
docs/project-architecture
refactor/shared-construction-player
feat/winkel-halbieren
feat/strecke-teilen
style/beamer-mode
```

Commit-Messages kurz und auf Englisch:

```text
docs: add architecture overview
refactor: extract shared construction step controller
feat: add angle bisector construction
style: add beamer mode
```
