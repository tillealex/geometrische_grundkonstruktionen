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

function showStep(index) {
  currentStep = Math.max(0, Math.min(index, steps.length - 1));
  const step = steps[currentStep];

  document.querySelectorAll(".step-element").forEach(element => {
    element.classList.remove("visible", "active");
  });

  step.visible.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.classList.add("visible");
    }
  });

  const activeId = step.visible[step.visible.length - 1];
  const activeElement = document.getElementById(activeId);

  if (activeElement) {
    activeElement.classList.add("active");
  }

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

  if (currentStep === steps.length - 1) {
    showStep(0);
  }

  playTimer = setInterval(() => {
    if (currentStep >= steps.length - 1) {
      stopPlayback();
      return;
    }

    showStep(currentStep + 1);
  }, 1900);
});

toggleLabelsButton.addEventListener("click", () => {
  labelsVisible = !labelsVisible;

  svg.classList.toggle("labels-hidden", !labelsVisible);

  toggleLabelsButton.textContent = labelsVisible
    ? "Beschriftung ausblenden"
    : "Beschriftung einblenden";
});

showStep(0);