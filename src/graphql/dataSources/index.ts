import { RESTDataSource } from "apollo-datasource-rest";
import TreffleAPI from "./treffleAPI";

const dataSources = (): { treffleAPI: RESTDataSource } => {
  return {
    treffleAPI: new TreffleAPI(),
  };
};

export default dataSources;
