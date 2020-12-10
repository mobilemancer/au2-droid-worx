import { DataService } from "../../../../services/dataService";
import { IDataService } from "../../../../common/IDataService";
import { ILegend } from "./../../../../common/ILegend";

export class StatsPart {
  public legend: ILegend;

  public get calculatedMass(): string {
    return !!this.legend && this.legend?.mass !== 0 ? this.legend.mass + " kg" : "Unknown";
  }

  public get calculatedHeight(): string {
    return !!this.legend && this.legend?.height !== 0 ? this.legend.height + " m" : "Unknown";
  }

  constructor(@IDataService private dataService: DataService) {}

  // public canLoad(params: { legend: ILegend }): boolean {
  //   return typeof params.legend === "object";
  // }

  public load(params: Record<string, unknown>): void {
    if (typeof params.legend !== "object") return;
    this.legend = <ILegend>params["legend"];
  }
}
