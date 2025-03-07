import { IEventAggregator, EventAggregator } from "aurelia";

export class NavMenu {
  public menu: HTMLElement;
  public cartCount = 0;

  private readonly menuCondensedDisplayMode = "--menu--condensed-display-mode";

  constructor(@IEventAggregator private readonly eventAggregator: EventAggregator) {
    eventAggregator.subscribe("add-item", () => {
      this.cartCount++;
    });

    eventAggregator.subscribe("update-cart-count", (count: number) => {
      this.cartCount = count;
    });
  }

  public toggleMenu(): void {
    this.closeShoppingCart();
    const displayMode = getComputedStyle(document.documentElement).getPropertyValue(
      this.menuCondensedDisplayMode
    );
    if (displayMode.trim() === "none") {
      document.documentElement.style.setProperty(this.menuCondensedDisplayMode, "block");
    } else {
      document.documentElement.style.setProperty(this.menuCondensedDisplayMode, "none");
    }
  }

  public menuClicked(): void {
    if (window.innerWidth > 800) {
      this.closeShoppingCart();
      return;
    }

    this.toggleMenu();
  }

  public toggleShoppingCart(): void {
    this.closeCondensedMenu();
    this.eventAggregator.publish("toggle-cart");
  }

  private closeShoppingCart(): void {
    this.eventAggregator.publish("close-cart");
  }

  private closeCondensedMenu() {
    document.documentElement.style.setProperty(this.menuCondensedDisplayMode, "none");
  }
}
