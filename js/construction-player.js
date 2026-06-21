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
    actionTypeLabel: "actionTypeLabel",
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

  function ensureActionTypeStyles() {
    if (document.getElementById("construction-action-type-styles")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "construction-action-type-styles";
    style.textContent = `
      .action-type-label {
        display: inline-flex;
        align-items: center;
        align-self: flex-start;
        gap: 0.4rem;
        margin: 0 0 12px;
        padding: 7px 10px;
        border: 1px solid var(--border);
        border-radius: 999px;
        background: #f8fafc;
        color: var(--accent-dark);
        font-size: 0.88rem;
        font-weight: 900;
      }

      .action-type-label::before {
        content: "Baustein";
        color: var(--muted);
        font-size: 0.72rem;
        font-weight: 800;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }

      .action-type-label[hidden] {
        display: none;
      }
    `;
    document.head.appendChild(style);
  }

  function createActionTypeLabel() {
    let actionTypeLabel = document.getElementById(selectors.actionTypeLabel);

    if (!actionTypeLabel && stepCounter) {
      actionTypeLabel = document.createElement("div");
      actionTypeLabel.id = selectors.actionTypeLabel;
      actionTypeLabel.className = "action-type-label";
      actionTypeLabel.setAttribute("aria-live", "polite");
      stepCounter.insertAdjacentElement("afterend", actionTypeLabel);
    }

    return actionTypeLabel;
  }

  ensureActionTypeStyles();
  const actionTypeLabel = createActionTypeLabel();

  function getActionTypeInfo(actionType) {
    if (!actionType || !window.ConstructionActionTypeInfo) {
      return null;
    }

    return window.ConstructionActionTypeInfo[actionType] || null;
  }

  function updateActionTypeLabel(step) {
    if (!actionTypeLabel) {
      return;
    }

    const actionTypeInfo = getActionTypeInfo(step.actionType);
    const label = actionTypeInfo?.label || step.actionType;

    if (!label) {
      actionTypeLabel.hidden = true;
      actionTypeLabel.textContent = "";
      return;
    }

    actionTypeLabel.hidden = false;
    actionTypeLabel.textContent = label;
  }

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
    updateActionTypeLabel(step);
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
