import * as express from 'express';
const router : express.Router = express.Router();

router.get('/',function (req,res) {
    res.render('home', {
        title: 'login demo',
        session: req.session.passport
    });
});

export default router;