interface IPlant {
  id: number;
  commonName?: string;
  scientificName: string;
  imageUrl: string;
  familyCommonName: string;
  familyScientificName: string;
}

type ArgTypes = {
  zone?: string;
  page?: number;
};

export const plantCatalog = async (
  _sources: any,
  { page, zone }: ArgTypes,
  { dataSources }: any
): Promise<IPlant[]> => {
  return dataSources.trefleAPI.getPlantList(page, zone);
};

export const randomPlantCatalog = async (
  _sources: any,
  _args: ArgTypes,
  { dataSources }: any
): Promise<IPlant[]> => {
  return dataSources.trefleAPI.getRandomPlantList();
};

export const plantQuiz = async (
  _sources: any,
  _args: ArgTypes,
  { dataSources }: any
): Promise<IPlant[]> => {
  return dataSources.trefleAPI.createPlantQuiz();
};
