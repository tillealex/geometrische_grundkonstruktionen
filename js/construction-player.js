function initConstructionPlayer(config) {
  const steps = config.steps || [];
  const playbackDelay = config.playbackDelay || 1900;
  const selectors = {
    stepCounter: "stepCounter",
    stepTitle: "stepTitle",
    stepText: "stepText",
    stepContent: "stepContent",
    actionTypeCard: "actionTypeCard",
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
    if (document.getElementById("construction-action-type-styles")) return;
    const style = document.createElement("style");
    style.id = "construction-action-type-styles";
    style.textContent = `
      .step-card .step-main-content { margin-top: auto; padding-top: 18px; }
      .step-card .button-row.primary-step-controls { margin-top: 12px; padding-top: 0; }
      .action-type-card {
        position: relative;
        margin: 0;
        padding: 16px 16px 15px;
        border: 1px solid var(--border);
        border-left: 6px solid var(--accent);
        border-radius: 18px;
        background: linear-gradient(135deg, #fff7ed, #ffffff);
        color: var(--ink);
        cursor: help;
        transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
      }
      .action-type-card:hover,
      .action-type-card:focus-visible {
        transform: translateY(-1px);
        border-color: rgba(245, 158, 11, 0.7);
        box-shadow: 0 14px 26px rgba(27, 39, 69, 0.10);
        outline: none;
      }
      .action-type-card[hidden] { display: none; }
      .action-type-kicker {
        margin: 0 0 5px;
        color: var(--muted);
        font-size: 0.72rem;
        font-weight: 900;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .action-type-name {
        margin: 0;
        color: var(--accent-dark);
        font-size: 1.18rem;
        font-weight: 950;
        line-height: 1.18;
      }
      .action-type-card::after {
        content: "?";
        position: absolute;
        top: 12px;
        right: 12px;
        width: 24px;
        height: 24px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        background: #fef3c7;
        color: #78350f;
        font-size: 0.85rem;
        font-weight: 900;
      }
      .action-type-help {
        position: absolute;
        left: 12px;
        right: 12px;
        bottom: calc(100% + 10px);
        z-index: 5;
        padding: 12px 14px;
        border: 1px solid var(--border);
        border-radius: 14px;
        background: #111827;
        color: #f9fafb;
        box-shadow: 0 16px 30px rgba(17, 24, 39, 0.22);
        font-size: 0.94rem;
        font-weight: 650;
        line-height: 1.35;
        opacity: 0;
        transform: translateY(6px);
        pointer-events: none;
        transition: opacity 0.15s ease, transform 0.15s ease;
      }
      .action-type-help::after {
        content: "";
        position: absolute;
        left: 24px;
        bottom: -8px;
        width: 14px;
        height: 14px;
        background: #111827;
        transform: rotate(45deg);
      }
      .action-type-card:hover .action-type-help,
      .action-type-card:focus-visible .action-type-help {
        opacity: 1;
        transform: translateY(0);
      }
      @media (max-width: 560px) {
        .step-card .step-main-content { margin-top: 18px; padding-top: 0; }
        .action-type-help {
          position: static;
          margin-top: 10px;
          opacity: 1;
          transform: none;
          pointer-events: auto;
        }
        .action-type-help::after { display: none; }
      }
    `;
    document.head.appendChild(style);
  }

  function markPrimaryButtonRow() {
    const primaryButtonRow = prevStepButton?.closest(".button-row");
    if (primaryButtonRow) primaryButtonRow.classList.add("primary-step-controls");
    return primaryButtonRow;
  }

  function createStepMainContent(primaryButtonRow) {
    let stepMainContent = document.getElementById(selectors.stepContent);
    if (!stepMainContent && stepText) {
      stepMainContent = document.createElement("div");
      stepMainContent.id = selectors.stepContent;
      stepMainContent.className = "step-main-content";
      if (primaryButtonRow) primaryButtonRow.insertAdjacentElement("beforebegin", stepMainContent);
      else stepText.insertAdjacentElement("afterend", stepMainContent);
    }
    return stepMainContent;
  }

  function createActionTypeCard(stepMainContent) {
    let actionTypeCard = document.getElementById(selectors.actionTypeCard);
    if (!actionTypeCard && stepMainContent) {
      actionTypeCard = document.createElement("div");
      actionTypeCard.id = selectors.actionTypeCard;
      actionTypeCard.className = "action-type-card";
      actionTypeCard.tabIndex = 0;
      actionTypeCard.setAttribute("aria-live", "polite");
      const kicker = document.createElement("p");
      kicker.className = "action-type-kicker";
      kicker.textContent = "Konstruktionsbaustein";
      const name = document.createElement("p");
      name.className = "action-type-name";
      const help = document.createElement("div");
      help.className = "action-type-help";
      help.setAttribute("role", "tooltip");
      actionTypeCard.append(kicker, name, help);
      stepMainContent.appendChild(actionTypeCard);
    }
    return actionTypeCard;
  }

  ensureActionTypeStyles();
  const primaryButtonRow = markPrimaryButtonRow();
  const stepMainContent = createStepMainContent(primaryButtonRow);
  const actionTypeCard = createActionTypeCard(stepMainContent);

  function getActionTypeInfo(actionType) {
    if (!actionType || !window.ConstructionActionTypeInfo) return null;
    return window.ConstructionActionTypeInfo[actionType] || null;
  }

  function updateActionTypeCard(step) {
    if (!actionTypeCard) return;
    const actionTypeInfo = getActionTypeInfo(step.actionType);
    const label = actionTypeInfo?.label || step.actionType;
    const helpText = actionTypeInfo?.help || "Dieser Schritt gehört zu einem wiederkehrenden Konstruktionsbaustein.";
    if (!label) {
      actionTypeCard.hidden = true;
      return;
    }
    actionTypeCard.hidden = false;
    const name = actionTypeCard.querySelector(".action-type-name");
    const help = actionTypeCard.querySelector(".action-type-help");
    if (name) name.textContent = label;
    if (help) help.textContent = helpText;
    actionTypeCard.setAttribute("aria-label", `${label}: ${helpText}`);
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
      if (element) element.classList.add(selectors.visibleClass);
    });

    const activeId = step.visible[step.visible.length - 1];
    const activeElement = document.getElementById(activeId);
    if (activeElement) activeElement.classList.add(selectors.activeClass);

    if (stepCounter) stepCounter.textContent = `Schritt ${currentStep + 1} von ${steps.length}`;
    if (stepTitle) {
      stepTitle.hidden = false;
      stepTitle.textContent = step.title;
    }
    if (stepText) stepText.textContent = step.text;
    updateActionTypeCard(step);

    if (prevStepButton) prevStepButton.disabled = currentStep === 0;
    if (nextStepButton) nextStepButton.disabled = currentStep === steps.length - 1;
  }

  function stopPlayback() {
    if (playTimer) {
      clearInterval(playTimer);
      playTimer = null;
    }
    if (playStepsButton) playStepsButton.textContent = "Abspielen";
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
      if (currentStep === steps.length - 1) showStep(0);
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
      toggleLabelsButton.textContent = labelsVisible ? "Beschriftung ausblenden" : "Beschriftung einblenden";
    });
  }

  showStep(0);

  return {
    showStep,
    stopPlayback,
    getCurrentStep: () => currentStep
  };
}
