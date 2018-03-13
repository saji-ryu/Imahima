import * as express from 'express';
const router : express.Router = express.Router();

router.get('/',function (req,res) {
    res.send('data');
});

export default router;