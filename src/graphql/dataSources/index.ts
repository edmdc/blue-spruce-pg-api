import { RESTDataSource } from "apollo-datasource-rest";
import TrefleAPI from "./trefleAPI";

const dataSources = (): { trefleAPI: RESTDataSource } => {
  return {
    trefleAPI: new TrefleAPI(),
  };
};

export default dataSources;
