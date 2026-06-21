const { SEGMENT_DRAW, ARC_DRAW, INTERSECTION_MARK, RESULT_HIGHLIGHT } = window.ConstructionActionTypes;

const steps = [
  {
    title: "Ausgangsstrecke AB betrachten",
    actionType: SEGMENT_DRAW,
    text: "Gegeben ist die Strecke AB. Gesucht ist die Mittelsenkrechte: eine Gerade, die AB halbiert und senkrecht auf AB steht.",
    visible: ["strecke"]
  },
  {
    title: "Bögen um A zeichnen",
    actionType: ARC_DRAW,
    text: "Stich den Zirkel in A ein. Wähle eine Zirkelweite, die größer als die Hälfte von AB ist, und zeichne Bögen oberhalb und unterhalb der Strecke.",
    visible: ["strecke", "kreisA"]
  },
  {
    title: "Bögen um B mit gleicher Weite zeichnen",
    actionType: ARC_DRAW,
    text: "Verändere die Zirkelweite nicht. Stich in B ein und zeichne entsprechende Bögen. Dort, wo sich die Bögen treffen, entstehen zwei Schnittpunkte.",
    visible: ["strecke", "kreisA", "kreisB"]
  },
  {
    title: "Schnittpunkte C und D markieren",
    actionType: INTERSECTION_MARK,
    text: "Markiere die beiden Schnittpunkte der Hilfsbögen. Wir nennen sie C und D.",
    visible: ["strecke", "kreisA", "kreisB", "schnittpunkte"]
  },
  {
    title: "Mittelsenkrechte durch C und D zeichnen",
    actionType: RESULT_HIGHLIGHT,
    text: "Zeichne die Gerade durch C und D deutlich nach. Sie ist die Mittelsenkrechte der Strecke AB und schneidet AB im Mittelpunkt M.",
    visible: ["strecke", "kreisA", "kreisB", "schnittpunkte", "ergebnis"]
  }
];

function korrigiereZeichnung() {
  // Die alten, blassen Spiegelbögen werden vollständig entfernt.
  // Für die Schüler sollen nur die tatsächlich zu zeichnenden Zirkelbögen
  // in der Nähe der Schnittpunkte hervorgehoben werden.
  document.querySelectorAll(".hidden-arc").forEach(element => {
    element.remove();
  });

  // Die Beschriftung der Mittelsenkrechten steht weiter oben,
  // damit sie nicht mit der Mittelpunktsbeschriftung M kollidiert.
  const mittelsenkrechteLabel = document.querySelector("#ergebnis .text-large");
  if (mittelsenkrechteLabel) {
    mittelsenkrechteLabel.setAttribute("y", "58");
  }
}

korrigiereZeichnung();

initConstructionPlayer({
  steps,
  playbackDelay: 1800
});