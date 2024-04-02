// Valores Padrões - Local Storage

document.addEventListener('DOMContentLoaded', function () {
  let yens = parseInt(localStorage.getItem('yens')) || 10;
  let clickValue = parseInt(localStorage.getItem('clickValue')) || 1000;
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

  // Outros
  let isAbbreviated = true;
  let isTouch = false;
  let clickHoldTimeout;
  let upgradeHoldTimeout;
  updateAllDisplays();

  // Luz Ao Pressionar Botões
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

  // Atualizar Displays
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

  // Salvar Dados
  function saveGame() {
      localStorage.setItem('yens', yens.toString());
      localStorage.setItem('clickValue', clickValue.toString());
      localStorage.setItem('upgradeCost', upgradeCost.toString());
      localStorage.setItem('level', currentLevel.toString());
  }

  // Sistema De Clique
  elements.clickBtn.addEventListener('click', function () {
      yens += clickValue;
      updateYensDisplay();
      saveGame();
  });

  // Sistema De Promover
  elements.upgradeBtn.addEventListener('click', function () {
      if (yens >= upgradeCost) {
          yens -= upgradeCost;
          clickValue += 1000;
          upgradeCost *= 2;
          updateAllDisplays();
          const newLevel = currentLevel + 1;
          currentLevel = newLevel;
          elements.evolutionLevelDisplay.classList.add('evolution-level-transition');
          elements.levelDisplay.textContent = currentLevel.toString();
          updateEvolutionLevelDisplay();
          setTimeout(() => {
              elements.evolutionLevelDisplay.classList.remove('evolution-level-transition');
          }, 600);
      }
      else {
          const faltaYens = upgradeCost - yens;
          const mensagem = getUpgradeMessage(faltaYens);
          displayMessage(mensagem);
      }
  });

  // Sistema De Mostrar/Retirar Abreviações
  elements.clickBtn.addEventListener('mousedown', function () {
      clickHoldTimeout = setTimeout(function () {
          isAbbreviated = false;
          updateYensPerClickDisplay(); // Para Mouse (Iniciado) - Do Yens
      }, 500);
  });
  elements.clickBtn.addEventListener('touchstart', function () {
      clickHoldTimeout = setTimeout(function () {
          isAbbreviated = false;
          updateYensPerClickDisplay(); // Para Toque (Iniciado) - Do Yens
      }, 500);
  });
  elements.clickBtn.addEventListener('mouseup', function () {
      clearTimeout(clickHoldTimeout);
      resetClickAbbreviation(); // Para Mouse (Finalizado) - Do Clique
  });
  elements.clickBtn.addEventListener('touchend', function () {
      clearTimeout(clickHoldTimeout);
      resetClickAbbreviation(); // Para Toque (Finalizado) - Do Clique
  });
  elements.upgradeBtn.addEventListener('mousedown', function () {
      upgradeHoldTimeout = setTimeout(function () {
          isAbbreviated = false;
          updateUpgradeCostDisplay(); // Para Mouse (Iniciado) - Do Promover
      }, 400);
  });
  elements.upgradeBtn.addEventListener('touchstart', function () {
      upgradeHoldTimeout = setTimeout(function () {
          isAbbreviated = false;
          updateUpgradeCostDisplay(); // Para Toque (Iniciado) - Do Promover
      }, 400);
  });
  elements.upgradeBtn.addEventListener('mouseup', function () {
      clearTimeout(upgradeHoldTimeout);
      resetUpgradeAbbreviation(); // Para Mouse (Finalizado) - Do Promover
  });
  elements.upgradeBtn.addEventListener('touchend', function () {
      clearTimeout(upgradeHoldTimeout);
      resetUpgradeAbbreviation(); // Para Toque (Finalizado) - Do Promover
  });

  // Resetar Abreviações
  function resetClickAbbreviation() {
      isAbbreviated = true;
      updateYensPerClickDisplay(); // Yens
  }
  function resetUpgradeAbbreviation() {
      isAbbreviated = true;
      updateUpgradeCostDisplay(); // Promover
  }

  //Sistema De Rebirth

  elements.resetBtn.addEventListener('click', function () {
      localStorage.clear();
      yens = 10;
      clickValue = 1000;
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

// Mensagens
function getUpgradeMessage(faltaYens) {
  if (faltaYens >= 100000) {
      return `Aguente Firme! \n Faltam ¥${faltaYens.toLocaleString()}.`;
  }
  else if (faltaYens < 10000 && faltaYens > 3000) {
      return `Quase Lá! \n Faltam ¥${faltaYens.toLocaleString()}.`;
  }
  else {
      return `Falta Pouco! \n Restam Apenas ¥${faltaYens.toLocaleString()}.`;
  }
}

function displayMessage(message) {
  const messageBox = document.getElementById('message-box');
  const messageText = document.getElementById('message-text');
  const okButton = document.getElementById('ok-button');
  messageText.innerHTML = message;
  messageBox.style.zIndex = '10000';
  messageBox.style.display = 'flex';
  okButton.addEventListener('click', function () {
      messageBox.style.display = 'none';
  });
}