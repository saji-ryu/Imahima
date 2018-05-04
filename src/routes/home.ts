import * as express from 'express';

const router: express.Router = express.Router();

import {UserModel} from "../model";

router.get('/', (req, res) => {
    res.render('home', {
        title: 'login demo',
        session: req.session.passport
    });
});

router.post('/', (req, res) => {
    UserModel.findOneAndUpdate(
        {UserId: req.session.passport.user.id},
        (req.body),
        (err, result) => {
            console.log(result);
            console.log(req.body);
            res.send('test');
        }
    );
});

router.get('/confirm', (req, res) => {
    if (req.session) {
        UserModel.find({UserId: req.session.passport.user.id}, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result[0]);
            res.send(result[0].IsHima);
        });
    } else {
        res.send(false);
    }
});


export default router;