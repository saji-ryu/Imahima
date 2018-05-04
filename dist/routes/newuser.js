"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
router.get('/', function (req, res) {
    res.render('newuser', {
        title: 'thank you'
    });
});
exports.default = router;
//# sourceMappingURL=newuser.js.map