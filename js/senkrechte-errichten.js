const { LINE_GIVEN, DISTANCE_TRANSFER, ARC_DRAW, INTERSECTION_MARK, RESULT_HIGHLIGHT } = window.ConstructionActionTypes;

const steps = [
  {
    title: "Ausgangslage: Punkt P auf Gerade g",
    actionType: LINE_GIVEN,
    text: "Gegeben sind eine Gerade g und ein Punkt P auf dieser Geraden. Gesucht ist eine Senkrechte zu g, die durch P verläuft.",
    visible: ["geradeUndPunkt"]
  },
  {
    title: "Hilfspunkte A und B auf g markieren",
    actionType: DISTANCE_TRANSFER,
    text: "Stich den Zirkel in P ein und markiere links und rechts von P zwei gleich weit entfernte Punkte auf der Geraden. Diese Punkte heißen A und B.",
    visible: ["geradeUndPunkt", "punkteAbtragen"]
  },
  {
    title: "Bogen um A zeichnen",
    actionType: ARC_DRAW,
    text: "Stich den Zirkel in A ein. Wähle eine Zirkelweite, die größer als AP ist, und zeichne oberhalb der Geraden einen kurzen Bogen.",
    visible: ["geradeUndPunkt", "punkteAbtragen", "bogenA"]
  },
  {
    title: "Bogen um B mit gleicher Weite zeichnen",
    actionType: ARC_DRAW,
    text: "Verändere die Zirkelweite nicht. Stich nun in B ein und zeichne einen zweiten kurzen Bogen. Die beiden Bögen schneiden sich oberhalb der Geraden.",
    visible: ["geradeUndPunkt", "punkteAbtragen", "bogenA", "bogenB"]
  },
  {
    title: "Schnittpunkt C markieren",
    actionType: INTERSECTION_MARK,
    text: "Markiere den Schnittpunkt der beiden Zirkelbögen. Wir nennen ihn C.",
    visible: ["geradeUndPunkt", "punkteAbtragen", "bogenA", "bogenB", "schnittpunkt"]
  },
  {
    title: "Senkrechte durch P und C zeichnen",
    actionType: RESULT_HIGHLIGHT,
    text: "Zeichne die Gerade durch P und C deutlich nach. Diese Gerade steht senkrecht auf g und ist die gesuchte Senkrechte durch P.",
    visible: ["geradeUndPunkt", "punkteAbtragen", "bogenA", "bogenB", "schnittpunkt", "ergebnis"]
  }
];

initConstructionPlayer({
  steps
});