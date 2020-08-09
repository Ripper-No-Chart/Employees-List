import mongoose from "mongoose"
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, required: true },
});

module.exports = mongoose.model("Employee", EmployeeSchema);