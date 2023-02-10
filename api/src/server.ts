import bodyParser from 'body-parser';
import 'dotenv/config';
import express, { Request, Response } from "express";

const port = process.env.PORT || 8080;

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/products/purchase', (req: Request, res: Response) => {

    console.log('req turbo',req);
    console.log('req body turbo',req.body);
    console.log('req body turbo',req.body.data);

    return res.status(201).send();
})

app.get('/test', (req: Request, res: Response) => {
    return res.status(201).send("oi")
})

app.listen(port, '0.0.0.0', () => {
    console.log('listening on port %d', port)
});