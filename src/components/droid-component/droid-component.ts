import { bindable, IEventAggregator, EventAggregator } from "aurelia";

import { IDroid } from "../../common/IDroid";

export class DroidComponent {
  @bindable public droid: IDroid;
  public imgSource: string;

  constructor(@IEventAggregator private eventAggregator: EventAggregator) {}

  public attached() {
    this.imgSource = this.productImage(this.droid.model);
  }

  public addToCart() {
    this.eventAggregator.publish("add-item", this.droid);
  }

  private productImage(model: string) {
    if (!model || model === "") return "";
    const fileName = model.replace(/\s/g, "_") + ".png";
    const url = "content/images/products/" + fileName;
    console.log(url);
    return url;
  }
}
