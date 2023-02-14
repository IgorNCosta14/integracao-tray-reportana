import axios from 'axios';
import bodyParser from 'body-parser';
import 'dotenv/config';
import express, { Request, Response } from "express";
import { formatData, getCredential } from './utils/Utils';

let port = 8080;

if(process.env.PORT != undefined) {
    port = parseInt(process.env.PORT);
}

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/products/purchase', async (req: Request, res: Response): Promise<Response> => {

    console.log(req.body);

    const userClient = await getCredential(req.body.seller_id);

    const purchase = await axios.post(`${userClient.url}/auth`, userClient.client, {
        headers: {
          'Content-Type': 'application/json'
        }
    }).then(async (response) => {
        return await axios.get(`${userClient.url}/orders/${req.body.scope_id}?access_token=${response.data.access_token}`).then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        })
    }).catch((error) => {
        console.log(error);
    })

    console.log("//////////////////server///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////")
  console.log(purchase)

  console.log("/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////")

    const formatedData = await formatData({ purchase, url: userClient.url });

    return res.status(201).send(formatedData);
})

app.listen(port, '0.0.0.0', () => {
    console.log('listening on port %d', port)
});