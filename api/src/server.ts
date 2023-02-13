import axios from 'axios';
import bodyParser from 'body-parser';
import 'dotenv/config';
import express, { Request, Response } from "express";
import { IClient, IGetCredential, IRawObject } from './interfaces/interfaces';

const port = process.env.PORT || 8080;

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));

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

async function formatData(purchase: IRawObject) {
    let formatedObject = {
        reference_id: purchase.Order.session_id,
        number: purchase.Order.session_id,
        admin_url: '',
        customer_name: 'João Moraes',
        customer_email: 'joaomoraes@gmail.com',
        customer_phone: '+5511911111111',
        billing_address: {
            name: 'João Moraes',
            first_name: 'João',
            last_name: 'Moraes',
            company: null,
            phone: '+5511911111111',
            address1: 'Av Belisário Ramos, 3735',
            address2: 'Sagrado Coração Jesus',
            city: 'Lages',
            province: 'Santa Catarina',
            province_code: 'SC',
            country: 'Brazil',
            country_code: 'BR',
            zip: '88508100',
            latitude: null,
            longitude: null
        },
        shipping_address: {
            name: 'João Moraes',
            first_name: 'João',
            last_name: 'Moraes',
            company: null,
            phone: '+5511911111111',
            address1: 'Av Belisário Ramos, 3735',
            address2: 'Sagrado Coração Jesus',
            city: 'Lages',
            province: 'Santa Catarina',
            province_code: 'SC',
            country: 'Brazil',
            country_code: 'BR',
            zip: '88508100',
            latitude: null,
            longitude: null
        },
        line_items: [
            {
                title: 'Óculos',
                variant_title: 'Preto',
                quantity: 1,
                price: 49.9,
                path: 'https://example.com/products/1234',
                image_url: 'https://example.com/products/1234/image.jpg', 
                tracking_number: 'LB123456789BR'
            },
            {
                title: 'Óculos',
                variant_title: 'Azul',
                quantity: 1,
                price: 59.9,
                path: 'https://example.com/products/5678',
                image_url: 'https://example.com/products/5678/image.jpg', 
                tracking_number: 'LB987654321BR'
            }
        ],
        currency: 'BRL',
        total_price: 124.8,
        subtotal_price: 109.8,
        payment_status: 'PAID', // PAID, PENDING, NOT_PAID
        payment_method: 'PIX', // BOLETO, CREDIT_CARD, DEPOSIT, PIX, OTHER
        tracking_numbers: 'LB123456789BR,LB987654321BR',
        referring_site: 'https://www.facebook.com/',
        status_url: 'https://example.com/orders/123456789',
        billet_url: 'https://example.com/orders/123456789/boleto.pdf',
        billet_line: '000000000000000000000000000000000000000000000000',
        billet_expired_at: '2022-05-31',
        original_created_at: '2022-05-27 12:00'
    };
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
            return response.data;
        }).catch((error) => {
            console.log(error);
        })
    }).catch((error) => {
        console.log(error);
    })

    const formatedData = await formatData(purchase);

    return res.status(201).send();
})

app.listen(port, '0.0.0.0', () => {
    console.log('listening on port %d', port)
});