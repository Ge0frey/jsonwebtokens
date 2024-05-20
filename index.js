import express, { urlencoded } from 'express';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3000;

app.use(express.json());
app.use(urlencoded({extended:false}));

app.get ('/api', (req, res) => {
    res.json({
        message:"Welcome to this api service"
    });
});

app.listen(port, () => {
    console.log(`This app is listening on port: ${port}`)
})