const { LINE_GIVEN, CIRCLE_DRAW, ARC_DRAW, RESULT_HIGHLIGHT } = window.ConstructionActionTypes;

const steps = [
  {
    title: "Ausgangslage",
    actionType: LINE_GIVEN,
    text: "Gegeben sind eine Gerade g und ein Punkt P außerhalb dieser Geraden. Gesucht ist das Lot von P auf die Gerade g.",
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
    text: "Stelle den Zirkel größer als die halbe Strecke AB ein und zeichne oberhalb der Geraden einen Bogen um A.",
    visible: ["ausgangslage", "kreisUmP", "bogenA"]
  },
  {
    title: "Bogen um B zeichnen",
    actionType: ARC_DRAW,
    text: "Zeichne mit derselben Zirkelweite einen Bogen um B. Die beiden Bögen schneiden sich im Punkt C.",
    visible: ["ausgangslage", "kreisUmP", "bogenA", "bogenB"]
  },
  {
    title: "Lot zeichnen",
    actionType: RESULT_HIGHLIGHT,
    text: "Verbinde P mit dem Schnittpunkt C. Die Gerade durch P und C steht senkrecht auf g. Der Schnittpunkt mit g ist der Lotfußpunkt L.",
    visible: ["ausgangslage", "kreisUmP", "bogenA", "bogenB", "lot"]
  }
];

initConstructionPlayer({
  steps,
  playbackDelay: 1600
});
