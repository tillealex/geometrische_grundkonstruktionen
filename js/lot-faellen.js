const steps = [
  {
    title: "Ausgangslage",
    actionType: "line-given",
    text: "Gegeben sind eine Gerade g und ein Punkt P außerhalb dieser Geraden. Gesucht ist das Lot von P auf die Gerade g.",
    visible: ["ausgangslage"]
  },
  {
    title: "Kreis um P zeichnen",
    actionType: "circle-draw",
    text: "Zeichne um P einen Kreis, der die Gerade g an zwei Stellen schneidet. Diese Schnittpunkte heißen A und B.",
    visible: ["ausgangslage", "kreisUmP"]
  },
  {
    title: "Bogen um A zeichnen",
    actionType: "arc-draw",
    text: "Stelle den Zirkel größer als die halbe Strecke AB ein und zeichne oberhalb der Geraden einen Bogen um A.",
    visible: ["ausgangslage", "kreisUmP", "bogenA"]
  },
  {
    title: "Bogen um B zeichnen",
    actionType: "arc-draw",
    text: "Zeichne mit derselben Zirkelweite einen Bogen um B. Die beiden Bögen schneiden sich im Punkt C.",
    visible: ["ausgangslage", "kreisUmP", "bogenA", "bogenB"]
  },
  {
    title: "Lot zeichnen",
    actionType: "result-highlight",
    text: "Verbinde P mit dem Schnittpunkt C. Die Gerade durch P und C steht senkrecht auf g. Der Schnittpunkt mit g ist der Lotfußpunkt L.",
    visible: ["ausgangslage", "kreisUmP", "bogenA", "bogenB", "lot"]
  }
];

initConstructionPlayer({
  steps,
  playbackDelay: 1600
});
