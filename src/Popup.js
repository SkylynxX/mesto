export class Popup {
  constructor (selectorPopup) {
    this._selectorPopup = selectorPopup;
    this._popup = document.querySelector(`.${selectorPopup}`);
    this._closePopupButton =  this._popup.querySelector(`.${selectorPopup}__close`);
    this._handleEscCloseLink = this._handleEscClose.bind(this);
  }

  open () {
    document.addEventListener('keydown', this._handleEscCloseLink);
    this._popup.classList.add('popup_opened');
  }

  close () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscCloseLink);
  }

  _handleEscClose (evt) {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners () {
    this._popup.addEventListener('click', (evt) => {
      if(evt.target === evt.currentTarget) {
        this.close();
      }
    });
    this._closePopupButton.addEventListener('click', () => this.close());
  }
}
