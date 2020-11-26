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

interface IAnswerChoice {
  answerID: number;
  choices: IPlant[];
}

export type TQuizKey = IAnswerChoice[];

class TrefleAPI extends RESTDataSource {
  readonly nativePlantFilter: string;

  constructor() {
    super();
    this.baseURL = "https://trefle.io/api/";
    this.nativePlantFilter = "filter%5Bestablishment%5D=native";
  }

  private buildDistributionUrl(page?: number, state = "COL"): string {
    const url = `v1/distributions/${state}/plants?${this.nativePlantFilter}&token=${TREFFLE_API_KEY}`;
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

  private randomAnswerCreator(plantCatalog: IPlant[]) {
    let choices: IPlant[] = [];
    let i = 0;
    while (i < 4) {
      const newAnswer =
        plantCatalog[Math.floor(Math.random() * plantCatalog.length)];
      if (!choices.includes(newAnswer)) {
        choices = [...choices, newAnswer];
        i++;
      }
    }

    const answerID = choices[Math.floor(Math.random() * 4)].id;

    return { answerID, choices };
  }

  async getUserToken(): Promise<{ token: string; expiration: string }> {
    try {
      const reqBody = {
        origin: "http://localhost:8080",
        token: TREFFLE_API_KEY,
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

  async createPlantQuiz(): Promise<TQuizKey> {
    try {
      const plantList = await this.getRandomPlantList();
      const tracker = {};
      const quizKey = [];
      let i = 0;
      while (i < 10) {
        const roundAnswers = this.randomAnswerCreator(plantList);
        if (!tracker[roundAnswers.answerID.toString()]) {
          quizKey.push(roundAnswers);
          tracker[roundAnswers.answerID.toString()] = true;
          i++;
        }
      }
      return quizKey;
    } catch (err) {
      return err.message;
    }
  }
}

export default TrefleAPI;
