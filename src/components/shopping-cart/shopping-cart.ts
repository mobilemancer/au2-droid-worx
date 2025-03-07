import { IEventAggregator, EventAggregator, IDisposable } from "aurelia";

export class ShoppingCart {
  public cart: {
    productName: string;
    qty: number;
    imgSource: string;
    price: number;
  }[] = [];
  public totalPrice = 0;

  private eventListeners: IDisposable[] = [];

  constructor(@IEventAggregator private readonly eventAggregator: EventAggregator) {
    this.eventListeners.push(
      eventAggregator.subscribe("add-item", (product: Record<string, unknown>) => {
        const prod = this.cart.filter((p) => p.productName === product.model);
        if (prod.length === 0) {
          this.cart.push({
            productName: product.model as string,
            qty: 1,
            imgSource: this.getImageLink(product.model as string),
            price: product.price as number,
          });
        } else {
          prod[0].qty += 1;
        }

        this.calculateTotalPrice();
      })
    );
  }

  public afterUnbind(): void {
    this.eventListeners.forEach((el) => el.dispose());
  }

  public calculateTotalPrice(): void {
    let total = 0;
    let count = 0;
    this.cart.forEach((p) => {
      total = total + p.qty * p.price;
      count += p.qty;
    });
    this.totalPrice = total;
    this.eventAggregator.publish("update-cart-count", count);
  }

  public filterProduct(model: string): void {
    this.eventAggregator.publish("filter", model);
  }

  public isNumberKey(evt: KeyboardEvent): boolean {
    if (evt.key === "," || evt.key === ".") return false; // dissalow comma separators
    if (evt.key === "-" || evt.key === "+") return false; // dissalow pos and neg signs
    if (evt.key === "e") return false;  // disallow exponentials
    return true;
  }

  private getImageLink(product: string): string {
    if (!product || product === "") return "";
    const fileName = product.replace(/\s/g, "_") + ".png";
    return "./../../../../../content/images/products/" + fileName;
  }

}
