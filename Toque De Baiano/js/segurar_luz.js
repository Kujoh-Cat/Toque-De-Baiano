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
