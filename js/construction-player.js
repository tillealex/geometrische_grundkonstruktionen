/*
 * Gemeinsame Schrittsteuerung für Konstruktionsseiten.
 *
 * Diese Datei bündelt die Bedienlogik, die auf fast allen
 * Konstruktionsseiten gleich ist: Schritt vor/zurück, Abspielen,
 * Zurücksetzen, Beschriftungen ein-/ausblenden und SVG-Elemente
 * schrittweise sichtbar machen.
 *
 * Die einzelnen Konstruktionsdateien liefern nur noch die fachlichen
 * Schrittdefinitionen und rufen initConstructionPlayer(...) auf.
 */

function initConstructionPlayer(config) {
  const steps = config.steps || [];
  const playbackDelay = config.playbackDelay || 1900;
  const selectors = {
    stepCounter: "stepCounter",
    stepTitle: "stepTitle",
    stepText: "stepText",
    prevStep: "prevStep",
    nextStep: "nextStep",
    playSteps: "playSteps",
    resetSteps: "resetSteps",
    toggleLabels: "toggleLabels",
    svg: "constructionSvg",
    stepElementClass: "step-element",
    visibleClass: "visible",
    activeClass: "active",
    labelsHiddenClass: "labels-hidden",
    ...(config.selectors || {})
  };

  if (!Array.isArray(steps) || steps.length === 0) {
    console.warn("initConstructionPlayer: Es wurden keine Schritte übergeben.");
    return;
  }

  let currentStep = 0;
  let playTimer = null;
  let labelsVisible = true;

  const stepCounter = document.getElementById(selectors.stepCounter);
  const stepTitle = document.getElementById(selectors.stepTitle);
  const stepText = document.getElementById(selectors.stepText);
  const prevStepButton = document.getElementById(selectors.prevStep);
  const nextStepButton = document.getElementById(selectors.nextStep);
  const playStepsButton = document.getElementById(selectors.playSteps);
  const resetStepsButton = document.getElementById(selectors.resetSteps);
  const toggleLabelsButton = document.getElementById(selectors.toggleLabels);
  const svg = document.getElementById(selectors.svg);

  function requireElement(element, name) {
    if (!element) {
      console.warn(`initConstructionPlayer: Element #${name} wurde nicht gefunden.`);
    }
  }

  requireElement(stepCounter, selectors.stepCounter);
  requireElement(stepTitle, selectors.stepTitle);
  requireElement(stepText, selectors.stepText);
  requireElement(prevStepButton, selectors.prevStep);
  requireElement(nextStepButton, selectors.nextStep);
  requireElement(playStepsButton, selectors.playSteps);
  requireElement(resetStepsButton, selectors.resetSteps);

  function clampStep(index) {
    return Math.max(0, Math.min(index, steps.length - 1));
  }

  function showStep(index) {
    currentStep = clampStep(index);
    const step = steps[currentStep];

    document.querySelectorAll(`.${selectors.stepElementClass}`).forEach(element => {
      element.classList.remove(selectors.visibleClass, selectors.activeClass);
    });

    step.visible.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.classList.add(selectors.visibleClass);
      }
    });

    const activeId = step.visible[step.visible.length - 1];
    const activeElement = document.getElementById(activeId);
    if (activeElement) {
      activeElement.classList.add(selectors.activeClass);
    }

    if (stepCounter) {
      stepCounter.textContent = `Schritt ${currentStep + 1} von ${steps.length}`;
    }
    if (stepTitle) {
      stepTitle.textContent = step.title;
    }
    if (stepText) {
      stepText.textContent = step.text;
    }

    if (prevStepButton) {
      prevStepButton.disabled = currentStep === 0;
    }
    if (nextStepButton) {
      nextStepButton.disabled = currentStep === steps.length - 1;
    }
  }

  function stopPlayback() {
    if (playTimer) {
      clearInterval(playTimer);
      playTimer = null;
    }
    if (playStepsButton) {
      playStepsButton.textContent = "Abspielen";
    }
  }

  if (prevStepButton) {
    prevStepButton.addEventListener("click", () => {
      stopPlayback();
      showStep(currentStep - 1);
    });
  }

  if (nextStepButton) {
    nextStepButton.addEventListener("click", () => {
      stopPlayback();
      showStep(currentStep + 1);
    });
  }

  if (resetStepsButton) {
    resetStepsButton.addEventListener("click", () => {
      stopPlayback();
      showStep(0);
    });
  }

  if (playStepsButton) {
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
      }, playbackDelay);
    });
  }

  if (toggleLabelsButton && svg) {
    toggleLabelsButton.addEventListener("click", () => {
      labelsVisible = !labelsVisible;
      svg.classList.toggle(selectors.labelsHiddenClass, !labelsVisible);
      toggleLabelsButton.textContent = labelsVisible
        ? "Beschriftung ausblenden"
        : "Beschriftung einblenden";
    });
  }

  showStep(0);

  return {
    showStep,
    stopPlayback,
    getCurrentStep: () => currentStep
  };
}
