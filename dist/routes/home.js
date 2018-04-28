"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
router.get('/', function (req, res) {
    res.render('home', {
        title: 'login demo',
        usr: req.user
    });
});
exports.default = router;
//# sourceMappingURL=home.js.map