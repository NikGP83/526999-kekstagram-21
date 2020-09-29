'use strict';

const profiles = [];
const profilesNum = 25;
const userNames = [`Вася`, `Лена`, `Слава`, `Толя`, `Оля`, `Катя`];

let messages = [`Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];


const usersImg = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');

const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getProfiles = () => {
  for (let i = 0; i < profilesNum; i++) {
    profiles.push({
      url: `photos/${i + 1}.jpg`,
      avatar: `img/avatar-${getRandom(0, 6)}.svg`,
      name: userNames[getRandom(0, userNames.length - 1)],
      likes: getRandom(15, 200),
      comments: messages[getRandom(0, messages.length - 1)]
    });
  }
};

getProfiles();

const getProfileInf = (profileParam) => {

  let profileElement = template.cloneNode(true);

  profileElement.querySelector('.picture__img').src = profileParam.url;
  profileElement.querySelector('.picture__comments').textContent = profileParam.comments;
  profileElement.querySelector('.picture__likes').textContent = profileParam.likes;

  return profileElement;

};

const getRender = () => {

  let fragment = document.createDocumentFragment();

  for (let i = 0; i < profilesNum; i++) {
    fragment.appendChild(getProfileInf(profiles[i]));
  }

  usersImg.appendChild(fragment);
};

getRender();
