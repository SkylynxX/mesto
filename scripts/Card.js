export class Card {
  constructor (initialCard, templateSelector, handlePhotoClick) {
    this._name = initialCard.name;
    this._link = initialCard.link;
    this._templateSelector = templateSelector;
    this._handlePhotoClick = handlePhotoClick;
  }

  createCard () {
    this._prepareLayout();
    this._addEvtListners();
    return this._elementContent;
  }

  _prepareLayout(){
    const template =  document.querySelector(this._templateSelector).content;
    this._elementContent = template.querySelector('.element').cloneNode(true);
    this._buttonLike = this._elementContent.querySelector('.element__group-button')
    this._cardImg = this._elementContent.querySelector('.element__image');
    this._cardImg.src = this._link;
    this._elementContent.querySelector('.element__group-text').textContent = this._name;
    this._cardImg.alt = this._name;
  }

  _addEvtListners(){
    this._elementContent.querySelector('.element__group-button').addEventListener('click', () => this._toggleLike());
    this._elementContent.querySelector('.element__trash').addEventListener('click', () => this._removeCard());
    this._cardImg.addEventListener('click', () => this._handlePhotoClick(this._elementContent));
  }

  _toggleLike () {
    this._buttonLike.classList.toggle('element__group-button_black');
  }

  _removeCard () {
    this._elementContent.remove();
    this._elementContent = null;
  }

}




