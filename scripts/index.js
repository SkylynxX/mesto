let popupHeadForm = document.querySelector('.popup');
let popupFormName = document.querySelector ('.popup__input_type_name');
let popupFormInfo = document.querySelector ('.popup__input_type_info');
let popupShowButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameTitle = document.querySelector ('.profile__title');
let infoSubtitle = document.querySelector ('.profile__subtitle');

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

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»


formElement.addEventListener('submit', formSubmitHandler);
popupShowButton.addEventListener('click', openPopupHead);
popupCloseButton.addEventListener('click', closePopupHead);
