# PROJECT_CONTEXT.md

## Projektname

Geometrische Grundkonstruktionen

---

## Projektziel

Dieses Projekt ist eine lokal laufende Unterrichts-Webseite zu geometrischen Grundkonstruktionen. Schülerinnen und Schüler sollen zentrale Konstruktionen nicht nur als fertige Zeichnungen sehen, sondern Schritt für Schritt nachvollziehen können.

Die Webseite soll als Lernpfad funktionieren: Einfache Konstruktionen bilden die Grundlage für komplexere Konstruktionen. Die einzelnen Seiten verbinden eine ruhige SVG-Zeichnung, steuerbare Konstruktionsschritte, eine Legende und eine kurze fachliche Begründung.

---

## Zielgruppe

- Schülerinnen und Schüler der Sekundarstufe I
- besonders geeignet für Mathematikunterricht in Klasse 6/7
- Lehrkraft zur Demonstration am Beamer oder interaktiven Whiteboard
- Lernende zur selbstständigen Wiederholung grundlegender Konstruktionsverfahren

---

## Nutzungssituation

- lokal im Browser ohne Internetverbindung
- als Unterrichtsdemonstration
- als digitale Lernseite im Mathematikunterricht
- als Grundlage für eine spätere Veröffentlichung über GitHub Pages

---

## Aktueller Stand

Vorhanden ist eine erste funktionsfähige Projektstruktur mit:

- `index.html` als Übersichtsseite mit Konstruktionskarten
- Unterordner `konstruktionen/` für einzelne Konstruktionsseiten
- `css/style.css` als gemeinsame zentrale Gestaltung
- `js/` mit einzelnen JavaScript-Dateien für die Schrittlogik der Konstruktionen
- `README.md` mit Projektbeschreibung
- `LICENSE` mit GNU GPLv3

Aktive Konstruktionen:

- Strecke abtragen
- Winkel abtragen
- Senkrechte errichten
- Mittelsenkrechte
- Lot fällen

---

## Technische Struktur

Aktueller Grundaufbau:

```text
geometrische_grundkonstruktionen/
├── README.md
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

Rollen der zentralen Bereiche:

- `index.html`: Einstieg und Übersicht über den Lernpfad
- `konstruktionen/`: einzelne Fachseiten zu den Konstruktionen
- `css/style.css`: gemeinsames Layout, Karten, Buttons, SVG-Strichkonzept und Legende
- `js/`: Animationen und Schrittsteuerung der Konstruktionsseiten

---

## Wichtige Designentscheidungen

- Helles, ruhiges Unterrichtsdesign
- Schrittweise Darstellung statt überladener Gesamtdarstellung
- Konstruktion und Erklärung sollen klar getrennt, aber direkt nebeneinander bzw. unmittelbar zusammen sichtbar sein
- Die Legende steht direkt unter der jeweiligen Konstruktion
- Wiederkehrendes Strichkonzept:
  - gegebene Punkte: dunkle Punkte
  - gegebene Strecken: kräftige dunkle Linie
  - Hilfslinien und Hilfskreise: dünn, grau, gestrichelt
  - neu konstruierte Punkte: blau
  - fertige Konstruktion: kräftig grün
- Die Seite soll ohne Frameworks und ohne Server lokal funktionieren
- SVG eignet sich als zentrales Darstellungsformat für Konstruktionen

---

## Fachliche und didaktische Entscheidungen

- Die Konstruktionen sollen fachlich sauber, aber sprachlich für Lernende verständlich sein
- Jede Konstruktion braucht eine klare Schrittfolge
- Jede Seite soll beantworten:
  - Was wird konstruiert?
  - Welche Werkzeuge werden genutzt?
  - Welche Zwischenschritte entstehen?
  - Warum funktioniert die Konstruktion?
  - Wofür wird die Konstruktion später gebraucht?
- Komplexere Konstruktionen sollen auf bereits bekannten Grundkonstruktionen aufbauen
- Der Lernpfad soll vom Einfachen zum Komplexen führen

---

## Offene Aufgaben

Nächste inhaltliche Erweiterungen:

- Winkel halbieren ergänzen
- Winkel verdoppeln ergänzen
- Strecke in gleich große Teile teilen ergänzen
- Parallele konstruieren ergänzen
- Anwendungen wie Strecke vierteln und Quadrat mit gegebener Grundseite ergänzen
- Kreise am Dreieck ergänzen

Nächste technische Erweiterungen:

- gemeinsame Schrittsteuerung aus den einzelnen JS-Dateien auslagern
- wiederkehrende Konstruktionsseiten-Struktur vereinheitlichen
- stärkere Verlinkung zwischen Konstruktionsseiten ergänzen
- Beamer-Modus prüfen
- Druckansicht prüfen

---

## Bekannte Probleme und Risiken

- Die JavaScript-Dateien enthalten aktuell vermutlich wiederholte Schrittsteuerungslogik
- Jede neue Konstruktion könnte dadurch unnötig viel kopierten Code erzeugen
- Künftige Änderungen an Buttons, Play-Funktion, Reset oder Schrittanzeige müssten mehrfach gepflegt werden
- Die Architektur ist noch ausreichend für den Prototypen, sollte aber vor größeren Erweiterungen stabilisiert werden

---

## Arbeitsregeln für WILFRIED

- Keine unnötigen Frameworks einführen
- Lokale Nutzung ohne Server erhalten
- HTML, CSS und JavaScript getrennt halten
- Wiederkehrende Gestaltung in `css/style.css` bündeln
- Wiederkehrende Schrittsteuerung mittelfristig in eine gemeinsame Datei auslagern
- Fachliche Konstruktionslogik pro Konstruktion nachvollziehbar halten
- Bei größeren Änderungen zuerst betroffene Dateien und Vorgehen benennen
- Nach größeren Änderungen `README.md`, `PROJECT_CONTEXT.md` und `CHANGELOG.md` prüfen
- Commit-Messages auf Englisch formulieren, Erklärung auf Deutsch geben

---

## Letzter sinnvoller Git-Stand

Branch:

```text
main
```

Aktueller Dokumentationsbranch:

```text
docs/project-architecture
```

Empfohlener nächster Branch nach Abschluss der Dokumentation:

```text
refactor/shared-construction-player
```

---

## Nächster empfohlener Schritt

Als Nächstes sollte die gemeinsame Architektur der Konstruktionsseiten stabilisiert werden. Danach kann die wiederholte JavaScript-Schrittsteuerung in eine gemeinsame Datei ausgelagert werden, bevor neue Konstruktionen ergänzt werden.
