import { DataService } from "./../../../../services/dataService";
import { IDataService } from "../../../../common/IDataService";
import { ILegend } from "../../../../common/ILegend";

export class ImagePart {
  public source: string;

  constructor(@IDataService private dataService: DataService) {}

  public load(params: Record<string, unknown>): void {
    if (!params) return;
    const legend = <ILegend>params["legend"];
    this.source = "content/images/legends/" + legend.image;
  }
}
