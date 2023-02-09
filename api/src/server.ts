import express, { Request, Response } from "express";

const app = express()

app.post('/produtos/purchase', (req, res: Response) => {
    const { seller_id , scope_id, scope_name ,act , update, app_code, url_notification } = req.body;

    
    console.log(seller_id , scope_id, scope_name ,act , update, app_code, url_notification);

})

app.listen(3000, () => {
    console.log('Server is running!');
})