import { bindable, IEventAggregator, EventAggregator } from "aurelia";

import { IProductRecommendation } from "../../common/IProductRecommendation";

export class ProductRecommendation {
  @bindable public recommendation: IProductRecommendation;
  public imgSource: string;

  constructor(@IEventAggregator private eventAggregator: EventAggregator) {}

  public attached(): void {
    if (!this.recommendation.productName || this.recommendation.productName === "") return;
    const fileName = this.recommendation.productName.replace(/\s/g, "_") + ".png";
    this.imgSource = "content/images/products/" + fileName;
  }

  public filterProduct(model: string): void {
    this.eventAggregator.publish("filter", model);
  }
}
