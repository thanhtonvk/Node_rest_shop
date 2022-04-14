const mongoose = require("mongoose");
const studentSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: { type: String, require: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    dateofbirth: { type: String, required: true },
})
module.exports = mongoose.model("Student", studentSchema);