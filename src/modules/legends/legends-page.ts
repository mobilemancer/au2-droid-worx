import { DataService, IDataService } from "../../services/dataService";
import { ILegend } from "../../common/ILegend";

export class LegendsPage {
  public template;
  public legends: ILegend[];

  constructor(@IDataService private dataService: DataService) {
    this.legends = this.dataService.legends;
  }

  private attached(): void {
    if (!this?.template) return;
    this.template.classList.add("anim-enter-right");
  }
}
