import { bindable, IEventAggregator, EventAggregator } from "aurelia";

import { IProductRecommendation } from "../../common/IProductRecommendation";

export class ProductRecommendation {
  @bindable public item: IProductRecommendation;
  public imgSource: string;

  constructor(@IEventAggregator private eventAggregator: EventAggregator) {}

  public attached(): void {
    if (!this.item.productName || this.item.productName === "") return;
    const fileName = this.item.productName.replace(/\s/g, "_") + ".png";
    this.imgSource = "content/images/products/" + fileName;
  }

  public filterProduct(model: string): void {
    this.eventAggregator.publish("filter", model);
  }
}
