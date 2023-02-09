import express, { Request, Response } from "express";

const app = express()

app.post('/produtos/purchase', (req: Request, res: Response) => {
    const { seller_id , scope_id, scope_name ,act , update, app_code, url_notification } = req.body;

    console.log(seller_id , scope_id, scope_name ,act , update, app_code, url_notification);

    return res.status(201).send();
})

app.get('/test', (req: Request, res: Response) => {
    return res.status(201).send("oi")
})

app.listen(3000, () => {
    console.log('Server is running!');
})