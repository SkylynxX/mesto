export class UserInfo {
  constructor (nameElement, infoElement, imgElement) {
    this._nameElement = nameElement;
    this._infoElement = infoElement;
    this._imgElement = imgElement;
    this._nameTitle = document.querySelector(`.${nameElement}`);
    this._infoSubtitle = document.querySelector(`.${infoElement}`);
    this._img = document.querySelector(`.${imgElement}`);
    this._id = null;
  }

  getUserInfo () {
    return {
      name: this._nameTitle.textContent,
      about: this._infoSubtitle.textContent
    };
  }


  setUserInfo (item) {
    // console.log(window.getComputedStyle(this._img, null).getPropertyValue('background-image'));
    this._nameTitle.textContent = item.name;
    this._infoSubtitle.textContent = item.about;
    this._img.src = item.avatar;
    this._id = item._id;
    this._cohort = item.cohort;
  }

  getUserID () {
    return this._id;
  }
}
