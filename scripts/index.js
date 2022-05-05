const popupHeadForm = document.querySelector('.popup_profile');
const popupFormName = document.querySelector ('.popup__input_type_name');
const popupFormInfo = document.querySelector ('.popup__input_type_info');
const popupShowButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popupHeadForm.querySelector('.popup__close');
const formElement = popupHeadForm.querySelector('.popup__form');
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
  addCloseListener(popup);
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


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitProfile (evt) {
  evt.preventDefault();
  nameTitle.textContent =  popupFormName.value;
  infoSubtitle.textContent = popupFormInfo.value;
  closePopup(popupHeadForm);
};


function createCard (item) {
  const elementContent = templateElemet.querySelector('.element').cloneNode(true);
  const cardImg = elementContent.querySelector('.element__image');
  cardImg.src = item.link;
  elementContent.querySelector('.element__group-text').textContent = item.name;
  cardImg.alt = item.name;
  elementContent.querySelector('.element__group-button').addEventListener('click', (evt) => evt.target.classList.toggle('element__group-button_black'));
  elementContent.querySelector('.element__trash').addEventListener('click', (evt) => evt.target.closest('.element').remove());
  cardImg.addEventListener('click', function(){
    popupImageImg.src = item.link;
    popupImageImg.alt = item.name;
    popupImage.querySelector('.popup-image__text').textContent = item.name;
    openPopup(popupImage);
  });
  return elementContent;
};

function renderCard (item) {
  const element = createCard (item);
  cardsContainer.prepend(element);
}

//функция добавления 6-ти карточек
initialCards.forEach(renderCard);

//функция добавления карточек через форму в попапе new-item
function addCard (evt) {
  evt.preventDefault();
  renderCard({'name': popupNIFormName.value, 'link': popupNIFormLink.value});
  closePopup (popupNewItemForm);
  popupNIForm.reset();
  disableButten(popupNewItemForm.querySelector('.popup__save_new-item'), 'popup__save_disabled');
};

formElement.addEventListener('submit', formSubmitProfile);
popupShowButton.addEventListener('click', openPopupHead);
popupCloseButton.addEventListener('click', () => closePopup (popupHeadForm));
popupPlusShowButton.addEventListener('click', () => openPopup (popupNewItemForm));
popupPlusCloseButton.addEventListener('click', () => closePopup (popupNewItemForm));
popupNIForm.addEventListener('submit', addCard);
popupImgClose.addEventListener('click', () => closePopup (popupImage));


