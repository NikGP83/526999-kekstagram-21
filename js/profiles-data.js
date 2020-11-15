'use strict';

(() => {
  const userNames = [`Вася`, `Лена`, `Слава`, `Толя`, `Оля`, `Катя`];
  const getAvatar = () => `img/avatar-${window.getRandom(0, 6)}.svg`;
  const getName = () => userNames[window.getRandom(0, userNames.length - 1)];

  const getProfiles = () => {
    const profilesNum = 25;
    const temp = [];
    for (let i = 0; i < profilesNum; i++) {
      temp.push({
        url: `photos/${i + 1}.jpg`,
        avatar: getAvatar(),
        name: getName(),
        likes: window.getRandom(15, 200),
        comments: window.userComments.getComments((i + 1))
      });
    }
    return temp;
  };

  window.profilesData = {
    getProfiles: getProfiles
  };
})();
