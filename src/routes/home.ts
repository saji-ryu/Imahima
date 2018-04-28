import * as express from 'express';
const router : express.Router = express.Router();

router.get('/',function (req,res) {
    res.render('home', {
        title: 'login demo',
        usr: req.user
    });
});

export default router;