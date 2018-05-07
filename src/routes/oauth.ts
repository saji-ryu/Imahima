import * as express from 'express';

import {UserModel} from "../model";

const router: express.Router = express.Router();
import * as passport from 'passport';

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', passport.authenticate('twitter', {failureRedirect: '/login'}), function (req, res) {
    if (req.user) {
        let id: string = req.user.id;
        UserModel.find({UserId: id}, (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.length == 0) {
                let user = new UserModel({
                    UserName: req.user.username,
                    UserId: id,
                    UserIcon: req.user.photos[0].value,
                    IsHima: false,
                    HimaTime: 0
                });
                user.save(function (err) {
                    console.log('new regi');
                    res.redirect('/newuser');
                    if (err) {
                        console.log(err);
                    }
                });
            } else {
                res.redirect('/');
            }
        });
    }else{
        res.redirect('/');
    }
});

export default router;