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

const initialCards = [
  {
    name: 'Витебский вокзал',
    link: 'https://images.unsplash.com/photo-1551709076-89f2499d383b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Исаакиевский собор',
    link: 'https://images.unsplash.com/photo-1603732547557-b8f216d50442?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
  },
  {
    name: 'Магазин Купцов Елисеевых',
    link: 'https://images.unsplash.com/photo-1550643749-d9add3db05e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
  },
  {
    name: 'Дворцовая набережная',
    link: 'https://images.unsplash.com/photo-1592029328294-dd71c43655c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80'
  },
  {
    name: 'Казанский собор',
    link: 'https://images.unsplash.com/photo-1613739341441-2e932ab930c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Санкт-Петребург',
    link: 'https://images.unsplash.com/photo-1603732547504-ad3c5598e347?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  }
];


//Функция открытия попапа
function openPopup (popup) {
  popup.classList.add('popup_opened');
};

//Функция закрытие попапа
function closePopup (popup) {
  popup.classList.remove('popup_opened');
};

//Функция открытия попапа редактирования профиля
function openPopupHead () {
  popupFormName.value = nameTitle.textContent;
  popupFormInfo.value = infoSubtitle.textContent;
  openPopup(popupHeadForm);
};


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameTitle.textContent =  popupFormName.value;
  infoSubtitle.textContent = popupFormInfo.value;
  closePopup(popupHeadForm);
};


function createCard (item) {
  const elementContent = templateElemet.querySelector('.element').cloneNode(true);
  elementContent.querySelector('.element__image').src = item.link;
  elementContent.querySelector('.element__group-text').textContent = item.name;
  elementContent.querySelector('.element__image').alt = item.name;
  elementContent.querySelector('.element__group-button').addEventListener('click', (evt) => evt.target.classList.toggle('element__group-button_black'));
  elementContent.querySelector('.element__trash').addEventListener('click', (evt) => evt.target.closest('.element').remove());
  elementContent.querySelector('.element__image').addEventListener('click', function(){
    popupImage.querySelector('.popup-image__img').src = item.link;
    popupImage.querySelector('.popup-image__img').alt = item.name;
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
};




formElement.addEventListener('submit', formSubmitHandler);
popupShowButton.addEventListener('click', openPopupHead);
popupCloseButton.addEventListener('click', () => closePopup (popupHeadForm));
popupPlusShowButton.addEventListener('click', () => openPopup (popupNewItemForm));
popupPlusCloseButton.addEventListener('click', () => closePopup (popupNewItemForm));
popupNIForm.addEventListener('submit', addCard);
popupImgClose.addEventListener('click', () => closePopup (popupImage));

