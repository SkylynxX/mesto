const popupHeadForm = document.querySelector('.popup');
const popupFormName = document.querySelector ('.popup__input_type_name');
const popupFormInfo = document.querySelector ('.popup__input_type_info');
const popupShowButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
const nameTitle = document.querySelector ('.profile__title');
const infoSubtitle = document.querySelector ('.profile__subtitle');
const popupNewItemForm = document.querySelector('.popup_new-item');
const popupPlusShowButton = document.querySelector('.profile__add-button');
const popupPlusCloseButton = document.querySelector('.popup__close_new-item');
const templateElemet = document.querySelector('.template').content;
const elementList = document.querySelector('.elements');
const popupNIFormName = document.querySelector('.popup__input_new-item_name');
const popupNIFormLink = document.querySelector('.popup__input_new-item_link');
const popupNIForm = document.querySelector('.popup__form_new-item');
const popupImage = document.querySelector('.popup-image');
const popupImgClose = document.querySelector('.popup-image__close');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


//Функция открытия попапа
function openPopupHead () {
  popupHeadForm.classList.add('popup_opened');
  popupFormName.value = nameTitle.textContent;
  popupFormInfo.value = infoSubtitle.textContent;
  // console.log (popup_text_description);
}

function closePopupHead () {
  popupHeadForm.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameTitle.textContent =  popupFormName.value;
  // console.log ( popupFormInfo.value);
  infoSubtitle.textContent = popupFormInfo.value;
  closePopupHead();
}


// функция открытия попапа создания карточек
function openPopupPlus () {
  popupNewItemForm.classList.add('popup_opened');
  console.log (openPopupPlus);
}
//функция закрытия попапа создания карточек
function closePopupPlus () {
  popupNewItemForm.classList.remove('popup_opened');
}


//функция добавления 6-ти карточек
initialCards.forEach(function (item){
  const elementContent = templateElemet.querySelector('.element').cloneNode(true);
  elementContent.querySelector('.element__image').src = item.link;
  elementContent.querySelector('.element__group-text').textContent = item.name;
  elementList.prepend(elementContent);
})

//функция добавления слушателя выполняющая нажатие лайка
function addPushLikeListener(item){
  item.addEventListener('click',function (){
    if (item.classList.contains('element__group-button_black')){
      item.classList.remove('element__group-button_black');
    }
    else {
    item.classList.add('element__group-button_black');
    }
  });
}

//функция добавления слушателя удаления карточек
function addPushRemoveListener(item){
  item.addEventListener('click', function (){
    const listItem = item.closest('.element');
    listItem.remove();
  })
}

//функция добавления слушателя открытия попапа карточек
function addPushPictureListener(item){
  item.addEventListener('click', function(){
    popupImage.querySelector('.popup-image__img').src = item.src;
    popupImage.querySelector('.popup-image__img').alt = item.alt;
    popupImage.querySelector('.popup-image__text').textContent = item.closest('.element').querySelector('.element__group-text').textContent;
    openedPopupImg();
  })
}

//функция добавления карточек через форму в попапе new-item
function addCard (evt) {
  evt.preventDefault();
  const elementContent = templateElemet.querySelector('.element').cloneNode(true);
  elementContent.querySelector('.element__image').src = popupNIFormLink.value;
  elementContent.querySelector('.element__image').alt = popupNIFormName.value;
  elementContent.querySelector('.element__group-text').textContent = popupNIFormName.value;
  elementList.prepend(elementContent);
  addPushLikeListener(elementContent.querySelector('.element__group-button'));
  addPushRemoveListener(elementContent.querySelector('.element__trash'));
  addPushPictureListener(elementContent.querySelector('.element__image'));
  closePopupPlus ();
  popupNIFormName.value = '';
  popupNIFormLink.value = '';
}





function openedPopupImg (){
  popupImage.classList.add('popup_opened');
  console.log (openedPopupImg);
};

function closePopupImg () {
  popupImage.classList.remove('popup_opened');
}



//поиск кнопок должен быть выполнен после создания карточек
const likeButtons = document.querySelectorAll('.element__group-button');
likeButtons.forEach(addPushLikeListener);
//поиск кнопок должен быть выполнен после создания карточек
const trashButton = document.querySelectorAll('.element__trash');
trashButton.forEach(addPushRemoveListener);
//поиск картинок должен быть выполнен после создания карточек
const cardImgList = document.querySelectorAll('.element__image');
cardImgList.forEach(addPushPictureListener);





formElement.addEventListener('submit', formSubmitHandler);
popupShowButton.addEventListener('click', openPopupHead);
popupCloseButton.addEventListener('click', closePopupHead);
popupPlusShowButton.addEventListener('click', openPopupPlus);
popupPlusCloseButton.addEventListener('click', closePopupPlus);
popupNIForm.addEventListener('submit', addCard);
popupImgClose.addEventListener('click', closePopupImg);
