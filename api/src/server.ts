import axios from 'axios';
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
        consumer_key: `${process.env.CONSUMERKEY}`,
        consumer_secret: `${process.env.CONSUMERSECRET}`,
        code: ""
    }

    switch (`${id}`) {
        case "391250" : client.code = `${process.env.CODE391250}`; break;
        case "391251" : client.code = `${process.env.CODE391251}`; break;
    }

    return client;
}

app.post('/products/purchase', async (req: Request, res: Response) => {

    console.log(req.body);

    const client = await getClient(req.body.seller_id);

    await axios.post('', client, {
        headers: {
          'Content-Type': 'application/json'
        }
    }).then(async (response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error);
    })

    // await axios.get(`https://391250.commercesuite.com.br/web_api/orders/${req.body.scope_id}?${token.access_token}`)

    return res.status(201).send();
})

app.get('/test', (req: Request, res: Response) => {
    return res.status(201).send("oi")
})

app.listen(port, '0.0.0.0', () => {
    console.log('listening on port %d', port)
});