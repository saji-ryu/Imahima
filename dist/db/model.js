"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Model = new Schema({
    UserName: { type: String, require: true },
    UserId: { type: String, require: true },
    UserIcon: { type: String, require: true }
});
exports.default = Model;
;
//# sourceMappingURL=model.js.map