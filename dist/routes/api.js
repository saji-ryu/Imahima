"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var model_1 = require("../model");
var router = express.Router();
router.get('/', function (req, res) {
    if (req.user) {
        model_1.UserModel.find((req.query), function (err, result) {
            if (err) {
                console.log(err);
            }
            console.log(result[0]);
            res.send(result[0]);
        });
    }
    else {
        res.send(null);
    }
});
router.get('/me', function (req, res) {
    if (req.user) {
        model_1.UserModel.find({ UserId: req.user.id }, function (err, result) {
            if (err) {
                console.log(err);
            }
            console.log(result[0]);
            res.send(result[0]);
        });
    }
    else {
        res.send(null);
    }
});
router.post('/', function (req, res) {
    model_1.UserModel.findOneAndUpdate({ UserId: req.user.id }, (req.body), function (err, result) {
        console.log(result);
        console.log(req.body);
        res.send('ok');
    });
});
exports.default = router;
//# sourceMappingURL=api.js.map