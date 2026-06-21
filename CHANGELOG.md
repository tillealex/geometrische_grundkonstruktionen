# CHANGELOG

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei festgehalten.

Das Format orientiert sich lose an [Keep a Changelog](https://keepachangelog.com/de/1.1.0/). Die Versionsnummern können später ergänzt werden, sobald das Projekt veröffentlichbare Zwischenstände erreicht.

---

## Unreleased

### Added

- `PROJECT_CONTEXT.md` als zentrales Projektgedächtnis ergänzt
- `ARCHITECTURE.md` zur Beschreibung der aktuellen und geplanten Projektstruktur ergänzt
- `CHANGELOG.md` zur nachvollziehbaren Änderungsdokumentation ergänzt

### Documented

- Projektziel als lokal laufende Unterrichts-Webseite zu geometrischen Grundkonstruktionen festgehalten
- aktuelle aktive Konstruktionen dokumentiert:
  - Strecke abtragen
  - Winkel abtragen
  - Senkrechte errichten
  - Mittelsenkrechte
  - Lot fällen
- zentrales Strichkonzept dokumentiert:
  - gegebene Punkte dunkel
  - gegebene Strecken kräftig dunkel
  - Hilfslinien und Hilfskreise dünn, grau, gestrichelt
  - neu konstruierte Punkte blau
  - fertige Konstruktion kräftig grün
- nächste technische Architekturentscheidung vorbereitet: gemeinsame Schrittsteuerung auslagern

### Planned

- gemeinsame JavaScript-Schrittsteuerung in `js/construction-player.js` auslagern
- bestehende Konstruktionen schrittweise auf die gemeinsame Steuerung umstellen
- Winkel halbieren ergänzen
- Winkel verdoppeln ergänzen
- Strecke in gleich große Teile teilen ergänzen
- Parallele konstruieren ergänzen
- Anwendungen ergänzen, z. B. Strecke vierteln und Quadrat mit gegebener Grundseite
- Beamer-Modus prüfen
- Druckansicht prüfen
- Konstruktionsseiten stärker untereinander verlinken

---

## Initialer Projektstand

### Added

- `index.html` als Übersichtsseite mit Konstruktionskarten
- Ordner `konstruktionen/` für einzelne Konstruktionsseiten
- `css/style.css` als gemeinsame Gestaltung
- JavaScript-Dateien im Ordner `js/` für einzelne Konstruktionsanimationen
- `README.md` mit Projektbeschreibung, Nutzungshinweisen und Erweiterungsideen
- `LICENSE` mit GNU General Public License v3.0

### Existing constructions

- Strecke abtragen
- Winkel abtragen
- Senkrechte errichten
- Mittelsenkrechte
- Lot fällen

### Known limitations

- allgemeine Schrittsteuerung ist noch nicht zentral ausgelagert
- neue Konstruktionen würden aktuell vermutlich wiederholte JavaScript-Logik benötigen
- Projektstruktur ist für den Prototypen ausreichend, sollte aber vor größeren Erweiterungen stabilisiert werden
