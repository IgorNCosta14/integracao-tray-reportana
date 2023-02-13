import bodyParser from 'body-parser';
import 'dotenv/config';
import express, { Request, Response } from "express";

const port = process.env.PORT || 8080;

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));

interface IClient {
    consumer_key: string,
    consumer_secret: string,
    code: string
}

async function getClient(id: any): Promise<IClient> {  
    let client: IClient = {
        consumer_key: "",
        consumer_secret: "",
        code: ""
    }

    switch (`${id}`) {
        case "391250" : client = {
            consumer_key: `${process.env.CONSUMERKEY391250}`,
            consumer_secret: `${process.env.CONSUMERSECRET391250}`,
            code: `${process.env.CODE391250}`
        }; break;

        case "391251" : client = {
            consumer_key: `${process.env.CONSUMERKEY391251}`,
            consumer_secret: `${process.env.CONSUMERSECRET391251}`,
            code: `${process.env.CODE391251}`
        }; break;
    }

    return client;
}

app.post('/products/purchase', async (req: Request, res: Response) => {

    console.log(req.body);

    const client = getClient(req.body.seller_id);

    console.log(client);

    return res.status(201).send();
})

app.get('/test', (req: Request, res: Response) => {
    return res.status(201).send("oi")
})

app.listen(port, '0.0.0.0', () => {
    console.log('listening on port %d', port)
});