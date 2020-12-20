import { HttpClient, HttpClientConfiguration, IHttpClient } from "aurelia";

import { IProductRecommendation } from "./../common/IProductRecommendation";
import { IFilterProperties } from "./../common/IFilterProperties";
import { IDroid } from "./../common/IDroid";
import { ILegend } from "../common/ILegend";

import legends from "../../data/legends.json";
import products from "../../data/products.json";
import productRecommendations from "../../data/product-recommendations.json";

export class DataService {
  public legends: ILegend[] = [];
  public products: IDroid[] = [];
  private productRecommendations = [];

  constructor(@IHttpClient private readonly httpClient: HttpClient) {
    this.legends = legends;
    this.products = products;
    this.productRecommendations = productRecommendations;
    this.init();
  }

  private async init() {
    await this.requestData("product");
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
    let res = this.filterByText(fragment).filter((d) => {
      return (
        (filterProps.arakyd && d.manufacturer.includes("Arakyd")) ||
        (filterProps.automaton && d.manufacturer.includes("Automaton")) ||
        (filterProps.cybot && d.manufacturer.includes("Cybot"))
      );
    });
    return res;
  }

  public getRecommendations(amount: number): IProductRecommendation[] {
    const results = [];
    do {
      const item = this.productRecommendations[
        Math.floor(Math.random() * this.productRecommendations.length)
      ];
      if (results.indexOf(item) < 0) results.push(item);
    } while (results.length < amount);
    return results;
  }

  private filterByText(fragment: string): IDroid[] {
    if (!fragment || fragment === "") {
      return this.products;
    } else {
      fragment = fragment.toLowerCase();
      return this.products.filter((d) => {
        return d.class.toLowerCase().includes(fragment) || d.model.toLowerCase().includes(fragment);
      });
    }
  }

  private async requestData(route: string): Promise<Record<string, unknown>> {
    const config = new HttpClientConfiguration();
    config.withBaseUrl("http://localhost:7071/api/");
    const headers: HeadersInit = { Accept: "application/json", "X-Requested-With": "Fetch" };
    config.withDefaults({
      credentials: "same-origin",
      headers: headers,
    });
    this.httpClient.configure(() => config);

    const response = await this.httpClient.fetch(route);
    return await response.json();
  }
}
