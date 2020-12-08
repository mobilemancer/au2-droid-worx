export class HomePage {
  public imgSource = "";

  private bb8Media = "./../../../content/images/legends/BB-8.png";
  private bb9eMedia = "./../../../content/images/legends/BB-9E.png";

  constructor() {
    this.imgSource = this.getImageSource();
  }

  private getImageSource(): string {
    return new Date().getTime() % 2 === 0 ? this.bb8Media : this.bb9eMedia;
  }
}
