import * as express from 'express';

import {UserModel} from "../model";

const router: express.Router = express.Router();
import * as passport from 'passport';

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', passport.authenticate('twitter', {failureRedirect: '/login'}), function (req, res) {
    if (req.session.passport) {
        let id: string = req.session.passport.user.id;
        //let username: string = req.session.passport.user.displayName;
        //let icon: string = req.session.passport.user.photos[0].value;
        UserModel.find({UserId: id}, (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.length == 0) {
                let user = new UserModel({
                    UserName: req.session.passport.user.displayName,
                    UserId: id,
                    UserIcon: req.session.passport.user.photos[0].value,
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
    }
});

export default router;