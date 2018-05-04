"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = new Schema({
    UserName: { type: String, require: true },
    UserId: { type: String, require: true },
    UserIcon: { type: String, require: true }
});
exports.default = User;
//# sourceMappingURL=user.js.map