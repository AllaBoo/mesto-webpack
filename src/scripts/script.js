import "../pages/index.css";
import { Card } from './Card.js';
import { CardList } from './CardList.js';
import { Api } from './Api.js';
import { FormValidator } from './FormValidator.js';
import { PopupPhoto } from './PopupPhoto.js';
import { PopupEditUser } from './PopupEditUser.js';
import { PopupAddCard } from './PopupAddCard.js';
import { UserInfo } from './UserInfo.js';

const editUserInfo = (...args) => new UserInfo(...args);
const createCard = (...args) => new Card(...args);
const addCard = (...arg) => new CardList(placeList, popupPhoto, cardTemplate, createCard, api).addCard(...arg);
const formValidator = (...arg) => new FormValidator(...arg);

const placeList = document.querySelector('.places-list');
const addButton = document.querySelector('.user-info__button');
const editUserButton = document.querySelector('.user-info__edit-button');
const addPopup = document.querySelector('#place');
const profilePopup = document.querySelector('#profile');
const userData = {
  name: document.querySelector('.user-info__name'),
  job: document.querySelector('.user-info__job'),
  avatar: document.querySelector('.user-info__photo')
}

const cardTemplate = document.querySelector('#card__template').content.querySelector('.place-card');
const API_URL = NODE_ENV === 'production' ? 'https://nomoreparties.co' : 'http://nomoreparties.co';
const config = {
  url: `${API_URL}/cohort11/`,
  headers: {
    authorization: '355bd7e8-4de5-49a3-874a-61a96172f440',
    'Content-Type': 'application/json'
  }
};

const api = new Api(config);
const popupPhoto = new PopupPhoto(document.querySelector('#photo'));
const userInfo = new UserInfo(api, userData);
userInfo.setUserInfo();
const cardList = new CardList(placeList, popupPhoto, cardTemplate, createCard, api);
cardList.render();

addButton.addEventListener('click', () => new PopupAddCard(addPopup, addCard, formValidator, api).open());
editUserButton.addEventListener('click', () => new PopupEditUser(profilePopup, formValidator, api, userInfo).open());