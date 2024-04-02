elements.resetBtn.addEventListener('click', function () {
    localStorage.clear();
    yens = 0;
    clickValue = 100;
    upgradeCost = 2;
    currentLevel = 1;

    updateAllDisplays();
    saveGame();
  });

  elements.yensDisplay.addEventListener('click', function () {
    isAbbreviated = !isAbbreviated;
    updateYensDisplay();
  });