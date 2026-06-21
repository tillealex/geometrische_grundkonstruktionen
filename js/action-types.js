// Zentrale Definition der fachlichen Konstruktionsbausteine.
//
// Diese Datei enthält bewusst keine Zeichenlogik. Sie bündelt nur die
// verbindlichen actionType-Werte und die zugehörigen Metadaten, damit
// Konstruktionsschritte im gesamten Projekt konsistent benannt werden.

const ConstructionActionTypes = Object.freeze({
  POINT_MARK: "point-mark",
  SEGMENT_DRAW: "segment-draw",
  LINE_DRAW: "line-draw",
  CIRCLE_DRAW: "circle-draw",
  ARC_DRAW: "arc-draw",
  COMPASS_MEASURE: "compass-measure",
  COMPASS_KEEP: "compass-keep",
  DISTANCE_TRANSFER: "distance-transfer",
  INTERSECTION_MARK: "intersection-mark",
  RESULT_HIGHLIGHT: "result-highlight",

  // Ausgangslagen und spezielle didaktische Zustände
  ANGLE_GIVEN: "angle-given",
  LINE_GIVEN: "line-given"
});

const ConstructionActionTypeInfo = Object.freeze({
  [ConstructionActionTypes.POINT_MARK]: {
    label: "Punkt markieren",
    help: "Ein Punkt wird sichtbar gemacht oder als wichtiger Konstruktionspunkt festgelegt."
  },
  [ConstructionActionTypes.SEGMENT_DRAW]: {
    label: "Strecke zeichnen",
    help: "Eine begrenzte Linie zwischen zwei Punkten wird gezeichnet."
  },
  [ConstructionActionTypes.LINE_DRAW]: {
    label: "Gerade zeichnen",
    help: "Eine Linie wird durch einen oder zwei Punkte über den sichtbaren Abschnitt hinaus gedacht oder gezeichnet."
  },
  [ConstructionActionTypes.CIRCLE_DRAW]: {
    label: "Kreis zeichnen",
    help: "Ein Kreis zeigt alle Punkte, die vom Mittelpunkt denselben Abstand haben."
  },
  [ConstructionActionTypes.ARC_DRAW]: {
    label: "Kreisbogen zeichnen",
    help: "Nur der wichtige Teil eines Kreises wird gezeichnet, zum Beispiel dort, wo später ein Schnittpunkt entsteht."
  },
  [ConstructionActionTypes.COMPASS_MEASURE]: {
    label: "Zirkelweite aufnehmen",
    help: "Der Zirkel wird auf eine vorhandene Länge eingestellt. Diese Länge kann anschließend übertragen werden."
  },
  [ConstructionActionTypes.COMPASS_KEEP]: {
    label: "Zirkelweite beibehalten",
    help: "Die Zirkelöffnung bleibt unverändert, damit dieselbe Länge an einer anderen Stelle verwendet wird."
  },
  [ConstructionActionTypes.DISTANCE_TRANSFER]: {
    label: "Abstand übertragen",
    help: "Eine zuvor eingestellte Zirkelweite wird an einer anderen Stelle abgetragen."
  },
  [ConstructionActionTypes.INTERSECTION_MARK]: {
    label: "Schnittpunkt markieren",
    help: "Der Punkt, an dem sich Linien, Kreise oder Kreisbögen schneiden, wird markiert."
  },
  [ConstructionActionTypes.RESULT_HIGHLIGHT]: {
    label: "Ergebnis hervorheben",
    help: "Das eigentliche Ergebnis der Konstruktion wird deutlich markiert."
  },
  [ConstructionActionTypes.ANGLE_GIVEN]: {
    label: "Gegebener Winkel",
    help: "Ein vorhandener Winkel ist die Ausgangslage der Konstruktion."
  },
  [ConstructionActionTypes.LINE_GIVEN]: {
    label: "Gegebene Gerade",
    help: "Eine vorhandene Gerade ist die Ausgangslage der Konstruktion."
  }
});

window.ConstructionActionTypes = ConstructionActionTypes;
window.ConstructionActionTypeInfo = ConstructionActionTypeInfo;
