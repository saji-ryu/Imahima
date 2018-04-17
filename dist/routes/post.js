"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
router.get('/', function (req, res) {
    res.render('post');
});
exports.default = router;
//# sourceMappingURL=post.js.map