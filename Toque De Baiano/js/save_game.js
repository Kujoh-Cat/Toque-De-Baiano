function saveGame() {
    localStorage.setItem('yens', yens);
    localStorage.setItem('clickValue', clickValue);
    localStorage.setItem('upgradeCost', upgradeCost);
    localStorage.setItem('level', currentLevel);
  }