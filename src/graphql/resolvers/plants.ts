import { PlantInfo } from "../dataSources/treffleAPI";

type ArgTypes = {
  zone?: string;
  page?: number;
};

export const plantCatalog = async (
  _sources: any,
  { page, zone }: ArgTypes,
  { dataSources }: any
): Promise<PlantInfo[]> => {
  return dataSources.treffleAPI.getPlantList(page, zone);
};
