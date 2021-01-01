import { bindable, IEventAggregator, EventAggregator, IDisposable, watch } from "aurelia";

import { DataService, IDataService } from "./../../services/dataService";
import { IDroid } from "./../../common/IDroid";

export class ProductFilter {
  @bindable public filteredProducts: IDroid[];

  public searchText: string;
  public arakyd = true;
  public cybot = true;
  public automaton = true;

  private eventListeners: IDisposable[] = [];

  constructor(
    @IDataService private readonly dataService: DataService,
    @IEventAggregator eventAggregator: EventAggregator
  ) {
    this.triggerFilter();

    this.eventListeners.push(
      // this event is triggered by other components, like for ex the Product-Recommendation
      eventAggregator.subscribe("filter", (model: string) => {
        this.searchText = model;
      })
    );
  }

  public afterUnbind(): void {
    this.eventListeners.forEach((el) => el.dispose());
  }

  @watch((o: ProductFilter) => o.dataService.products?.length)
  @watch((o: ProductFilter) => o.searchText?.length)
  @watch((o: ProductFilter) => o.arakyd)
  @watch((o: ProductFilter) => o.cybot)
  @watch((o: ProductFilter) => o.automaton)
  private triggerFilter() {
    this.filteredProducts = this.dataService.filterProducts(this.searchText, {
      arakyd: this.arakyd,
      automaton: this.automaton,
      cybot: this.cybot,
    });
  }
}
