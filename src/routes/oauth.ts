import * as express from 'express';

const router: express.Router = express.Router();
import * as passport from 'passport';

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', passport.authenticate('twitter', {failureRedirect: '/login'}), function (req, res) {
    res.redirect('/'); //indexへリダイレクトさせる
});

export default router;