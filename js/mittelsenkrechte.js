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

let currentStep = 0;
let playTimer = null;
let labelsVisible = true;

const stepCounter = document.getElementById("stepCounter");
const stepTitle = document.getElementById("stepTitle");
const stepText = document.getElementById("stepText");
const prevStepButton = document.getElementById("prevStep");
const nextStepButton = document.getElementById("nextStep");
const playStepsButton = document.getElementById("playSteps");
const resetStepsButton = document.getElementById("resetSteps");
const toggleLabelsButton = document.getElementById("toggleLabels");
const svg = document.getElementById("constructionSvg");

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

function showStep(index) {
  currentStep = Math.max(0, Math.min(index, steps.length - 1));
  const step = steps[currentStep];

  document.querySelectorAll(".step-element").forEach(element => {
    element.classList.remove("visible", "active");
  });

  step.visible.forEach(id => {
    const element = document.getElementById(id);
    if (element) element.classList.add("visible");
  });

  const activeId = step.visible[step.visible.length - 1];
  const activeElement = document.getElementById(activeId);
  if (activeElement) activeElement.classList.add("active");

  stepCounter.textContent = `Schritt ${currentStep + 1} von ${steps.length}`;
  stepTitle.textContent = step.title;
  stepText.textContent = step.text;

  prevStepButton.disabled = currentStep === 0;
  nextStepButton.disabled = currentStep === steps.length - 1;
}

function stopPlayback() {
  if (playTimer) {
    clearInterval(playTimer);
    playTimer = null;
  }
  playStepsButton.textContent = "Abspielen";
}

prevStepButton.addEventListener("click", () => {
  stopPlayback();
  showStep(currentStep - 1);
});

nextStepButton.addEventListener("click", () => {
  stopPlayback();
  showStep(currentStep + 1);
});

resetStepsButton.addEventListener("click", () => {
  stopPlayback();
  showStep(0);
});

playStepsButton.addEventListener("click", () => {
  if (playTimer) {
    stopPlayback();
    return;
  }

  playStepsButton.textContent = "Pause";
  if (currentStep === steps.length - 1) showStep(0);

  playTimer = setInterval(() => {
    if (currentStep >= steps.length - 1) {
      stopPlayback();
      return;
    }
    showStep(currentStep + 1);
  }, 1800);
});

toggleLabelsButton.addEventListener("click", () => {
  labelsVisible = !labelsVisible;
  svg.classList.toggle("labels-hidden", !labelsVisible);
  toggleLabelsButton.textContent = labelsVisible ? "Beschriftung ausblenden" : "Beschriftung einblenden";
});

korrigiereZeichnung();
showStep(0);
