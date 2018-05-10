"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var model_1 = require("../model");
var router = express.Router();
var passport = require("passport");
router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), function (req, res) {
    if (!req.user) {
        res.redirect('/');
    }
    else {
        var id_1 = req.user.id;
        model_1.UserModel.find({ UserId: id_1 }, function (err, result) {
            if (err) {
                console.log(err);
            }
            if (result.length == 0) {
                var user = new model_1.UserModel({
                    UserName: req.user.username,
                    UserId: id_1,
                    UserIcon: req.user.photos[0].value,
                    IsHima: false,
                    HimaTime: Date.now()
                });
                user.save(function (err) {
                    console.log('new regi');
                    res.redirect('/newuser');
                    if (err) {
                        console.log(err);
                    }
                });
            }
            else {
                res.redirect('/');
            }
        });
    }
});
exports.default = router;
//# sourceMappingURL=oauth.js.map