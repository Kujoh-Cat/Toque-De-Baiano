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
});