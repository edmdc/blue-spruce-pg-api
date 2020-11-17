import { IPlant } from "../dataSources/trefleAPI";

type ArgTypes = {
  zone?: string;
  page?: number;
};

export const plantCatalog = async (
  _sources: any,
  { page, zone }: ArgTypes,
  { dataSources, dbClient }: any
): Promise<IPlant[]> => {
  return dataSources.trefleAPI.getPlantList(page, zone);
};

export const randomPlantCatalog = async (
  _sources: any,
  { page, zone }: ArgTypes,
  { dataSources, dbClient }: any
): Promise<IPlant[]> => {
  return dataSources.trefleAPI.getRandomPlantList(page, zone);
};
