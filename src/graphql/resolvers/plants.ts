import { PlantInfo } from "../dataSources/treffleAPI";

type ArgTypes = {
  zone?: string;
  page?: number;
};

export const plantCatalog = async (
  _sources: any,
  { page, zone }: ArgTypes,
  { dataSources, dbClient }: any
): Promise<PlantInfo[]> => {
  console.log(dbClient.models);
  return dataSources.treffleAPI.getPlantList(page, zone);
};
