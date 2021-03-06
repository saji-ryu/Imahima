import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
    UserName: {type: String, require: true},
    UserId: {type: String, require: true},
    UserIcon: {type: String, require: true},
    IsHima: {type: Boolean, require: true},
    HimaTime: {type: Number, request: true}
});
let UserModel = mongoose.model('user', User);

export {UserModel};