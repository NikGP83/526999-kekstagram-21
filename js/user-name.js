'use strict';

(() => {
  const userNames = [`Вася`, `Лена`, `Слава`, `Толя`, `Оля`, `Катя`];

  const getName = () => userNames[window.getRandom(0, userNames.length - 1)];

  window.userName = {
    getName: getName
  };
})();
