export class MassFormaterValueConverter {
  public toView(value: number, useSpace?: boolean | undefined): string {
    return !value || value === 0 ? "unknown" : value + (!useSpace ? "" : " ") + "kg";
  }
}
