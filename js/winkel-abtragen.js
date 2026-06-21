const { ANGLE_GIVEN, LINE_DRAW, ARC_DRAW, DISTANCE_TRANSFER, COMPASS_MEASURE, RESULT_HIGHLIGHT } = window.ConstructionActionTypes;

const steps = [
  {
    title: "Ausgangswinkel α betrachten",
    actionType: ANGLE_GIVEN,
    text: "Der Winkel α ist gegeben. Seine Größe soll an einem neuen Scheitelpunkt P noch einmal konstruiert werden.",
    visible: ["gegebenerWinkel"]
  },
  {
    title: "Hilfsstrahl ab P zeichnen",
    actionType: LINE_DRAW,
    text: "Zeichne am neuen Scheitelpunkt P zuerst einen langen Hilfsstrahl. Er wird der erste Schenkel des neuen Winkels.",
    visible: ["gegebenerWinkel", "zielstrahl"]
  },
  {
    title: "Hilfsbogen am Ausgangswinkel zeichnen",
    actionType: ARC_DRAW,
    text: "Stich den Zirkel in den Scheitel S ein und zeichne einen kurzen Bogen, der beide Schenkel des gegebenen Winkels schneidet.",
    visible: ["gegebenerWinkel", "zielstrahl", "bogenOriginal"]
  },
  {
    title: "Gleichen Hilfsbogen am neuen Scheitel zeichnen",
    actionType: DISTANCE_TRANSFER,
    text: "Verändere die Zirkelweite nicht. Stich in P ein und zeichne denselben Bogen am neuen Hilfsstrahl. Der Bogen schneidet den Hilfsstrahl in G.",
    visible: ["gegebenerWinkel", "zielstrahl", "bogenOriginal", "bogenZiel"]
  },
  {
    title: "Abstand EF aufnehmen",
    actionType: COMPASS_MEASURE,
    text: "Nimm am gegebenen Winkel den Abstand EF in den Zirkel auf. Dazu stichst du in E ein und öffnest den Zirkel bis F.",
    visible: ["gegebenerWinkel", "zielstrahl", "bogenOriginal", "bogenZiel", "abstandAufnehmen"]
  },
  {
    title: "Abstand EF auf den neuen Winkel übertragen",
    actionType: DISTANCE_TRANSFER,
    text: "Stich mit derselben Zirkelweite in G ein und zeichne einen kurzen Bogen. Dort, wo sich die beiden Bögen schneiden, entsteht der Punkt H.",
    visible: ["gegebenerWinkel", "zielstrahl", "bogenOriginal", "bogenZiel", "abstandAufnehmen", "abstandUebertragen"]
  },
  {
    title: "Zweiten Schenkel PH zeichnen",
    actionType: RESULT_HIGHLIGHT,
    text: "Zeichne den zweiten Schenkel von P durch H deutlich nach. So entsteht bei P ein Winkel, der genauso groß ist wie der gegebene Winkel α.",
    visible: ["gegebenerWinkel", "zielstrahl", "bogenOriginal", "bogenZiel", "abstandAufnehmen", "abstandUebertragen", "ergebnis"]
  }
];

initConstructionPlayer({
  steps
});