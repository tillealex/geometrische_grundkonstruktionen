const steps = [
  {
    title: "Gegebene Strecke",
    text: "Die Strecke AB ist die Länge, die übertragen werden soll. Diese Länge wird später mit dem Zirkel aufgenommen.",
    visible: ["gegebeneStrecke"]
  },
  {
    title: "Hilfsstrahl zeichnen",
    text: "Zeichne vom Punkt P aus einen langen Hilfsstrahl. Er dient zunächst nur als Orientierung. Erst am Ende wird die gesuchte Strecke deutlich nachgezogen.",
    visible: ["gegebeneStrecke", "zielstrahl"]
  },
  {
    title: "Zirkelweite aufnehmen",
    text: "Stich den Zirkel in A ein und öffne ihn bis B. Der blasse Kreis zeigt die eingestellte Zirkelweite. Der markierte Bogen bei B verdeutlicht: Genau diese Länge AB wird aufgenommen.",
    visible: ["gegebeneStrecke", "zielstrahl", "zirkelweite"]
  },
  {
    title: "Länge auf dem Hilfsstrahl abtragen",
    text: "Stich den Zirkel nun in P ein und schlage mit derselben Weite nur einen kurzen Bogen. Du musst keinen ganzen Kreis zeichnen, sondern nur den Bereich, in dem der Hilfsstrahl getroffen wird.",
    visible: ["gegebeneStrecke", "zielstrahl", "zirkelweite", "bogenP"]
  },
  {
    title: "Endpunkt markieren",
    text: "Der Schnittpunkt des Zirkelbogens mit dem Hilfsstrahl ist Q. Jetzt wird die gesuchte Strecke PQ deutlich nachgezogen. Sie ist genauso lang wie die gegebene Strecke AB.",
    visible: ["gegebeneStrecke", "zielstrahl", "zirkelweite", "bogenP", "ergebnis"]
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