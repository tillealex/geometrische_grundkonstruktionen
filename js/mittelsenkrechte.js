const steps = [
  {
    title: "Gegebene Strecke",
    text: "Zeichne zuerst die Strecke AB. Sie ist die Ausgangsstrecke, zu der die Mittelsenkrechte konstruiert werden soll.",
    visible: ["strecke"]
  },
  {
    title: "Kreis um A zeichnen",
    text: "Stich den Zirkel in A ein. Wähle einen Radius, der größer als die Hälfte der Strecke AB ist. Zeichne vor allem die beiden Kreisbögen oberhalb und unterhalb der Strecke, wo später Schnittpunkte entstehen.",
    visible: ["strecke", "kreisA"]
  },
  {
    title: "Kreis um B zeichnen",
    text: "Zeichne mit genau demselben Radius entsprechende Kreisbögen um B. Dort, wo sich die Bögen von A und B treffen, entstehen die beiden Schnittpunkte.",
    visible: ["strecke", "kreisA", "kreisB"]
  },
  {
    title: "Schnittpunkte markieren",
    text: "Markiere die beiden Schnittpunkte der Hilfskreise. Wir nennen sie hier C und D.",
    visible: ["strecke", "kreisA", "kreisB", "schnittpunkte"]
  },
  {
    title: "Mittelsenkrechte zeichnen",
    text: "Verbinde C und D mit einer Geraden. Diese Gerade ist die Mittelsenkrechte der Strecke AB. Sie schneidet AB im Mittelpunkt M und steht senkrecht auf AB.",
    visible: ["strecke", "kreisA", "kreisB", "schnittpunkte", "ergebnis"]
  }
];

function korrigiereZeichnung() {
  // Die alten, blassen Spiegelbögen werden vollständig entfernt.
  // Für die Schüler sollen nur die tatsächlich zu zeichnenden Zirkelbögen
  // in der Nähe der Schnittpunkte hervorgehoben werden.
  document.querySelectorAll(".hidden-arc").forEach(element => {
    element.remove();
  });

  // Die Beschriftung der Mittelsenkrechten steht weiter oben,
  // damit sie nicht mit der Mittelpunktsbeschriftung M kollidiert.
  const mittelsenkrechteLabel = document.querySelector("#ergebnis .text-large");
  if (mittelsenkrechteLabel) {
    mittelsenkrechteLabel.setAttribute("y", "58");
  }
}

korrigiereZeichnung();

initConstructionPlayer({
  steps,
  playbackDelay: 1800
});
