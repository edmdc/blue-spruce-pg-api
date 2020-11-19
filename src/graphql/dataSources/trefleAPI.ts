import { RESTDataSource } from "apollo-datasource-rest";
import { TREFFLE_API_KEY } from "../../env";

export interface TrefleTypes {
  id: number;
  common_name?: string;
  scientific_name?: string;
  image_url?: string;
  family_common_name?: string;
  family: string;
}

export interface IPlant {
  id: number;
  commonName?: string;
  scientificName: string;
  imageUrl: string;
  familyCommonName: string;
  familyScientificName: string;
}

class TrefleAPI extends RESTDataSource {
  private readonly token: string;
  readonly nativePlantFilter: string;

  constructor() {
    super();
    this.baseURL = "https://trefle.io/api/";
    this.token = `token=${TREFFLE_API_KEY}`;
    this.nativePlantFilter = "filter%5Bestablishment%5D=native";
  }

  private buildDistributionUrl(page?: number, state = "COL"): string {
    const url = `v1/distributions/${state}/plants?${this.nativePlantFilter}&${this.token}`;
    return page ? `${url}&page=${page}` : url;
  }

  private formatData(plantData: TrefleTypes[]) {
    return plantData.map((plant: TrefleTypes) => ({
      id: plant.id,
      commonName: plant.common_name,
      scientificName: plant.scientific_name,
      imageUrl: plant.image_url,
      familyCommonName: plant.family_common_name,
      familyScientificName: plant.family,
    }));
  }

  async getUserToken(): Promise<{ token: string; expiration: string }> {
    try {
      const prefixRegex = /token\=/;
      const unprefixedToken = this.token.replace(prefixRegex, "");
      const reqBody = {
        origin: "http://localhost:8080",
        token: unprefixedToken,
      };
      const token = await this.post("auth/claim", reqBody);
      return token;
    } catch (err) {
      console.error(err, "in trefleAPI");
    }
  }

  async getPlantList(page?: number, state?: string): Promise<IPlant[]> {
    try {
      const { data } = await this.get(this.buildDistributionUrl(page, state));
      return this.formatData(data);
    } catch (error) {
      return error.message;
    }
  }

  async getRandomPlantList(): Promise<IPlant[]> {
    const randomNumber = Math.floor(Math.random() * 110);
    try {
      const { data } = await this.get(this.buildDistributionUrl(randomNumber));
      return this.formatData(data);
    } catch (err) {
      return err.message;
    }
  }
}

export default TrefleAPI;
