import { bindable } from "aurelia";

import { IDroid } from "./../../common/IDroid";
import { DataService, IDataService } from "../../services/dataService";

export class ProductsPage {
  @bindable public filteredProducts: IDroid[] = [];
  public productRecommendations;
  public template: HTMLElement;

  constructor(@IDataService dataService: DataService) {
    this.productRecommendations = dataService.productRecommendations;
  }

  private attached(): void {
    if (!this?.template) return;
    this.template.classList.add("anim-enter-left");
  }
}
