export class LengthFormaterValueConverter {
  public toView(value: number, useSpace?: boolean | undefined): string {
    return value === 0 ? "unknown" : value + (!useSpace ? "" : " ") + "m";
  }
}
