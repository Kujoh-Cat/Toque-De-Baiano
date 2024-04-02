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