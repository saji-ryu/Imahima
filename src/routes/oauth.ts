import * as express from 'express';

import {UserModel} from "../model";
import * as mongoose from "mongoose";

const router: express.Router = express.Router();
import * as passport from 'passport';

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', passport.authenticate('twitter', {failureRedirect: '/login'}), function (req, res) {
    if (req.session.passport) {
        //console.log('content='+JSON.stringify(req.session.passport));
        let id: string = req.session.passport.user.id;
        let username: string = req.session.passport.user.username;
        let icon: string = req.session.passport.user.photos[0].value;
        console.log(id +','+username+','+icon);
        // UserModel.find({user_id: "abc001"},(err,result)=>{
        //     console.log(result);
        // });
        UserModel.find({UserId: id}, (err, result) => {
            let l: number = result.length;
            if (err) {
                console.log(err);
            }
            if (l == 0) {
                let user = new UserModel({
                    UserName: username,
                    UserId: id,
                    UserIcon: icon
                });
                user.save(function (err) {
                    console.log('new regi');
                    res.redirect('/');
                    if (err) {
                        console.log(err);
                    }
                });
                //regist(name, id, icon).then(()=>{res.redirect('/')});
            } else {
                res.redirect('/aaa');
            }
        });
    }
    //res.redirect('/'); //indexへリダイレクトさせる
});

export default router;