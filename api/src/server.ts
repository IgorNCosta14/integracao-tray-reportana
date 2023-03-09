import axios from 'axios';
import console from 'console';
import 'dotenv/config';
import express, { Request, Response } from "express";
import { formatData, getCredential } from './utils/Utils';
import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc";
import { TokenResponse } from './interfaces/interfaces';
dayjs.extend(utc);

let port = 8080;
const base64 = btoa(`${process.env.REPORTANA_CLIENT_ID}:${process.env.REPORTANA_CLIENT_SERVER}`);

if(process.env.PORT != undefined) {
    port = parseInt(process.env.PORT);
}

const app = express()
app.use(express.json());

let timerAccessToken: any = dayjs();
let timerRefreshToken: any = dayjs();

app.get('/auth', async (req: Request, res: Response): Promise<Response>  => {
    const { id } = req.query;

    if(!id) {
        return res.status(400).send("Id is missing"); 
    }

    const userClient = await getCredential(id);

    if(userClient.client.code === '') {
        return res.status(400).send("Code is missing"); 
    }

    let token: TokenResponse;
    const dateNow = dayjs()

    token = await axios.post(`${userClient.url}/auth`, userClient.client, {
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(async (response) => {
        timerAccessToken = dayjs(response.data.date_expiration_access_token);
        timerRefreshToken = dayjs(response.data.date_expiration_refresh_token);

        return response.data;
    }).catch((error) => {
        console.log(error);
    })

    return res.status(201).send(token);
})

app.post('/products/purchase', async (req: Request, res: Response): Promise<Response> => {

    if(!req.body.scope_id || !req.body.seller_id) {
        return res.status(400).send("Error, scope_id or seller_id are missing");
    }

    console.log('Notificação da Tray', req.body);

    try {
        const token: TokenResponse = await axios.get(`https://integracao-tray-reportana-production.up.railway.app/auth?id=${req.body.seller_id}`).then(function (response) {
            return response.data;
        })
    
        try {
            const purchase = await axios.get(`${token.api_host}/orders/${req.body.scope_id}/complete?access_token=${token.access_token}`).then((response) => {

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
    } catch (error) {
        
        return res.status(400).send(error);

    }
    
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