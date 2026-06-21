const steps = [
  {
    title: "Gegebene Strecke",
    actionType: "segment-draw",
    text: "Die Strecke AB ist die Länge, die übertragen werden soll. Diese Länge wird später mit dem Zirkel aufgenommen.",
    visible: ["gegebeneStrecke"]
  },
  {
    title: "Hilfsstrahl zeichnen",
    actionType: "line-draw",
    text: "Zeichne vom Punkt P aus einen langen Hilfsstrahl. Er dient zunächst nur als Orientierung. Erst am Ende wird die gesuchte Strecke deutlich nachgezogen.",
    visible: ["gegebeneStrecke", "zielstrahl"]
  },
  {
    title: "Zirkelweite aufnehmen",
    actionType: "compass-measure",
    text: "Stich den Zirkel in A ein und öffne ihn bis B. Der blasse Kreis zeigt die eingestellte Zirkelweite. Der markierte Bogen bei B verdeutlicht: Genau diese Länge AB wird aufgenommen.",
    visible: ["gegebeneStrecke", "zielstrahl", "zirkelweite"]
  },
  {
    title: "Länge auf dem Hilfsstrahl abtragen",
    actionType: "distance-transfer",
    text: "Stich den Zirkel nun in P ein und schlage mit derselben Weite nur einen kurzen Bogen. Du musst keinen ganzen Kreis zeichnen, sondern nur den Bereich, in dem der Hilfsstrahl getroffen wird.",
    visible: ["gegebeneStrecke", "zielstrahl", "zirkelweite", "bogenP"]
  },
  {
    title: "Endpunkt markieren",
    actionType: "result-highlight",
    text: "Der Schnittpunkt des Zirkelbogens mit dem Hilfsstrahl ist Q. Jetzt wird die gesuchte Strecke PQ deutlich nachgezogen. Sie ist genauso lang wie die gegebene Strecke AB.",
    visible: ["gegebeneStrecke", "zielstrahl", "zirkelweite", "bogenP", "ergebnis"]
  }
];

initConstructionPlayer({
  steps
});
