"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var model_1 = require("../model");
router.get('/', function (req, res) {
    var serch = function () {
        console.log(req.query);
        return new Promise(function (resolve, reject) {
            model_1.UserModel.find((req.query), function (err, result) {
                if (err) {
                    console.log(err);
                    reject();
                }
                else if (result.length != 0) {
                    var userdata = {
                        matched: true,
                        uname: result[0].UserName,
                        ishima: result[0].IsHima,
                        time: result[0].HimaTime
                    };
                    console.log(JSON.stringify(result));
                    console.log(JSON.stringify(userdata));
                    resolve(userdata);
                }
                else {
                    var userdata = {
                        matched: false,
                        uname: "",
                        ishima: false,
                        time: 0
                    };
                    resolve(userdata);
                }
            });
        });
    };
    var response = function (udata) {
        res.render('watch', {
            udata: udata
        });
    };
    serch().then(response).catch(function (e) {
        console.log(e);
        res.redirect('/');
    });
});
exports.default = router;
//# sourceMappingURL=watch.js.map