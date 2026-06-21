const { LINE_GIVEN, DISTANCE_TRANSFER, ARC_DRAW, INTERSECTION_MARK, RESULT_HIGHLIGHT } = window.ConstructionActionTypes;

const steps = [
  {
    title: "Gerade mit Punkt P",
    actionType: LINE_GIVEN,
    text: "Gegeben ist eine Gerade g und ein Punkt P auf dieser Geraden. P liegt hier bewusst nicht in der Mitte der sichtbaren Geraden. Gesucht ist eine Senkrechte durch P.",
    visible: ["geradeUndPunkt"]
  },
  {
    title: "Gleiche Abstände markieren",
    actionType: DISTANCE_TRANSFER,
    text: "Stich den Zirkel in P ein und markiere links und rechts von P zwei gleich weit entfernte Punkte auf der Geraden. Diese Punkte heißen A und B.",
    visible: ["geradeUndPunkt", "punkteAbtragen"]
  },
  {
    title: "Zirkelbogen um A zeichnen",
    actionType: ARC_DRAW,
    text: "Stich den Zirkel in A ein. Wähle eine größere Zirkelweite als AP und zeichne oberhalb der Geraden einen kurzen Zirkelbogen.",
    visible: ["geradeUndPunkt", "punkteAbtragen", "bogenA"]
  },
  {
    title: "Zirkelbogen um B zeichnen",
    actionType: ARC_DRAW,
    text: "Ohne die Zirkelweite zu verändern, stichst du nun in B ein und zeichnest einen zweiten kurzen Zirkelbogen. Die beiden Bögen schneiden sich oberhalb der Geraden.",
    visible: ["geradeUndPunkt", "punkteAbtragen", "bogenA", "bogenB"]
  },
  {
    title: "Schnittpunkt C markieren",
    actionType: INTERSECTION_MARK,
    text: "Markiere den Schnittpunkt der beiden Zirkelbögen. Wir nennen ihn C.",
    visible: ["geradeUndPunkt", "punkteAbtragen", "bogenA", "bogenB", "schnittpunkt"]
  },
  {
    title: "Senkrechte durch P zeichnen",
    actionType: RESULT_HIGHLIGHT,
    text: "Zeichne die Gerade durch P und C deutlich nach. Diese Gerade steht senkrecht auf g. Sie ist die gesuchte Senkrechte durch den vorgegebenen Punkt P.",
    visible: ["geradeUndPunkt", "punkteAbtragen", "bogenA", "bogenB", "schnittpunkt", "ergebnis"]
  }
];

initConstructionPlayer({
  steps
});
