import app from "./server.js";
import mongoose from "mongoose";
const PORT = 9000

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port ${PORT}`));
  })
  .catch((err) => console.log(`error : ${err}`));

