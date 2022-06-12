import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor (selectorPopup) {
    super(selectorPopup);
    this._popupImg = this._popup.querySelector('.popup-image__img');
    this._popupText = this._popup.querySelector('.popup-image__text');
  }
  open (item) {
    // console.log(item);
    this._popupImg.src = item.link;
    this._popupImg.alt = item.name;
    this._popupText.textContent = item.name;
    super.open();
  }
}
