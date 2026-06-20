const steps = [
  {
    title: "Ausgangslage",
    text: "Gegeben sind eine Gerade g und ein Punkt P außerhalb dieser Geraden. Gesucht ist das Lot von P auf die Gerade g.",
    visible: ["ausgangslage"]
  },
  {
    title: "Kreis um P zeichnen",
    text: "Zeichne um P einen Kreis, der die Gerade g an zwei Stellen schneidet. Diese Schnittpunkte heißen A und B.",
    visible: ["ausgangslage", "kreisUmP"]
  },
  {
    title: "Bogen um A zeichnen",
    text: "Stelle den Zirkel größer als die halbe Strecke AB ein und zeichne oberhalb der Geraden einen Bogen um A.",
    visible: ["ausgangslage", "kreisUmP", "bogenA"]
  },
  {
    title: "Bogen um B zeichnen",
    text: "Zeichne mit derselben Zirkelweite einen Bogen um B. Die beiden Bögen schneiden sich im Punkt C.",
    visible: ["ausgangslage", "kreisUmP", "bogenA", "bogenB"]
  },
  {
    title: "Lot zeichnen",
    text: "Verbinde P mit dem Schnittpunkt C. Die Gerade durch P und C steht senkrecht auf g. Der Schnittpunkt mit g ist der Lotfußpunkt L.",
    visible: ["ausgangslage", "kreisUmP", "bogenA", "bogenB", "lot"]
  }
];

let currentStep = 0;
let playInterval = null;
let labelsVisible = true;

const stepCounter = document.getElementById("stepCounter");
const stepTitle = document.getElementById("stepTitle");
const stepText = document.getElementById("stepText");

const prevButton = document.getElementById("prevStep");
const nextButton = document.getElementById("nextStep");
const playButton = document.getElementById("playSteps");
const resetButton = document.getElementById("resetSteps");
const toggleLabelsButton = document.getElementById("toggleLabels");

const allStepElements = document.querySelectorAll(".step-element");
const labelElements = document.querySelectorAll(".label-text, .tool-label, .result-label");

function showStep(index) {
  currentStep = Math.max(0, Math.min(index, steps.length - 1));

  const step = steps[currentStep];

  stepCounter.textContent = `Schritt ${currentStep + 1} von ${steps.length}`;
  stepTitle.textContent = step.title;
  stepText.textContent = step.text;

  allStepElements.forEach(element => {
    element.classList.remove("visible");
  });

  step.visible.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.classList.add("visible");
    }
  });

  prevButton.disabled = currentStep === 0;
  nextButton.disabled = currentStep === steps.length - 1;
}

function nextStep() {
  if (currentStep < steps.length - 1) {
    showStep(currentStep + 1);
  } else {
    stopPlayback();
  }
}

function previousStep() {
  showStep(currentStep - 1);
}

function resetSteps() {
  stopPlayback();
  showStep(0);
}

function startPlayback() {
  playButton.textContent = "Pause";
  playInterval = window.setInterval(() => {
    if (currentStep >= steps.length - 1) {
      stopPlayback();
      return;
    }

    showStep(currentStep + 1);
  }, 1600);
}

function stopPlayback() {
  playButton.textContent = "Abspielen";

  if (playInterval !== null) {
    window.clearInterval(playInterval);
    playInterval = null;
  }
}

function togglePlayback() {
  if (playInterval === null) {
    startPlayback();
  } else {
    stopPlayback();
  }
}

function toggleLabels() {
  labelsVisible = !labelsVisible;

  labelElements.forEach(label => {
    label.style.display = labelsVisible ? "" : "none";
  });

  toggleLabelsButton.textContent = labelsVisible
    ? "Beschriftung ausblenden"
    : "Beschriftung einblenden";
}

prevButton.addEventListener("click", previousStep);
nextButton.addEventListener("click", nextStep);
resetButton.addEventListener("click", resetSteps);
playButton.addEventListener("click", togglePlayback);
toggleLabelsButton.addEventListener("click", toggleLabels);

showStep(0);