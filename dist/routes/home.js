"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
router.get('/', function (req, res) {
    res.render('home', {
        title: 'login demo',
        session: req.session.passport
    });
});
exports.default = router;
//# sourceMappingURL=home.js.map