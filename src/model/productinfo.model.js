export class ProductInfoModel{
  constructor( name, price ,description, maxOrder, quantity, categoryId, isShow, isSale  ) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.isSale = isSale;
    this.categoryId = categoryId;
    this.maxOrder = maxOrder;
    this.quantity = quantity;
    this.isShow = isShow;
  }
}

