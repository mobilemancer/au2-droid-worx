import { DataService, IDataService } from "../../services/dataService";
import { ILegend } from "../../common/ILegend";

export class LegendsPage {
  public legends: ILegend[];

  constructor(@IDataService private dataService: DataService) {
    this.legends = this.dataService.legends;
  }
}
