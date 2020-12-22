import { bindable } from "aurelia";

import { IDroid } from "./../../common/IDroid";
import { DataService, IDataService } from "../../services/dataService";

export class ProductsPage {
  @bindable public filteredProducts: IDroid[] = [];
  public productRecommendations;

  constructor(@IDataService dataService: DataService) {
    this.productRecommendations = dataService.productRecommendations;
  }
}
