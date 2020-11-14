export const plantCatalog = async (
  _sources: any,
  _args: any,
  { dataSources }: any
) => {
  return dataSources.treffleAPI.getPlantList();
};
