const steps = [
  {
    title: "Gegebener Winkel",
    text: "Der Winkel α ist gegeben. Seine Größe soll an einem neuen Punkt noch einmal konstruiert werden.",
    visible: ["gegebenerWinkel"]
  },
  {
    title: "Hilfsstrahl zeichnen",
    text: "Zeichne am neuen Scheitelpunkt P zuerst einen langen Hilfsstrahl. Er dient zunächst nur als Orientierung. Erst am Ende wird der gesuchte Winkelschenkel deutlich nachgezogen.",
    visible: ["gegebenerWinkel", "zielstrahl"]
  },
  {
    title: "Bogen am gegebenen Winkel",
    text: "Stich den Zirkel in den Scheitel S ein und zeichne einen kurzen Bogen, der beide Schenkel des gegebenen Winkels schneidet.",
    visible: ["gegebenerWinkel", "zielstrahl", "bogenOriginal"]
  },
  {
    title: "Gleichen Bogen am neuen Punkt",
    text: "Ohne die Zirkelweite zu verändern, stichst du in P ein und zeichnest denselben Bogen am Hilfsstrahl. Der Bogen schneidet den Hilfsstrahl in G.",
    visible: ["gegebenerWinkel", "zielstrahl", "bogenOriginal", "bogenZiel"]
  },
  {
    title: "Strecke EF am gegebenen Winkel aufnehmen",
    text: "Nimm nun am gegebenen Winkel den Abstand EF in den Zirkel auf. Dazu stichst du in E ein und öffnest den Zirkel bis F. Der kurze hervorgehobene Bogen um F zeigt genau die Stelle, an der diese Zirkelweite aufgenommen wird.",
    visible: ["gegebenerWinkel", "zielstrahl", "bogenOriginal", "bogenZiel", "abstandAufnehmen"]
  },
  {
    title: "Strecke auf den neuen Winkel übertragen",
    text: "Stich mit derselben Zirkelweite in G ein. Zeichne nur einen kurzen Bogen in der Nähe des Zielbogens. Dort, wo sich beide Bögen schneiden, entsteht der Punkt H.",
    visible: ["gegebenerWinkel", "zielstrahl", "bogenOriginal", "bogenZiel", "abstandAufnehmen", "abstandUebertragen"]
  },
  {
    title: "Zweiten Schenkel zeichnen",
    text: "Jetzt zeichnest du den gesuchten Winkelschenkel von P durch H deutlich nach. So entsteht bei P ein Winkel, der genauso groß ist wie der gegebene Winkel α.",
    visible: ["gegebenerWinkel", "zielstrahl", "bogenOriginal", "bogenZiel", "abstandAufnehmen", "abstandUebertragen", "ergebnis"]
  }
];

initConstructionPlayer({
  steps
});
