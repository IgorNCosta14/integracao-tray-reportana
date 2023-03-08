import axios from 'axios';
import bodyParser from 'body-parser';
import console from 'console';
import 'dotenv/config';
import express, { Request, Response } from "express";
import { formatData, getCredential } from './utils/Utils';

let port = 8080;
const base64 = btoa(`${process.env.REPORTANA_CLIENT_ID}:${process.env.REPORTANA_CLIENT_SERVER}`);

if(process.env.PORT != undefined) {
    port = parseInt(process.env.PORT);
}

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/auth', async (req: Request, res: Response): Promise<Response>  => {
    const { id } = req.body;

    console.log(req.body)

    const userClient = await getCredential(id);

   const token = await axios.post(`${userClient.url}/auth`, userClient.client, {
        headers: {
          'Content-Type': 'application/json'
        }
    }).then(async (response) => {
        return response.data;
    }).catch((error) => {
        console.log(error);
    })

    console.log(token)

    return res.status(201).send(token);
})

app.post('/products/purchase', async (req: Request, res: Response): Promise<Response> => {

    console.log('Notificação da Tray', req.body);

    const token = await axios.get(`https://integracao-tray-reportana-production.up.railway.app/auth?id=${req.body.seller_id}`)

    const purchase = await axios.get(`${token.url}/orders/${req.body.scope_id}/complete?access_token=${token.access_token}`).then((response) => {

        console.log('Compra feita na Tray', response);

        return response.data;
    }).catch((error) => {
        console.log(error); 
    })
    
    

    if(purchase.Order !== undefined) {
        const formatedData = await formatData({ purchase, url: token.url });

        console.log('Objeto para envia para Reportana', formatedData)

        await axios.post('https://api.reportana.com/2022-05/orders', formatedData,{
            headers: {
                Authorization: `Basic ${base64}`,
                'Content-Type': 'application/json',
                'Accept-Encoding': 'gzip,deflate,compress'
            }
        })
        .then(function (response) {
            console.log(`Compra atualizada: ${formatedData.number}`);
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
            }
        });

        return res.status(201).send('send');
    } else {
        console.log("Order data missing")
    }
})

app.listen(port, '0.0.0.0', () => {
    console.log('listening on port %d', port)
});