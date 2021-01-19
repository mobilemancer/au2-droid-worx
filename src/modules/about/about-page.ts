export class AboutPage {
  public template: HTMLElement;

  private attached(): void {
    if (!this?.template) return;
    this.template.classList.add("anim-enter-left");
  }
}
