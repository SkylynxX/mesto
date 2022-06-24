export class Section {
  constructor (objArr, conteinerSelector) {
    this._itemRenderer = objArr.method;
    this._conteiner = document.querySelector(`.${conteinerSelector}`);

  }

  addItems (items) {
    items.forEach((item) => {
      this.addItem(item);
    }, this);
  }

  addItem (item) {
    const itemRendered = this._itemRenderer(item);
    this._conteiner.prepend(itemRendered);
  }

}
