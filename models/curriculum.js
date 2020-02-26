const mongoose = require("mongoose");

const CurriculumSchema = mongoose.Schema({
    name: String,
    tell: String,
    email: String,
    photo: Buffer,
    habilities: String,
    agreement: Boolean
});

module.exports = mongoose.model("Curriculum", CurriculumSchema);
