const { SEGMENT_DRAW, LINE_DRAW, COMPASS_MEASURE, DISTANCE_TRANSFER, RESULT_HIGHLIGHT } = window.ConstructionActionTypes;

const steps = [
  {
    title: "Ausgangsstrecke AB betrachten",
    actionType: SEGMENT_DRAW,
    text: "Die Strecke AB ist gegeben. Ihre Länge soll an einer neuen Stelle noch einmal konstruiert werden.",
    visible: ["gegebeneStrecke"]
  },
  {
    title: "Hilfsstrahl ab P zeichnen",
    actionType: LINE_DRAW,
    text: "Zeichne vom Punkt P aus einen langen Hilfsstrahl. Auf diesem Hilfsstrahl wird später die gleich lange Strecke markiert.",
    visible: ["gegebeneStrecke", "zielstrahl"]
  },
  {
    title: "Zirkelweite AB aufnehmen",
    actionType: COMPASS_MEASURE,
    text: "Stich den Zirkel in A ein und öffne ihn bis B. Damit ist die Länge der Strecke AB im Zirkel eingestellt.",
    visible: ["gegebeneStrecke", "zielstrahl", "zirkelweite"]
  },
  {
    title: "Länge AB auf den Hilfsstrahl übertragen",
    actionType: DISTANCE_TRANSFER,
    text: "Stich den Zirkel nun in P ein und schlage mit derselben Weite einen kurzen Bogen. Dort, wo der Bogen den Hilfsstrahl trifft, liegt der neue Endpunkt.",
    visible: ["gegebeneStrecke", "zielstrahl", "zirkelweite", "bogenP"]
  },
  {
    title: "Endpunkt Q und Strecke PQ markieren",
    actionType: RESULT_HIGHLIGHT,
    text: "Markiere den Schnittpunkt als Q und zeichne die Strecke PQ deutlich nach. Die Strecke PQ ist genauso lang wie die gegebene Strecke AB.",
    visible: ["gegebeneStrecke", "zielstrahl", "zirkelweite", "bogenP", "ergebnis"]
  }
];

initConstructionPlayer({
  steps
});