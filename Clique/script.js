document.addEventListener('DOMContentLoaded', function () {
  let yens = parseInt(localStorage.getItem('yens')) || 0;
  let clickValue = parseInt(localStorage.getItem('clickValue')) || 100;
  let upgradeCost = parseInt(localStorage.getItem('upgradeCost')) || 2;
  let currentLevel = parseInt(localStorage.getItem('level')) || 1;

  const elements = {
    yensDisplay: document.getElementById('yens'),
    clickBtn: document.getElementById('click-btn'),
    upgradeBtn: document.getElementById('upgrade-btn'),
    upgradeCostDisplay: document.getElementById('upgrade-cost'),
    evolutionLevelDisplay: document.getElementById('evolution-level'),
    levelDisplay: document.getElementById('level'),
    yensPerClickDisplay: document.getElementById('money-per-click'),
    resetBtn: document.getElementById('reset-btn'),
    shopBtn: document.getElementById('shop-btn'),
    missionsBtn: document.getElementById('missions-btn'),
  };

  let isAbbreviated = true;
  let isTouch = false;
  let clickHoldTimeout;
  let upgradeHoldTimeout;
  

  updateAllDisplays();

  const allButtons = document.querySelectorAll('button');

  allButtons.forEach(button => {
    button.style.userSelect = 'none';

    button.addEventListener('click', function () {
      button.classList.add('shine-effect');

      setTimeout(() => {
        button.classList.remove('shine-effect');
      }, 2000);
    });
  });

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

  function saveGame() {
    localStorage.setItem('yens', yens);
    localStorage.setItem('clickValue', clickValue);
    localStorage.setItem('upgradeCost', upgradeCost);
    localStorage.setItem('level', currentLevel);
  }

  elements.clickBtn.addEventListener('click', function () {
    yens += clickValue;
    updateYensDisplay();
    saveGame();
  });

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

  elements.clickBtn.addEventListener('mousedown', function () {
    clickHoldTimeout = setTimeout(function () {
        isAbbreviated = false;
        updateYensPerClickDisplay();
    }, 500); // Tempo em milissegundos para considerar como "segurar" o clique
});

elements.clickBtn.addEventListener('touchstart', function () {
    clickHoldTimeout = setTimeout(function () {
        isAbbreviated = false;
        updateYensPerClickDisplay();
    }, 500); // Tempo em milissegundos para considerar como "segurar" o clique
});

elements.clickBtn.addEventListener('mouseup', function () {
    clearTimeout(clickHoldTimeout);
    resetClickAbbreviation();
});

elements.clickBtn.addEventListener('touchend', function () {
    clearTimeout(clickHoldTimeout);
    resetClickAbbreviation();
});

elements.upgradeBtn.addEventListener('mousedown', function () {
    upgradeHoldTimeout = setTimeout(function () {
        isAbbreviated = false;
        updateUpgradeCostDisplay();
    }, 400); // Tempo em milissegundos para considerar como "segurar" o clique
});

elements.upgradeBtn.addEventListener('touchstart', function () {
    upgradeHoldTimeout = setTimeout(function () {
        isAbbreviated = false;
        updateUpgradeCostDisplay();
    }, 400); // Tempo em milissegundos para considerar como "segurar" o clique
});

elements.upgradeBtn.addEventListener('mouseup', function () {
    clearTimeout(upgradeHoldTimeout);
    resetUpgradeAbbreviation();
});

elements.upgradeBtn.addEventListener('touchend', function () {
    clearTimeout(upgradeHoldTimeout);
    resetUpgradeAbbreviation();
});

function resetClickAbbreviation() {
    isAbbreviated = true;
    updateYensPerClickDisplay();
}

function resetUpgradeAbbreviation() {
    isAbbreviated = true;
    updateUpgradeCostDisplay();
}

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
});

function abbreviateNumber(number) {
    const SI_SYMBOL = ["", "k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];

    // determine the appropriate SI symbol
    const tier = (Math.log10(Math.abs(number)) / 3) | 0;

    // if zero, we don't need a suffix
    if (tier === 0) return number;

    // get suffix and determine scale
    const suffix = SI_SYMBOL[tier];
    const scale = Math.pow(10, tier * 3);

    // scale the number
    const scaled = number / scale;

    // format number and add suffix
    return scaled.toFixed(1) + suffix;
}

function getClassFromLevel(level) {
  if (level >= 1 && level <= 7) {
        return "Iniciante";
    } else if (level >= 8 && level <= 14) {
        return "Viking";
    } else if (level >= 15 && level <= 29) {
        return "Mestre";
    } else if (level >= 30 && level <= 49) {
        return "Lenda";
    } else if (level >= 50 && level <= 99) {
        return "Deus";
    } else if (level >= 100 && level <= 499) {
        return "Universal";
    } else if (level >= 500) {
        return "MultiVersal";
   }
}

function getUpgradeMessage(faltaYens) {
  if (faltaYens >= 10000) {
    return `Aguente Firme!\nFaltam ¥${faltaYens.toLocaleString()}.`;
  } else if (faltaYens < 1000 && faltaYens > 300) {
    return `Quase Lá!\nFaltam ¥${faltaYens.toLocaleString()}.`;
  } else {
    return `Falta Pouco!\nRestam Apenas ¥${faltaYens.toLocaleString()}.`;
  }
}

function displayMessage(message) {
  const messageBox = document.getElementById('message-box');
  const messageText = document.getElementById('message-text');
  const okButton = document.getElementById('ok-button');

  messageText.innerHTML = message;
  messageBox.style.zIndex = '1000';
  messageBox.style.display = 'flex';

  okButton.addEventListener('click', function () {
    messageBox.style.display = 'none';
  });
}
