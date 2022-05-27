import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './cards.js';


const popupHeadForm = document.querySelector('.popup_profile');
const popupFormName = document.querySelector ('.popup__input_type_name');
const popupFormInfo = document.querySelector ('.popup__input_type_info');
const popupShowButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popupHeadForm.querySelector('.popup__close');
const formElement = popupHeadForm.querySelector('.popup__form_profile');
const nameTitle = document.querySelector ('.profile__title');
const infoSubtitle = document.querySelector ('.profile__subtitle');
const popupNewItemForm = document.querySelector('.popup_new-item');
const popupPlusShowButton = document.querySelector('.profile__add-button');
const popupPlusCloseButton = document.querySelector('.popup__close_new-item');
const templateElemet = document.querySelector('.template').content;
const cardsContainer = document.querySelector('.elements');
const popupNIFormName = document.querySelector('.popup__input_new-item_name');
const popupNIFormLink = document.querySelector('.popup__input_new-item_link');
const popupNIForm = document.querySelector('.popup__form_new-item');
const popupImage = document.querySelector('.popup-image');
const popupImgClose = document.querySelector('.popup-image__close');
const popupImageImg = popupImage.querySelector('.popup-image__img');

const checkEsc = (evt) => {
  if(evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};


//Функция добавления собатия для закрытиря попапа по клику на overlay или нажатию Esc\\
function addCloseListener(popup) {
  popup.addEventListener('click', (evt) => {
    if(evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
  document.addEventListener('keydown', checkEsc);
}

//Функция открытия попапа
function openPopup (popup) {
  popup.classList.add('popup_opened');
};

//Функция закрытие попапа
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', checkEsc);
};

//Функция открытия попапа редактирования профиля
function openPopupHead () {
  popupFormName.value = nameTitle.textContent;
  popupFormInfo.value = infoSubtitle.textContent;
  openPopup(popupHeadForm);
};

function openPopupCard (item){
  popupImageImg.src = item.querySelector('.element__image').src;
  popupImageImg.alt = item.querySelector('.element__group-text').textContent;
  popupImage.querySelector('.popup-image__text').textContent = popupImageImg.alt;
  openPopup(popupImage);
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitProfile (evt) {
  evt.preventDefault();
  nameTitle.textContent =  popupFormName.value;
  infoSubtitle.textContent = popupFormInfo.value;
  closePopup(popupHeadForm);
};


function renderCard (item) {
  const element = new Card(item, '.template', openPopupCard);
  cardsContainer.prepend(element.createCard());
}

//функция добавления 6-ти карточек
initialCards.forEach(renderCard);

//функция добавления карточек через форму в попапе new-item
function addCard (evt) {
  evt.preventDefault();
  renderCard({'name': popupNIFormName.value, 'link': popupNIFormLink.value});
  closePopup (popupNewItemForm);
  popupNIForm.reset();
  validatorNIForm.disableButton(popupNewItemForm.querySelector('.popup__save_new-item'), 'popup__save_disabled');
};


const validatorFields = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_visible'
};


const validatorHeadForm = new FormValidator(validatorFields, formElement);
validatorHeadForm.enableValidation();
const validatorNIForm = new FormValidator(validatorFields, popupNIForm);
validatorNIForm.enableValidation();



addCloseListener(popupImage);
addCloseListener(popupHeadForm);
addCloseListener(popupNewItemForm);
formElement.addEventListener('submit', formSubmitProfile);
popupShowButton.addEventListener('click', openPopupHead);
popupCloseButton.addEventListener('click', () => closePopup (popupHeadForm));
popupPlusShowButton.addEventListener('click', () => openPopup (popupNewItemForm));
popupPlusCloseButton.addEventListener('click', () => closePopup (popupNewItemForm));
popupNIForm.addEventListener('submit', addCard);
popupImgClose.addEventListener('click', () => closePopup (popupImage));


