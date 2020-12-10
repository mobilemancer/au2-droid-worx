import { ILegend } from "../../../../common/ILegend";

export class ImagePart {
  public source: string;

  public load(params: Record<string, unknown>): void {
    if (!params?.legend["image"]) return;
    const legend = <ILegend>params["legend"];
    this.source = "content/images/legends/" + legend.image;
  }
}
