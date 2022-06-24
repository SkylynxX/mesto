export class UserInfo {
  constructor (selectorUserName, selectorUserAbout, selectorUserAvatar) {
    this._nameElement = selectorUserName;
    this._infoElement = selectorUserAbout;
    this._imgElement = selectorUserAvatar;
    this._nameTitle = document.querySelector(`${selectorUserName}`);
    this._infoSubtitle = document.querySelector(`${selectorUserAbout}`);
    this._img = document.querySelector(`${selectorUserAvatar}`);
    this._id = null;
  }

  getUserInfo () {
    return {
      name: this._nameTitle.textContent,
      about: this._infoSubtitle.textContent,
      avatar: this._img.src,
    };
  }


  setUserInfo (item) {
    // console.log(window.getComputedStyle(this._img, null).getPropertyValue('background-image'));
    this._nameTitle.textContent = item.name;
    this._infoSubtitle.textContent = item.about;
    this._img.src = item.avatar;
    this._id = item._id;
  }

  getUserID () {
    return this._id;
  }
}
