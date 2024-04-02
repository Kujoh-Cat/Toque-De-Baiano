elements.upgradeBtn.addEventListener('click', function () {
    if (yens >= upgradeCost) {
      yens -= upgradeCost;
      clickValue += 100;
      upgradeCost *= 2;
      updateAllDisplays();

      const newLevel = currentLevel + 1;
      currentLevel = newLevel;

      elements.evolutionLevelDisplay.classList.add('evolution-level-transition');
      elements.levelDisplay.textContent = currentLevel;
      updateEvolutionLevelDisplay();

      setTimeout(() => {
        elements.evolutionLevelDisplay.classList.remove('evolution-level-transition');
      }, 600);
    } else {
      const faltaYens = upgradeCost - yens;
      const mensagem = getUpgradeMessage(faltaYens);
      displayMessage(mensagem);
    }
});