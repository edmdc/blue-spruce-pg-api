import { PlantInfo } from "../dataSources/treffleAPI";
import { PlantModel } from "../../database/models";

type ArgTypes = {
  zone?: string;
  page?: number;
};

export const plantCatalog = async (
  _sources: any,
  { page, zone }: ArgTypes,
  { dataSources, dbClient }: any
): Promise<PlantInfo[]> => {
  console.log(PlantModel);
  return dataSources.treffleAPI.getPlantList(page, zone);
};
