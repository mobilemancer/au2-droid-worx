import { DataService } from "../../services/dataService";
import { IDataService } from "../../common/IDataService";
import { ILegend } from "../../common/ILegend";

export class LegendsPage {
  public legends: ILegend[];

  constructor(@IDataService private dataService: DataService) {
    this.legends = this.dataService.legends;
  }
}
