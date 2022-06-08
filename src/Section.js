export class Section {
  constructor (objArr, conteinerSelector) {
    this._items = objArr.cards;
    this._itemRenderer = objArr.method;
    this._conteiner = document.querySelector(`.${conteinerSelector}`);
    this._items.forEach((item) => {
      this.addItem(item);
    }, this);
  }


  addItem (item) {
  //   console.log("this: " + this);
  //   console.log(this);
  //   console.log("item: " + item);
  //   console.log(item);
    const itemRendered = this._itemRenderer(item);
    // console.log("rend: " + itemRendered)
    // console.log(itemRendered)
    this._conteiner.prepend(itemRendered);
  }

}
