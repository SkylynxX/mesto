export class Section {
  constructor (objArr, conteinerSelector) {
    this._itemRenderer = objArr.method;
    this._conteiner = document.querySelector(`.${conteinerSelector}`);

  }

  addItems (items) {
    items.forEach((item) => {
      const itemRendered = this._itemRenderer(item);
    }, this);
  }

  addItem (itemRendered) {
    this._conteiner.prepend(itemRendered);
  }

}
