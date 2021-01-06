import { IEventAggregator, EventAggregator } from "aurelia";

export class NavMenu {
  public menu: HTMLElement;

  private menuDisplayModeVariable = "--menu-display-mode";

  constructor(@IEventAggregator private eventAggregator: EventAggregator) {}

  public toggleShoppingCart(): void {
    this.eventAggregator.publish("toggle-cart");
  }

  public toggleMenu(): void {
    const displayMode = getComputedStyle(document.documentElement).getPropertyValue(
      this.menuDisplayModeVariable
    );
    if (displayMode.trim() === "none") {
      document.documentElement.style.setProperty(this.menuDisplayModeVariable, "block");
    } else {
      document.documentElement.style.setProperty(this.menuDisplayModeVariable, "none");
    }
  }

  public menuClicked(): void {
    if (window.innerWidth > 800) return;
    this.toggleMenu();
  }
}
