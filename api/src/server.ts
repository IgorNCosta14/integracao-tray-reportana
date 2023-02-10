import 'dotenv/config';
import express, { Request, Response } from "express";
const port = process.env.PORT || 8080;

const app = express()

app.post('/products/purchase', (req: Request, res: Response) => {
    const { seller_id , scope_id, scope_name ,act , update, app_code, url_notification } = req.body;

    console.log(seller_id , scope_id, scope_name ,act , update, app_code, url_notification);

    return res.status(201).send();
})

app.get('/test', (req: Request, res: Response) => {
    return res.status(201).send("oi")
})

app.listen(port, '0.0.0.0', () => {
    console.log('listening on port %d', port)
});