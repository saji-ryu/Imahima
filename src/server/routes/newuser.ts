import * as express from 'express';

const router: express.Router = express.Router();

router.get('/', function (req, res) {
    res.render('newuser', {
        title: 'thank you'
    });
});


export default router;