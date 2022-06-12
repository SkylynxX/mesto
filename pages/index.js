import { Card } from '../src/Card.js';
import { initialCards } from '../utils/constants.js';
import { Section } from '../src/Section.js';
import { Popup } from '../src/Popup.js';
import { PopupWithImage } from '../src/PopupWithImage';
import { PopupWithForm } from '../src/PopupWithForm.js';
import { UserInfo } from '../src/UserInfo.js';
import { FormValidator } from '../src/FormValidator.js';
import './../pages/index.css';

const popupImage = new PopupWithImage('popup-image');
const cards = new Section({cards: initialCards, method: creatNewCard}, 'elements');
const nameTitle = new UserInfo('profile__title','profile__subtitle');
const popupHeadForm = new PopupWithForm('popup-profile', nameTitle.setUserInfo.bind(nameTitle));
const popupShowButton = document.querySelector('.profile__edit-button');
const popupNewItemForm = new PopupWithForm('popup-new-item', cards.addItem.bind(cards));
const popupPlusShowButton = document.querySelector('.profile__add-button');
const templateElemet = document.querySelector('.template').content;
const validatorFields = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_visible'
};
const validatorHeadForm  = new FormValidator(validatorFields, popupHeadForm.getForm());
popupHeadForm.setEventListeners(validatorHeadForm);
const validatorNewItemForm  = new FormValidator(validatorFields, popupNewItemForm.getForm());
popupNewItemForm.setEventListeners(validatorNewItemForm);
popupImage.setEventListeners();


// функция которая создает объект в глобальном скоупе, используется и
// для создания для изначального массива и для передачи в качестве хендлера
//в попап создания новой карточки
function creatNewCard (item) {
  const element = new Card(item, '.template', popupImage.open.bind(popupImage));
  return element.createCard();
}

// объект добавления 6-ти карточек из изначального массива



popupShowButton.addEventListener('click', () => popupHeadForm.open(nameTitle.getUserInfo()));
popupPlusShowButton.addEventListener('click', () => popupNewItemForm.open());


