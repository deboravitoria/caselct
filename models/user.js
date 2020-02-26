var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = mongoose.Schema({
    username: {
        type: String,
        minlength: [4, "Conta deve conter no mínimo 4 caracteres."],
        maxlength: [20, "Conta deve conter no máximo 20 caracteres."]
    },
    password: String,
    name: {
        type: String,
        minlength: [2, "Nome deve conter no mínimo 2 caracteres."],
        maxlength: [20, "Nome deve conter no máximo 20 caracteres."],
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
