import mongoose from "mongoose";

const applyUserMiddleware = (md: mongoose.Document): void => {
  md.on("save", (data: any) =>
    console.log("User Created with the following data", data)
  );
};

export default applyUserMiddleware;
