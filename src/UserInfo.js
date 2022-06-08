export class UserInfo {
  constructor (nameElement, infoElement) {
    this._nameElement = nameElement;
    this._infoElement = infoElement;
    this._nameTitle = document.querySelector(`.${nameElement}`);
    this._infoSubtitle = document.querySelector(`.${infoElement}`);
  }

  getUserInfo () {
    return {
      userName: this._nameTitle.textContent,
      userInfo: this._infoSubtitle.textContent
    };
  }

  setUserInfo (item) {
    this._nameTitle.textContent = item.userName;
    this._infoSubtitle.textContent = item.userInfo;
  }
}
