const steps = [
  {
    title: "Gerade mit Punkt P",
    text: "Gegeben ist eine Gerade g und ein Punkt P auf dieser Geraden. P liegt hier bewusst nicht in der Mitte der sichtbaren Geraden. Gesucht ist eine Senkrechte durch P.",
    visible: ["geradeUndPunkt"]
  },
  {
    title: "Gleiche Abstände markieren",
    text: "Stich den Zirkel in P ein und markiere links und rechts von P zwei gleich weit entfernte Punkte auf der Geraden. Diese Punkte heißen A und B.",
    visible: ["geradeUndPunkt", "punkteAbtragen"]
  },
  {
    title: "Zirkelbogen um A zeichnen",
    text: "Stich den Zirkel in A ein. Wähle eine größere Zirkelweite als AP und zeichne oberhalb der Geraden einen kurzen Zirkelbogen.",
    visible: ["geradeUndPunkt", "punkteAbtragen", "bogenA"]
  },
  {
    title: "Zirkelbogen um B zeichnen",
    text: "Ohne die Zirkelweite zu verändern, stichst du nun in B ein und zeichnest einen zweiten kurzen Zirkelbogen. Die beiden Bögen schneiden sich oberhalb der Geraden.",
    visible: ["geradeUndPunkt", "punkteAbtragen", "bogenA", "bogenB"]
  },
  {
    title: "Schnittpunkt C markieren",
    text: "Markiere den Schnittpunkt der beiden Zirkelbögen. Wir nennen ihn C.",
    visible: ["geradeUndPunkt", "punkteAbtragen", "bogenA", "bogenB", "schnittpunkt"]
  },
  {
    title: "Senkrechte durch P zeichnen",
    text: "Zeichne die Gerade durch P und C deutlich nach. Diese Gerade steht senkrecht auf g. Sie ist die gesuchte Senkrechte durch den vorgegebenen Punkt P.",
    visible: ["geradeUndPunkt", "punkteAbtragen", "bogenA", "bogenB", "schnittpunkt", "ergebnis"]
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
