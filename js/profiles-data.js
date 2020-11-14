'use strict';

(() => {
  const getProfiles = () => {
    const profilesNum = 25;
    const temp = [];
    for (let i = 0; i < profilesNum; i++) {
      temp.push({
        url: `photos/${i + 1}.jpg`,
        avatar: window.userAvatar.getAvatar(),
        name: window.userName.getName(),
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
