import axios from 'axios';
import console from 'console';
import 'dotenv/config';
import express, { Request, Response } from "express";
import { formatData, getCredential } from './utils/Utils';
import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

let port = 8080;
const base64 = btoa(`${process.env.REPORTANA_CLIENT_ID}:${process.env.REPORTANA_CLIENT_SERVER}`);

if(process.env.PORT != undefined) {
    port = parseInt(process.env.PORT);
}

const app = express()
app.use(express.json());

let timerAccessToken = ""
let timerRefreshToken = ""

app.get('/auth', async (req: Request, res: Response): Promise<Response>  => {
    const { id } = req.query;

    const userClient = await getCredential(id);

   const token = await axios.post(`${userClient.url}/auth`, userClient.client, {
        headers: {
          'Content-Type': 'application/json'
        }
    }).then(async (response) => {
        timerAccessToken = response.data.date_expiration_access_token;
        timerRefreshToken = response.data.date_expiration_refresh_token;

        return response.data;
    }).catch((error) => {
        console.log(error);
    })

    console.log(timerAccessToken, timerRefreshToken, dayjs())

    return res.status(201).send(token);
})

app.post('/products/purchase', async (req: Request, res: Response): Promise<Response> => {

    console.log('Notificação da Tray', req.body);

    const token = await axios.get(`https://integracao-tray-reportana-production.up.railway.app/auth?id=${req.body.seller_id}`)

    try {
        const purchase = await axios.get(`${token.data.api_host}/orders/${req.body.scope_id}/complete?access_token=${token.data.access_token}`).then((response) => {

            console.log('Compra feita na Tray', response.data);

            return response.data;
        });

        return res.status(201).send("Pedido enviado")
    }catch(error) {
        if( error.response ){
            return res.status(400).send(error.response.data.error); 
        } else {
            console.log(error)
            return res.status(500).send("Internal Server Error");
        }
    };
    
    /*
    if(purchase.Order !== undefined) {
        const formatedData = await formatData({ purchase, url: token.data.api_host });

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
        }).catch(error => {
            if( error.response ){
                return res.status(400).send(error.response.data.error); 
            } else {
                return res.status(400).send(error);
            }
        });

        return res.status(201).send('send');
    } else {
        console.log("Order data missing")
    }

    return res.status(201).send(purchase)*/
})

app.listen(port, '0.0.0.0', () => {
    console.log('listening on port %d', port)
});