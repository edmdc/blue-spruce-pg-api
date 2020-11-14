import { RESTDataSource } from "apollo-datasource-rest";
import { TREFFLE_API_KEY } from "../env";

interface Plant {
  id: number;
  common_name: string;
  scientific_name: string;
  image_url: string;
}

class TreffleAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://trefle.io/api/";
  }

  buildNativePlantQuery(state: string): string {
    return `v1/distributions/${state}/plants?filter%5Bestablishment%5D=native&token=${TREFFLE_API_KEY}`;
  }

  async getPlantList(): Promise<Plant[]> {
    const { data } = await this.get(this.buildNativePlantQuery("COL"));

    return data.map((plant: Plant) => ({
      id: plant.id,
      commonName: plant.common_name,
      scientificName: plant.scientific_name,
      imageUrl: plant.image_url,
    }));
  }
}

export default TreffleAPI;
