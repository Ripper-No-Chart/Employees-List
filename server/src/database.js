import mongoose from "mongoose";
const URI = "mongodb://localhost/employees";

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((db) => console.log("DB connected"))
  .catch((err) => console.error(err));

export default mongoose;