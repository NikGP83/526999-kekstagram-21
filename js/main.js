'use strict';

const usersImg = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');
const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const imgPrevew = document.querySelector('.img-upload__preview');
const imgOverlayClose = document.querySelector('#upload-cancel');
const scaleBtnSmaller = document.querySelector('.scale__control--smaller');
const scaleBtnBigger = document.querySelector('.scale__control--bigger');
const scaleIndicator = document.querySelector('.scale__control--value');

const profilesNum = 25;
const userNames = [`Вася`, `Лена`, `Слава`, `Толя`, `Оля`, `Катя`];
const messages = [`Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];

const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getAvatar = () => `img/avatar-${getRandom(0, 6)}.svg`;
const getName = () => userNames[getRandom(0, userNames.length - 1)];
const getComments = (imgIndx) => {
  const temp = [];
  for (let i = 0; i < imgIndx * getRandom(0, 100); i++) {
    temp.push({
      avatar: getAvatar(),
      name: getName(),
      messages: messages[getRandom(0, messages.length - 1)]
    });
  }
  return temp;
};

const getProfiles = () => {
  const temp = [];
  for (let i = 0; i < profilesNum; i++) {
    temp.push({
      url: `photos/${i + 1}.jpg`,
      avatar: getAvatar(),
      name: getName(),
      likes: getRandom(15, 200),
      comments: getComments((i + 1))
    });
  }
  return temp;
};

const profiles = getProfiles();

const getProfileInf = (profileParam) => {

  let profileElement = template.cloneNode(true);

  profileElement.querySelector('.picture__img').src = profileParam.url;
  profileElement.querySelector('.picture__comments').textContent = profileParam.comments.length;
  profileElement.querySelector('.picture__likes').textContent = profileParam.likes;

  return profileElement;

};

const render = () => {

  let fragment = document.createDocumentFragment();

  for (let i = 0; i < profilesNum; i++) {
    fragment.appendChild(getProfileInf(profiles[i]));
  }

  usersImg.appendChild(fragment);
};

render();

/* задание 4.1 */

uploadFile.addEventListener('change', () => {
  uploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
});

imgOverlayClose.addEventListener('click', () => {
  uploadOverlay.classList.add('hidden');
});

imgOverlayClose.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    uploadOverlay.classList.add('hidden');
  }
});

function Counter() {
  let count = 0;

  this.up = () => {
    if (count < 100) {
      (count += 25);
    }
    return count;
  };

  this.down = () => {
    if (count > 0) {
      (count -= 25);
    }
    return count;
  };
}

let counter = new Counter();

let func = (countBtn, indicatorNum, scale) => {
  countBtn.addEventListener('click', () => {
    let scaleNum = 100;
    indicatorNum.value = `${counter.up()}%`;
    scale.style.transform = `scale(${counter.up() / scaleNum}`;
  });
};

func(scaleBtnBigger, scaleIndicator, imgPrevew);

let func2 = (countBtn, indicatorNum, scale) => {
  countBtn.addEventListener('click', () => {
    let scaleNum = 100;
    indicatorNum.value = `${counter.down()}%`;
    scale.style.transform = `scale(${counter.down() / scaleNum})`;
  });
};

func2(scaleBtnSmaller, scaleIndicator, imgPrevew);

const effects = document.querySelector('.effects__list');
// const effectsButton = document.querySelector('.effects__radio');
const imgBigPic = document.querySelector('.img-upload__preview');

let getPigPicClass = (evt) => {
  if (!imgBigPic.classList.contains(evt.target.value)) {
    imgBigPic.classList.add(evt.target.value);
  } else if (imgBigPic.classList.contains(evt.target.value)) {
    imgBigPic.classList.remove();
  }
};

effects.addEventListener('change', getPigPicClass);
