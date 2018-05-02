import * as express from 'express';

import {UserModel} from "../model";

const router: express.Router = express.Router();
import * as passport from 'passport';

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', passport.authenticate('twitter', {failureRedirect: '/login'}), function (req, res) {
    if (req.session.passport) {
        let id: string = req.session.passport.user.id;
        let username: string = req.session.passport.user.displayName;
        let icon: string = req.session.passport.user.photos[0].value;
        //console.log(id + ',' + username + ',' + icon);
        UserModel.find({UserId: id}, (err, result) => {
            let l: number = result.length;
            if (err) {
                console.log(err);
            }
            if (l == 0) {
                let user = new UserModel({
                    UserName: username,
                    UserId: id,
                    UserIcon: icon,
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