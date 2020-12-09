import { DataService } from "../../../../services/dataService";
import { IDataService } from "../../../../common/IDataService";
import { ILegend } from "./../../../../common/ILegend";

export class StatsPart {
  public legend: ILegend;

  public get calculatedMass(): string {
    return this.legend.mass !== 0 ? this.legend.mass + " kg" : "Unknown";
  }

  public get calculatedHeight(): string {
    return this.legend.height !== 0 ? this.legend.height + " m" : "Unknown";
  }

  constructor(@IDataService private dataService: DataService) {}

  public load(params: Record<string, unknown>): void {
    if (!params) return;
    this.legend = <ILegend>params["legend"];
  }
}
