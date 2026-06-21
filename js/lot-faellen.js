const { LINE_GIVEN, CIRCLE_DRAW, ARC_DRAW, RESULT_HIGHLIGHT } = window.ConstructionActionTypes;

const steps = [
  {
    title: "Ausgangslage: Punkt P außerhalb von g",
    actionType: LINE_GIVEN,
    text: "Gegeben sind eine Gerade g und ein Punkt P außerhalb dieser Geraden. Gesucht ist das Lot von P auf g.",
    visible: ["ausgangslage"]
  },
  {
    title: "Kreis um P zeichnen",
    actionType: CIRCLE_DRAW,
    text: "Zeichne um P einen Kreis, der die Gerade g an zwei Stellen schneidet. Diese Schnittpunkte heißen A und B.",
    visible: ["ausgangslage", "kreisUmP"]
  },
  {
    title: "Bogen um A zeichnen",
    actionType: ARC_DRAW,
    text: "Stich den Zirkel in A ein. Wähle eine Zirkelweite, die größer als die Hälfte von AB ist, und zeichne oberhalb der Geraden einen Bogen.",
    visible: ["ausgangslage", "kreisUmP", "bogenA"]
  },
  {
    title: "Bogen um B mit gleicher Weite zeichnen",
    actionType: ARC_DRAW,
    text: "Verändere die Zirkelweite nicht. Stich in B ein und zeichne einen zweiten Bogen. Die beiden Bögen schneiden sich im Punkt C.",
    visible: ["ausgangslage", "kreisUmP", "bogenA", "bogenB"]
  },
  {
    title: "Lot durch P und C zeichnen",
    actionType: RESULT_HIGHLIGHT,
    text: "Zeichne die Gerade durch P und C deutlich nach. Sie steht senkrecht auf g. Ihr Schnittpunkt mit g ist der Lotfußpunkt L.",
    visible: ["ausgangslage", "kreisUmP", "bogenA", "bogenB", "lot"]
  }
];

initConstructionPlayer({
  steps,
  playbackDelay: 1600
});