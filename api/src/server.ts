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

interface IGetCredential {
    client: IClient,
    url: string
}

async function getCredential(id: any): Promise<IGetCredential > {  
    let client: IClient = {
        consumer_key: `${process.env.CONSUMERKEY}`,
        consumer_secret: `${process.env.CONSUMERSECRET}`,
        code: ""
    }

    let url: string = "";

    switch (`${id}`) {
        case "391250" : client.code = `${process.env.CODE391250}`, url = `${process.env.URL391250}`; break;
        case "391251" : client.code = `${process.env.CODE391251}`, url = `${process.env.URL391251}`; break;
    }

    const credential = { 
        client,
        url
    }

    return credential;
}

app.post('/products/purchase', async (req: Request, res: Response) => {

    console.log(req.body);

    const userClient = await getCredential(req.body.seller_id);

    const purchase = await axios.post(`${userClient.url}/auth`, userClient.client, {
        headers: {
          'Content-Type': 'application/json'
        }
    }).then(async (response) => {
        return await axios.get(`https://391250.commercesuite.com.br/web_api/orders/${req.body.scope_id}?access_token=${response.data.access_token}`).then((response) => {
            return response;
        }).catch((error) => {
            console.log(error);
        })
    }).catch((error) => {
        console.log(error);
    })

    console.log(purchase)

    return res.status(201).send();
})

app.listen(port, '0.0.0.0', () => {
    console.log('listening on port %d', port)
});