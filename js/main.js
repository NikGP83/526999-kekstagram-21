'use strict';

const MAX_PERCENT = 100;
const INITIAL_SCALE_FACTOR = '100';

const usersImg = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');
const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const imgPrevew = document.querySelector('.img-upload__preview');
const imgOverlayClose = document.querySelector('#upload-cancel');
const scaleBtnSmaller = document.querySelector('.scale__control--smaller');
const scaleBtnBigger = document.querySelector('.scale__control--bigger');
const scaleIndicator = document.querySelector('.scale__control--value');
const effectLevelPin = document.querySelector('.effect-level__pin');

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

function doOpenModal() {
  uploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  doScale(INITIAL_SCALE_FACTOR);
}

function doCloseModal() {
  uploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  uploadFile.value = '';
}

uploadFile.addEventListener('change', () => {
  doOpenModal();
});

imgOverlayClose.addEventListener('click', () => {
  doCloseModal();
});

window.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    doCloseModal();
  }
});

function getCount() {
  const text = scaleIndicator.value;
  const prc = text.substring(0, text.length - 1);
  const num = Number(prc);
  return num === Number.NaN ? INITIAL_SCALE_FACTOR : num;
}

function scaleUp() {
  let count = getCount();
  if (count < 100) {
    (count += 25);
  }
  return count;
}

function scaleDown() {
  let count = getCount();
  if (count > 25) {
    (count -= 25);
  }
  return count;
}

function doScale(value) {
  scaleIndicator.value = `${value}%`;
  imgPrevew.style.transform = `scale(${value / MAX_PERCENT}`;
}


scaleBtnBigger.addEventListener('click', () => {
  doScale(scaleUp());
});


scaleBtnSmaller.addEventListener('click', () => {
  doScale(scaleDown());
});


const effects = document.querySelector('.effects__list');
// const effectsButton = document.querySelector('.effects__radio');
const imgBigPic = document.querySelector('.img-upload__preview');

let getPigPicClass = (evt) => {
  if (imgBigPic.classList.contains(evt.target.value)) {
    imgBigPic.classList.remove(evt.target.value);
    // } else if (imgBigPic.classList.contains(evt.target.value)) {
    //   imgBigPic.classList.remove();
  } else {
    imgBigPic.classList.toggle(evt.target.value);
    // imgBigPic.classList.add
  }

};

effects.addEventListener('change', getPigPicClass);
