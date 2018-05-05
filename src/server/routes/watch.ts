import * as express from 'express';

const router: express.Router = express.Router();

import {UserModel} from "../model";


router.get('/', function (req, res) {
    let serch = () => {
        interface data {
            matched: boolean,
            uname: string,
            ishima: boolean,
            time: number
        }
        console.log(req.query);
        return new Promise((resolve, reject) => {
            UserModel.find((req.query), (err, result) => {
                if (err) {
                    console.log(err);
                    reject();
                } else if (result.length != 0) {
                    let userdata:data = {
                        matched: true,
                        uname: result[0].UserName,
                        ishima: result[0].IsHima,
                        time: result[0].HimaTime
                    };
                    console.log(JSON.stringify(result));
                    console.log(JSON.stringify(userdata));
                    resolve(userdata);
                } else {
                    let userdata = {
                        matched: false,
                        uname: "",
                        ishima: false,
                        time: 0
                    };
                    resolve(userdata);
                }
            });
        });
    }

    let response = (udata) => {
        res.render('watch', {
            udata: udata
        });
    };

    serch().then(response).catch((e) => {
        console.log(e);
        res.redirect('/');
    });

});


export default router;
