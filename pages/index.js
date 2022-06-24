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



const userInfo = new UserInfo('profile__title','profile__subtitle','profile__avatar');

const popupImage = new PopupWithImage('popup-image');
popupImage.setEventListeners();

const cards = new Section({method: creatNewCard}, 'elements');

const popupShowButton = document.querySelector('.profile__edit-button');
const popupPlusShowButton = document.querySelector('.profile__add-button');
const popupAvaterButton = document.querySelector('.profile__avatar-link')
const templateElemet = document.querySelector('.template').content;
const validatorFields = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_visible'
};

api.getUserInfo()
    .then((rxUserInfo) => {
      // console.log(rxUserInfo);
      userInfo.setUserInfo(rxUserInfo);
      api.getInitialCards()
        .then((initCards) => {
          // console.log(initCards);
          cards.addItems(initCards);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));


  const popupHeadForm = new PopupWithForm('popup-profile',
    (userInfoData) => {
      popupHeadForm.setButtonText('Cохранение...');
      api
        .setUserInfo(userInfoData)
        .then((res) => {
          userInfo.setUserInfo(res);
        })
        .catch((err) => {
          popupHeadForm.setButtonText(err);
          console.log(err)
        })
        .finally(() => {
          popupHeadForm.close();
          popupHeadForm.setButtonText('Сохранить');
        });
    });
  const validatorHeadForm  = new FormValidator(validatorFields, popupHeadForm.getForm());
  popupHeadForm.setEventListeners(validatorHeadForm);


  const popupAvatar = new PopupWithForm('popup-avatar-update',
    (userInfoData) => {
      popupAvatar.setButtonText('Cохранение...');
      api
        .setUserAvatar(userInfoData)
        .then((res) => {
          userInfo.setUserInfo(res);
        })
        .catch((err) => {
          popupAvatar.setButtonText(err);
          console.log(err)
        })
        .finally(() => {
          popupAvatar.close();
          popupAvatar.setButtonText('Сохранить');
        });
    });
  const validatorAvatarForm  = new FormValidator(validatorFields, popupAvatar.getForm());
  popupAvatar.setEventListeners(validatorAvatarForm);

  const popupNewItemForm = new PopupWithForm('popup-new-item',
    (cardData) => {
      popupNewItemForm.setButtonText("Сохранение...");
      api
        .addCard(cardData)
        .then((res) => {
          cards.addItem(res);
        })
        .catch((err) => {
          popupNewItemForm.setButtonText(err);
          console.log(err);
        })
        .finally(() => {
          popupNewItemForm.close();
          popupNewItemForm.setButtonText("Сохранить");
        });
    }
  );
  const validatorNewItemForm  = new FormValidator(validatorFields, popupNewItemForm.getForm());
  popupNewItemForm.setEventListeners(validatorNewItemForm);


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

const popupDeleteCard = new PopupWithConfirmation('popup-confirm');
popupDeleteCard.setEventListeners();

// объект добавления 6-ти карточек из изначального массива



popupShowButton.addEventListener('click', () => popupHeadForm.open(userInfo.getUserInfo()));
popupPlusShowButton.addEventListener('click', () => popupNewItemForm.open());
popupAvaterButton.addEventListener('click', () => popupAvatar.open());


