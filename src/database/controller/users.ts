import { Schema } from "mongoose";

const applyUserMiddleware = (schema: Schema): void => {
  schema.on("save", (data: any) =>
    console.log("User Created with the following data", data)
  );
};

export default applyUserMiddleware;
