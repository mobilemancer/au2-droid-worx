import { IEventAggregator, EventAggregator } from "aurelia";

export class NavMenu {
  public menu: HTMLElement;

  constructor(@IEventAggregator private eventAggregator: EventAggregator) {}

  public toggleShoppingCart(): void {
    this.eventAggregator.publish("toggle-cart");
  }

  public toggleMenu(): void {
    if (this.menu.style.display === "none" || this.menu.style.display === "") {
      this.menu.style.display = "block";
    } else {
      this.menu.style.display = "none";
    }
  }
}
