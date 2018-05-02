"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var user = new Schema({
    userName: { type: String, require: true },
    userId: { type: String, require: true }
});
exports.default = user;
//# sourceMappingURL=mongo.js.map