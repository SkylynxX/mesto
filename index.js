

function open_popup_head () {
  let popup_head_form = document.querySelector('.popup');
  popup_head_form.classList.add('popup_opened');
  let popup_text_name = document.querySelector ('.profile__title').innerHTML;
  let popup_text_description = document.querySelector ('.profile__subtitle').innerHTML;
  let popup_form_name = document.querySelector ('.popup__name');
  popup_form_name.value = popup_text_name;
  let popup_form_info = document.querySelector ('.popup__info');
  popup_form_info.value = popup_text_description;
  // console.log (popup_text_description);
}

function close_popup_head () {
  let popup_head_form = document.querySelector('.popup');
  popup_head_form.classList.remove('popup_opened');
}

let popup_show_button = document.querySelector('.profile__edit-button');
popup_show_button.addEventListener('click', open_popup_head);

let popup_close_button = document.querySelector('.popup__close');
popup_close_button.addEventListener('click', close_popup_head);


// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault();
  let popup_form_name = document.querySelector ('.popup__name');
  let popup_form_info = document.querySelector ('.popup__info');
  let name_title = document.querySelector ('.profile__title');
  name_title.textContent =  popup_form_name.value;
  let info_subtitle = document.querySelector ('.profile__subtitle');
  // console.log ( popup_form_info.value);
  info_subtitle.textContent = popup_form_info.value;
  close_popup_head();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

