'use strict';

(() => {
  const messages = [`Всё отлично!`,
    `В целом всё неплохо. Но не всё.`,
    `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
    `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
    `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
  ];


  const getComments = (imgIndx) => {
    const temp = [];
    for (let i = 0; i < imgIndx * window.getRandom(0, 100); i++) {
      temp.push({
        avatar: window.userAvatar.getAvatar(),
        name: window.userName.getName(),
        messages: messages[window.getRandom(0, messages.length - 1)]
      });
    }
    return temp;
  };

  window.userComments = {
    getComments: getComments
  };
})();
