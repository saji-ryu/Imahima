"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var model_1 = require("../model");
router.get('/', function (req, res) {
    //console.log(req.user);
    res.render('home', {
        title: 'login demo',
        session: req.user
    });
});
router.post('/', function (req, res) {
    model_1.UserModel.findOneAndUpdate({ UserId: req.user.id }, (req.body), function (err, result) {
        console.log(result);
        console.log(req.body);
        res.send('test');
    });
});
router.post('/time', function (req, res) {
    model_1.UserModel.findOneAndUpdate({ UserId: req.user.id }, (req.body), function (err, result) {
        console.log(result);
        console.log(req.body);
        res.send('test');
    });
});
router.get('/confirm', function (req, res) {
    if (req.user) {
        model_1.UserModel.find({ UserId: req.user.id }, function (err, result) {
            if (err) {
                console.log(err);
            }
            console.log(result[0]);
            res.send(result[0].IsHima);
        });
    }
    else {
        res.send(false);
    }
});
exports.default = router;
//# sourceMappingURL=home.js.map