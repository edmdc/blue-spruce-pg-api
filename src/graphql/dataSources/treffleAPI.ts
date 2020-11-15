import { RESTDataSource } from "apollo-datasource-rest";
import { TREFFLE_API_KEY } from "../../env";

export interface PlantInfo {
  id: number;
  common_name?: string;
  scientific_name: string;
  image_url: string;
  family_common_name: string;
  family: string;
}

class TreffleAPI extends RESTDataSource {
  readonly token: string;
  readonly nativePlantFilter: string;

  constructor() {
    super();
    this.baseURL = "https://trefle.io/api/";
    this.token = `token=${TREFFLE_API_KEY}`;
    this.nativePlantFilter = "filter%5Bestablishment%5D=native";
  }

  buildDistributionUrl(page?: number, state = "COL"): string {
    const url = `v1/distributions/${state}/plants?${this.nativePlantFilter}&${this.token}`;
    return page ? `${url}&page=${page}` : url;
  }

  async getPlantList(page?: number, state?: string): Promise<PlantInfo[]> {
    try {
      const { data } = await this.get(this.buildDistributionUrl(page, state));

      return data.map((plant: PlantInfo) => ({
        id: plant.id,
        commonName: plant.common_name,
        scientificName: plant.scientific_name,
        imageUrl: plant.image_url,
        familyCommonName: plant.family_common_name,
        familyScientificName: plant.family,
      }));
    } catch (error) {
      return error.message;
    }
  }
}

export default TreffleAPI;
