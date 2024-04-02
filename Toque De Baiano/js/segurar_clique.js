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