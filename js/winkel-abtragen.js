const { ANGLE_GIVEN, LINE_DRAW, ARC_DRAW, DISTANCE_TRANSFER, COMPASS_MEASURE, RESULT_HIGHLIGHT } = window.ConstructionActionTypes;

const steps = [
  {
    title: "Gegebener Winkel",
    actionType: ANGLE_GIVEN,
    text: "Der Winkel α ist gegeben. Seine Größe soll an einem neuen Punkt noch einmal konstruiert werden.",
    visible: ["gegebenerWinkel"]
  },
  {
    title: "Hilfsstrahl zeichnen",
    actionType: LINE_DRAW,
    text: "Zeichne am neuen Scheitelpunkt P zuerst einen langen Hilfsstrahl. Er dient zunächst nur als Orientierung. Erst am Ende wird der gesuchte Winkelschenkel deutlich nachgezogen.",
    visible: ["gegebenerWinkel", "zielstrahl"]
  },
  {
    title: "Bogen am gegebenen Winkel",
    actionType: ARC_DRAW,
    text: "Stich den Zirkel in den Scheitel S ein und zeichne einen kurzen Bogen, der beide Schenkel des gegebenen Winkels schneidet.",
    visible: ["gegebenerWinkel", "zielstrahl", "bogenOriginal"]
  },
  {
    title: "Gleichen Bogen am neuen Punkt",
    actionType: DISTANCE_TRANSFER,
    text: "Ohne die Zirkelweite zu verändern, stichst du in P ein und zeichnest denselben Bogen am Hilfsstrahl. Der Bogen schneidet den Hilfsstrahl in G.",
    visible: ["gegebenerWinkel", "zielstrahl", "bogenOriginal", "bogenZiel"]
  },
  {
    title: "Strecke EF am gegebenen Winkel aufnehmen",
    actionType: COMPASS_MEASURE,
    text: "Nimm nun am gegebenen Winkel den Abstand EF in den Zirkel auf. Dazu stichst du in E ein und öffnest den Zirkel bis F. Der kurze hervorgehobene Bogen um F zeigt genau die Stelle, an der diese Zirkelweite aufgenommen wird.",
    visible: ["gegebenerWinkel", "zielstrahl", "bogenOriginal", "bogenZiel", "abstandAufnehmen"]
  },
  {
    title: "Strecke auf den neuen Winkel übertragen",
    actionType: DISTANCE_TRANSFER,
    text: "Stich mit derselben Zirkelweite in G ein. Zeichne nur einen kurzen Bogen in der Nähe des Zielbogens. Dort, wo sich beide Bögen schneiden, entsteht der Punkt H.",
    visible: ["gegebenerWinkel", "zielstrahl", "bogenOriginal", "bogenZiel", "abstandAufnehmen", "abstandUebertragen"]
  },
  {
    title: "Zweiten Schenkel zeichnen",
    actionType: RESULT_HIGHLIGHT,
    text: "Jetzt zeichnest du den gesuchten Winkelschenkel von P durch H deutlich nach. So entsteht bei P ein Winkel, der genauso groß ist wie der gegebene Winkel α.",
    visible: ["gegebenerWinkel", "zielstrahl", "bogenOriginal", "bogenZiel", "abstandAufnehmen", "abstandUebertragen", "ergebnis"]
  }
];

initConstructionPlayer({
  steps
});
