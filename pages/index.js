import { Card } from '../src/Card.js';
import { Section } from '../src/Section.js';
import { Popup } from '../src/Popup.js';
import { PopupWithImage } from '../src/PopupWithImage';
import { PopupWithForm } from '../src/PopupWithForm.js';
import { PopupWithConfirmation } from '../src/PopupWithConfirmation.js';
import { UserInfo } from '../src/UserInfo.js';
import { FormValidator } from '../src/FormValidator.js';
import { Api } from '../src/Api.js';
import './../pages/index.css';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: '6a502f76-29fe-462f-8f89-e95cbcfe9c07',
    'Content-Type': 'application/json'
  }
});


const userInfo = new UserInfo('.profile__title','.profile__subtitle','.profile__avatar');
const cards = new Section({method: (item) => {
    const card = creatNewCard(item);
    cards.addItem(card);
  }}, 'elements');


const popupImage = new PopupWithImage('.popup-image');
popupImage.setEventListeners();


const popupShowButton = document.querySelector('.profile__edit-button');
const popupPlusShowButton = document.querySelector('.profile__add-button');
const popupAvaterButton = document.querySelector('.profile__avatar-link')
const validatorFields = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_visible'
};

Promise.all([                               //в Promise.all передаем массив промисов которые нужно выполнить
    api.getUserInfo(),
    api.getInitialCards()
  ])
  .then(([rxUserInfo, initialCards])=>{    //попадаем сюда, когда оба промиса будут выполнены, деструктурируем ответ
    userInfo.setUserInfo(rxUserInfo);      //все данные получены, отрисовываем страницу
    cards.addItems(initialCards);
  })
  .catch((err)=>{                          //попадаем сюда если один из промисов завершится ошибкой
    console.log(err);
  })

  const popupHeadForm = new PopupWithForm('.popup-profile',
    (userInfoData) => {
      popupHeadForm.setButtonText('Cохранение...');
      api
        .setUserInfo(userInfoData)
        .then((res) => {
          userInfo.setUserInfo(res);
          popupHeadForm.close();
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          popupHeadForm.setButtonText('Сохранить');
        });
    });
  const validatorHeadForm  = new FormValidator(validatorFields, popupHeadForm.getForm());
  validatorHeadForm.enableValidation();
  popupHeadForm.setEventListeners();


  const popupAvatar = new PopupWithForm('.popup-avatar-update',
    (userInfoData) => {
      popupAvatar.setButtonText('Cохранение...');
      api
        .setUserAvatar(userInfoData)
        .then((res) => {
          userInfo.setUserInfo(res);
          popupAvatar.close();
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          popupAvatar.setButtonText('Сохранить');
        });
    });
  const validatorAvatarForm  = new FormValidator(validatorFields, popupAvatar.getForm());
  validatorAvatarForm.enableValidation();
  popupAvatar.setEventListeners();

  const popupNewItemForm = new PopupWithForm('.popup-new-item',
    (cardData) => {
      popupNewItemForm.setButtonText("Сохранение...");
      api
        .addCard(cardData)
        .then((res) => {
          const card = creatNewCard(res);
          cards.addItem(card);
          popupNewItemForm.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupNewItemForm.setButtonText("Сохранить");
        });
    }
  );
  const validatorNewItemForm  = new FormValidator(validatorFields, popupNewItemForm.getForm());
  validatorNewItemForm.enableValidation();
  popupNewItemForm.setEventListeners();


// функция которая создает объект в глобальном скоупе, используется и
// для создания для изначального массива и для передачи в качестве хендлера
//в попап создания новой карточки
function creatNewCard (item) {
  const element = new Card(item, '.template',
    popupImage.open.bind(popupImage),
    (cardID) => {
      api.addLikeCard(cardID)
      .then((card) => {
        element.toggleButtonLike(card.likes);
        element.calculateLikeAmount();
      })
      .catch(err => console.log(err));
    }
    ,
    (cardID) => {
      api.removeLikeCard(cardID)
      .then((card) => {
        element.toggleButtonLike(card.likes);
        element.calculateLikeAmount();
      })
      .catch(err => console.log(err));
    },
    (cardID) => {
      popupDeleteCard.open();
      popupDeleteCard.setSubmitHandler(() => {
        api
          .removeCard(cardID)
          .then(() => {
            element.removeCard();
            popupDeleteCard.close();
          })
          .catch((err) => console.log(err));
      });
    });
  element.setCurrentUserID(userInfo.getUserID());
  return element.createCard();
}

const popupDeleteCard = new PopupWithConfirmation('.popup-confirm');
popupDeleteCard.setEventListeners();

// объект добавления 6-ти карточек из изначального массива



popupShowButton.addEventListener('click', () => {
  popupHeadForm.setInputValues(userInfo.getUserInfo());
  validatorHeadForm.resetValidation();
  popupHeadForm.open();
});
popupPlusShowButton.addEventListener('click', () => {
  validatorNewItemForm.resetValidation();
  popupNewItemForm.open();
});
popupAvaterButton.addEventListener('click', () => {
  popupAvatar.setInputValues(userInfo.getUserInfo());//из услоя задания не понятно должна ли быть заполнена при открытии, добавила для проверки нового метода
  validatorAvatarForm.resetValidation();
  popupAvatar.open();
});


