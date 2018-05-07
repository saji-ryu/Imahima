import * as express from 'express';
import {UserModel} from "../model";

const router: express.Router = express.Router();

router.get('/',  (req, res)=> {
    if (req.user) {
        UserModel.find({UserId: req.user.id}, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result[0]);
            res.send(result[0]);
        });
    } else {
        res.send(null);
    }
});

router.post('/',(req, res) => {
    UserModel.findOneAndUpdate(
        {UserId: req.user.id},
        (req.body),
        (err, result) => {
            console.log(result);
            console.log(req.body);
            res.send('test');
        }
    );
});



export default router;