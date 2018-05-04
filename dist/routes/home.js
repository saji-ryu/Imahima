"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var model_1 = require("../model");
router.get('/', function (req, res) {
    res.render('home', {
        title: 'login demo',
        session: req.session.passport
    });
});
router.post('/', function (req, res) {
    model_1.UserModel.findOneAndUpdate({ UserId: req.session.passport.user.id }, (req.body), function (err, result) {
        console.log(result);
        console.log(req.body);
        res.send('test');
    });
});
router.get('/confirm', function (req, res) {
    if (req.session) {
        model_1.UserModel.find({ UserId: req.session.passport.user.id }, function (err, result) {
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