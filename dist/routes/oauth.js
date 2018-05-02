"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var model_1 = require("../model");
var router = express.Router();
var passport = require("passport");
router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), function (req, res) {
    if (req.session.passport) {
        //console.log('content='+JSON.stringify(req.session.passport));
        var id_1 = req.session.passport.user.id;
        var username_1 = req.session.passport.user.username;
        var icon_1 = req.session.passport.user.photos[0].value;
        console.log(id_1 + ',' + username_1 + ',' + icon_1);
        // UserModel.find({user_id: "abc001"},(err,result)=>{
        //     console.log(result);
        // });
        model_1.UserModel.find({ UserId: id_1 }, function (err, result) {
            var l = result.length;
            if (err) {
                console.log(err);
            }
            if (l == 0) {
                var user = new model_1.UserModel({
                    UserName: username_1,
                    UserId: id_1,
                    UserIcon: icon_1
                });
                user.save(function (err) {
                    console.log('new regi');
                    res.redirect('/');
                    if (err) {
                        console.log(err);
                    }
                });
                //regist(name, id, icon).then(()=>{res.redirect('/')});
            }
            else {
                res.redirect('/aaa');
            }
        });
    }
    //res.redirect('/'); //indexへリダイレクトさせる
});
exports.default = router;
//# sourceMappingURL=oauth.js.map