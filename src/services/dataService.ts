import { DI, HttpClient, HttpClientConfiguration, IHttpClient } from "aurelia";

import { IProductRecommendation } from "./../common/IProductRecommendation";
import { IFilterProperties } from "./../common/IFilterProperties";
import { IDroid } from "./../common/IDroid";
import { ILegend } from "../common/ILegend";

const apiBaseUrl = "http://localhost:5000";
// const apiBaseUrl = "http://localhost:7071";

export class DataService {
  public legends: ILegend[] = [];
  public products: IDroid[] = [];
  public productRecommendations = [];

  constructor(@IHttpClient private readonly httpClient: HttpClient) {
    const config = new HttpClientConfiguration();
    const headers: HeadersInit = { Accept: "application/json", "X-Requested-With": "Fetch" };
    config.withDefaults({
      credentials: "same-origin",
      headers: headers,
    });
    config.withBaseUrl(this.getBaseUrl());
    this.httpClient.configure(() => config);

    this.init();
  }

  private async init() {
    const products = ((await this.requestData("Products")) as unknown) as IDroid[];
    this.products.push(...products);

    const legends = ((await this.requestData("Legends")) as unknown) as ILegend[];
    this.legends.push(...legends);

    const recommendations = await this.requestData("ProductRecommendations");
    this.productRecommendations.push(...recommendations);
  }

  public getLegend(name: string): ILegend {
    if (!name || name === "") {
      throw new Error("Invalid argument!");
    }

    return this.legends.filter((l) => {
      return l.name === name;
    })[0];
  }

  public filterProducts(fragment: string, filterProps: IFilterProperties): IDroid[] {
    const res = this.filterByText(fragment)?.filter((d) => {
      return (
        (filterProps.arakyd && d.manufacturer.includes("Arakyd")) ||
        (filterProps.automaton && d.manufacturer.includes("Automaton")) ||
        (filterProps.cybot && d.manufacturer.includes("Cybot"))
      );
    });
    return res;
  }

  public get recommendations(): IProductRecommendation[] {
    if (this.productRecommendations?.length < 1) return;

    const results = [];
    do {
      const item = this.productRecommendations[
        Math.floor(Math.random() * this.productRecommendations.length)
      ];
      if (results.indexOf(item) < 0) results.push(item);
    } while (results.length < this.productRecommendations.length);
    return results;
  }

  private filterByText(fragment: string): IDroid[] {
    if (!fragment || fragment === "") {
      return this.products;
    } else {
      fragment = fragment.toLowerCase();
      return this.products.filter((d) => {
        return d.droidClass.toLowerCase().includes(fragment) || d.model.toLowerCase().includes(fragment);
      });
    }
  }

  private async requestData(route: string): Promise<Record<string, unknown>[]> {
    const response = await this.httpClient.fetch(route);
    const values = await response.json();
    if (values?.value) {
      return values.value;
    }
    return values;
  }

  private getBaseUrl() {
    if (window.location.hostname.includes("localhost")) {
      return apiBaseUrl + "/api/";
    } else return window.origin + "/api/";
  }
}

export const IDataService = DI.createInterface<DataService>();
