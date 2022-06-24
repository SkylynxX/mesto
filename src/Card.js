export class Card {
  constructor (initialCard, templateSelector, handlePhotoClick, callbackAddLikeClick, callbackRemoveLikeClick, handleRemoveCardClick) {
    // console.log('карта:')
    // console.log(initialCard)
    this._name = initialCard.name;
    this._link = initialCard.link;
    this._id = initialCard._id;
    this._ownerID = initialCard.owner._id;
    this._likes = initialCard.likes;
    this._templateSelector = templateSelector;
    this._handlePhotoClick = handlePhotoClick;
    this._callbackAddLikeClick = callbackAddLikeClick;
    this._callbackRemoveLikeClick = callbackRemoveLikeClick;
    this._handleRemoveCardClick = handleRemoveCardClick;
  }
  setCurrentUserID (currentUserID) {
    this._currentUserID = currentUserID;
  }

  createCard () {
    this._prepareLayout();
    this._addEvtListners();
    return this._elementContent;
  }

  _prepareLayout(){
    const template =  document.querySelector(this._templateSelector).content;
    this._elementContent = template.querySelector('.element').cloneNode(true);
    this._buttonLike = this._elementContent.querySelector('.element__group-button');
    this._likeAmount = this._elementContent.querySelector('.element__group-button-number');
    this._cardImg = this._elementContent.querySelector('.element__image');
    this._buttonRemove = this._elementContent.querySelector('.element__trash');
    this._cardImg.src = this._link;
    this._elementContent.querySelector('.element__group-text').textContent = this._name;
    this._cardImg.alt = this._name;
    this.calculateLikeAmount();
    if (this._isLikeOwner()) {
      this._buttonLike.classList.toggle('element__group-button_black');
    }
    this._setRemoveButtonForCardOwner();
  }

  _addEvtListners () {
    this._elementContent.querySelector('.element__group-button').addEventListener('click', () => this._toggleLike());
    this._buttonRemove.addEventListener('click', () => this._handleRemoveCardClick(this._id));
    this._cardImg.addEventListener('click', () => this._handlePhotoClick({name: this._name, link: this._link}));
  }

  _isLikeOwner () {
    return this._likes.some((item) => item._id === this._currentUserID);
  }

  _setRemoveButtonForCardOwner() {
    if (this._currentUserID !== this._ownerID) {
      this._buttonRemove.remove();
    }
  }

  calculateLikeAmount () {
    this._likeAmount.textContent = String(this._likes.length);
  }

  toggleButtonLike (newLikes) {
    this._likes = newLikes;
    this._buttonLike.classList.toggle('element__group-button_black');
  }

  _toggleLike () {
    if (this._isLikeOwner()) {
      this._callbackRemoveLikeClick(this._id);
    } else {
      this._callbackAddLikeClick(this._id)
    }
  }

  removeCard () {
    this._elementContent.remove();
    this._elementContent = null;
  }
}



