# Konstruktionsbausteine

Diese Datei sammelt die wiederkehrenden Grundhandlungen, aus denen die geometrischen Konstruktionen im Projekt aufgebaut werden.

Ziel ist eine einheitliche Sprache und Darstellung auf allen Konstruktionsseiten. Die Bausteine sollen später auch im Code konsistent abgebildet werden, damit neue Konstruktionen nicht jedes Mal neu erfunden werden müssen.

---

## 1. Grundidee

Eine vollständige geometrische Konstruktion besteht aus mehreren kleineren Bausteinen.

Beispiel:

```text
Strecke abtragen
= Zirkelweite aufnehmen
+ Kreis oder Kreisbogen zeichnen
+ Schnittpunkt markieren
+ Ergebnisstrecke hervorheben
```

Diese Bausteine sollen im Projekt einheitlich benannt, erklärt und grafisch dargestellt werden.

---

## 2. Ebenen der Konstruktion

### 2.1 Elementare Zeichenhandlungen

Das sind einzelne sichtbare Aktionen in der Zeichnung.

Beispiele:

- Punkt setzen
- Strecke zeichnen
- Gerade zeichnen
- Kreis zeichnen
- Kreisbogen zeichnen
- Schnittpunkt markieren

### 2.2 Konstruktionstechnische Teilschritte

Das sind wiederkehrende Mini-Handlungen, die aus mehreren Zeichenhandlungen bestehen können.

Beispiele:

- Zirkelweite aufnehmen
- Zirkelweite beibehalten
- Abstand übertragen
- Hilfslinie zeichnen
- Ergebnislinie hervorheben

### 2.3 Vollständige Grundkonstruktionen

Das sind ganze Verfahren aus mehreren Bausteinen.

Beispiele:

- Strecke abtragen
- Winkel abtragen
- Senkrechte errichten
- Mittelsenkrechte konstruieren
- Lot fällen
- Winkel halbieren
- Parallele konstruieren
- Strecke teilen

---

## 3. Verbindliche Bausteine

Die folgende Tabelle ist der aktuelle Standard für Sprache, Darstellung und spätere Codeumsetzung.

| Baustein | Bedeutung | Schülergerechte Formulierung | Grafische Darstellung | Hinweise für Code |
|---|---|---|---|---|
| Punkt setzen | Ein neuer Punkt wird festgelegt. | Setze den Punkt P. | Neuer Punkt blau, gegebene Punkte dunkel. | `actionType: "point-create"` |
| Punkt beschriften | Ein Punkt erhält einen Namen. | Beschrifte den Punkt mit P. | Textlabel nahe am Punkt. | Label sollte getrennt ein- und ausblendbar sein. |
| Strecke zeichnen | Zwei Punkte werden durch eine begrenzte Linie verbunden. | Zeichne die Strecke AB. | Durchgezogene Linie zwischen zwei Punkten. | `actionType: "segment-draw"` |
| Gerade zeichnen | Eine unbegrenzte Linie durch zwei Punkte wird dargestellt. | Zeichne die Gerade durch A und B. | Linie über beide Punkte hinaus. | `actionType: "line-draw"` |
| Strecke verlängern | Eine vorhandene Strecke wird über einen Endpunkt hinaus fortgesetzt. | Verlängere die Strecke AB über B hinaus. | Fortsetzung der Linie, meist als Hilfslinie. | Nicht mit vollständiger Gerade verwechseln. |
| Zirkelweite aufnehmen | Der Zirkel wird auf eine vorhandene Länge eingestellt. | Stelle den Zirkel auf die Länge AB ein. | Strecke oder Abstand wird aktiv hervorgehoben. | `actionType: "compass-measure"` |
| Zirkelweite beibehalten | Die Zirkelöffnung bleibt unverändert. | Verändere die Zirkelöffnung jetzt nicht mehr. | Keine neue Linie nötig; ggf. Hinweistext. | Wichtig für Schritttexte und Begründungen. |
| Kreis zeichnen | Alle Punkte mit gleichem Abstand zu einem Mittelpunkt werden dargestellt. | Zeichne einen Kreis um A mit der Zirkelweite AB. | Vollständiger Kreis, meist Hilfslinie. | `actionType: "circle-draw"` |
| Kreisbogen zeichnen | Nur ein relevanter Teil eines Kreises wird gezeichnet. | Zeichne einen Kreisbogen um A. | Teilkreis, meist Hilfslinie oder hervorgehoben. | `actionType: "arc-draw"` |
| Abstand übertragen | Eine aufgenommene Länge wird an anderer Stelle verwendet. | Übertrage die Länge AB von P aus. | Kreis/Kreisbogen am neuen Mittelpunkt. | Baut meist auf `compass-measure` auf. |
| Schnittpunkt markieren | Der Schnitt zweier Linien, Kreise oder Kreisbögen wird als Punkt festgelegt. | Markiere den oberen Schnittpunkt S. | Neuer Schnittpunkt blau. | `actionType: "intersection-mark"`; Richtung möglichst eindeutig angeben. |
| Hilfslinie zeichnen | Eine Linie hilft bei der Konstruktion, ist aber nicht das Ergebnis. | Zeichne eine Hilfslinie. | Grau und gestrichelt. | CSS-Klasse für Hilfselemente verwenden. |
| Ergebnislinie hervorheben | Das fertige Ergebnis wird sichtbar gemacht. | Die grüne Linie ist das Ergebnis. | Grün und kräftiger als Hilfslinien. | CSS-Klasse für Ergebnis verwenden. |
| Konstruktion begründen | Der mathematische Grund der Konstruktion wird erklärt. | Warum funktioniert das? | Textbereich unter der Konstruktion. | Kein SVG-Schritt, aber didaktisch verpflichtend. |

---

## 4. Präzisierungen zu wichtigen Bausteinen

### 4.1 Kreis oder Kreisbogen

Ein Kreis ist fachlich die Menge aller Punkte mit gleichem Abstand zu einem Mittelpunkt.

Ein Kreisbogen ist nur ein sichtbarer Teil dieses Kreises.

Regel für das Projekt:

- Wir sprechen von Kreis, wenn der vollständige Kreis fachlich wichtig ist.
- Wir sprechen von Kreisbogen, wenn nur ein Teil des Kreises für die Konstruktion benötigt wird.
- In der Zeichnung darf aus Gründen der Übersichtlichkeit ein Kreisbogen gezeigt werden, auch wenn fachlich ein Kreis zugrunde liegt.

Beispiel:

```text
Für die Mittelsenkrechte reichen Kreisbögen oberhalb und unterhalb der Strecke.
Fachlich gehören diese Bögen zu Kreisen um A und B mit gleicher Zirkelweite.
```

---

### 4.2 Zirkelweite aufnehmen, beibehalten und übertragen

Diese drei Begriffe sollen nicht vermischt werden.

| Begriff | Bedeutung |
|---|---|
| Zirkelweite aufnehmen | Der Zirkel wird auf eine vorhandene Länge eingestellt. |
| Zirkelweite beibehalten | Die Zirkelöffnung wird nicht verändert. |
| Abstand übertragen | Die eingestellte Länge wird an anderer Stelle verwendet. |

Schülergerechte Standardsätze:

```text
Stelle den Zirkel auf die Länge AB ein.
Verändere die Zirkelöffnung jetzt nicht mehr.
Übertrage die Länge von P aus.
```

---

### 4.3 Schnittpunkte eindeutig benennen

Wenn es mehrere Schnittpunkte gibt, muss die Beschreibung eindeutig sein.

Gute Formulierungen:

```text
Markiere den oberen Schnittpunkt S.
Markiere den unteren Schnittpunkt T.
Markiere den rechten Schnittpunkt C.
Markiere beide Schnittpunkte S und T.
```

Zu ungenau:

```text
Markiere den Schnittpunkt.
```

Diese Formulierung ist nur dann sinnvoll, wenn wirklich nur ein Schnittpunkt sichtbar oder relevant ist.

---

### 4.4 Strecke, Halbgerade und Gerade

Diese Begriffe sollen sauber unterschieden werden.

| Begriff | Bedeutung |
|---|---|
| Strecke | Begrenzte Linie zwischen zwei Punkten. |
| Halbgerade | Beginnt in einem Punkt und läuft in eine Richtung weiter. |
| Gerade | Läuft in beide Richtungen unbegrenzt weiter. |

Für die Webseite gilt:

- Wenn nur die Verbindung zweier Punkte gebraucht wird, heißt es Strecke.
- Wenn über beide Punkte hinaus konstruiert wird, heißt es Gerade.
- Wenn nur über einen Endpunkt hinaus verlängert wird, heißt es Strecke verlängern oder Halbgerade.

---

### 4.5 Hilfselemente und Ergebnis

Hilfselemente und Ergebnis dürfen nicht gleich aussehen.

Standard:

```text
Gegebene Punkte: dunkel
Neue Punkte und Schnittpunkte: blau
Hilfslinien und Hilfskreise: grau, gestrichelt
Aktive Elemente: farblich hervorgehoben
Ergebnis: grün, klar sichtbar
```

Didaktische Regel:

```text
Alles, was nur beim Konstruieren hilft, bleibt grau oder gestrichelt.
Alles, was das eigentliche Ergebnis ist, wird grün hervorgehoben.
```

---

## 5. Standardform für spätere JavaScript-Schritte

Die bestehenden Konstruktionsseiten nutzen aktuell einfache Schrittlisten mit `title`, `text`, `show` und `active`.

Langfristig sollen diese Schritte um einen fachlichen Bausteintyp ergänzt werden können.

Mögliche spätere Struktur:

```js
{
  title: "Zirkelweite aufnehmen",
  text: "Stelle den Zirkel auf die Länge AB ein.",
  actionType: "compass-measure",
  show: ["point-a", "point-b", "segment-ab"],
  active: ["segment-ab"]
}
```

Vorteile:

- gleiche Bausteine bekommen gleiche Namen,
- Schritttexte werden einheitlicher,
- spätere Hilfen oder Symbole können nach `actionType` gesteuert werden,
- neue Konstruktionen lassen sich schneller erstellen,
- die didaktische Sprache bleibt konsistent.

---

## 6. Aktueller Abgleich mit vorhandenen Konstruktionen

| Konstruktion | Bereits enthaltene zentrale Bausteine |
|---|---|
| Strecke abtragen | Zirkelweite aufnehmen, Kreis zeichnen, Schnittpunkt markieren, Ergebnisstrecke hervorheben |
| Winkel abtragen | Kreisbogen zeichnen, Zirkelweite aufnehmen, Abstand übertragen, Schnittpunkt markieren, Ergebnisstrahl zeichnen |
| Senkrechte errichten | Punkte auf Gerade wählen, Kreisbögen zeichnen, Schnittpunkt markieren, Gerade zeichnen |
| Mittelsenkrechte | Zirkelweite beibehalten, Kreisbögen zeichnen, Schnittpunkte markieren, Gerade durch Schnittpunkte zeichnen |
| Lot fällen | Kreis/Kreisbogen um Punkt, Schnittpunkte auf Gerade, Kreisbögen zeichnen, Lotgerade hervorheben |

---

## 7. Offene fachliche Klärungen

Diese Punkte sollten bei kommenden Konstruktionen besonders sorgfältig geprüft werden:

- Wann sprechen wir im Text von Kreis, wann von Kreisbogen?
- Welche Schnittpunkte müssen durch Lagewörter eindeutig beschrieben werden?
- Wann ist eine Linie Strecke, Halbgerade oder Gerade?
- Welche Elemente sind reine Hilfselemente?
- Welches Element ist das eigentliche Ergebnis?
- Muss eine Zirkelweite aufgenommen, beibehalten oder übertragen werden?

---

## 8. Arbeitsregel für neue Konstruktionsseiten

Vor dem Anlegen einer neuen Konstruktionsseite wird die Konstruktion zuerst in Bausteine zerlegt.

Beispiel:

```text
Winkel halbieren
1. Kreisbogen um Scheitelpunkt zeichnen
2. Schnittpunkte auf den Schenkeln markieren
3. Gleiche Zirkelweite an beiden Schnittpunkten verwenden
4. Schnittpunkt der Kreisbögen markieren
5. Halbierende Gerade zeichnen
6. Ergebnis hervorheben und begründen
```

Erst danach werden HTML, SVG und JavaScript erstellt.
