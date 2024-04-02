function updateAllDisplays() {
    updateYensDisplay();
    updateUpgradeCostDisplay();
    updateEvolutionLevelDisplay();
    updateYensPerClickDisplay();
  }

  function updateYensDisplay() {
    const formattedYens = isAbbreviated ? abbreviateNumber(yens) : yens.toLocaleString();
    elements.yensDisplay.textContent = formattedYens;
  }

  function updateUpgradeCostDisplay() {
    const formattedUpgradeCost = isAbbreviated ? abbreviateNumber(upgradeCost) : upgradeCost.toLocaleString();
    elements.upgradeCostDisplay.textContent = `${formattedUpgradeCost}`;
}

  function updateEvolutionLevelDisplay() {
    const evolutionClass = getClassFromLevel(currentLevel);
    elements.evolutionLevelDisplay.textContent = `${currentLevel}.${evolutionClass}`;
    elements.evolutionLevelDisplay.className = '';
    elements.evolutionLevelDisplay.style.color = 'black';    
    elements.evolutionLevelDisplay.classList.add(evolutionClass);
  }

  function updateYensPerClickDisplay() {
    const formattedClickValue = isAbbreviated ? abbreviateNumber(clickValue) : clickValue.toLocaleString();
    elements.yensPerClickDisplay.textContent = `¥${formattedClickValue} P/ Click`; 
    elements.yensPerClickDisplay.style.color = 'black';
}